import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import puppeteer from "puppeteer";
import nodemailer, { Transporter } from "nodemailer";
import { EmailLogType } from "../utils/app-enumeration";
import { getLocalDate, sendMailAPI } from "../utils/shared-functions";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * SMTP configuration interface
 */
interface ISMTPConfig {
  smtp_host?: string;
  smtp_port?: string | number;
  smtp_service?: string;
  smtp_secure?: string | boolean;
  smtp_user_name?: string;
  smtp_password?: string;
  smtp_from?: string;
}

/**
 * Email attachment configuration
 */
interface IEmailAttachment {
  content: string;
  toBeReplace?: Record<string, unknown>;
}

/**
 * Email preparation payload
 */
export interface IEmailPreparePayload {
  emailTemplate: string;
  subject: string;
  contentToReplace: Record<string, unknown>;
  emailTo: string | string[];
  messageType?: number;
  attachments?: IEmailAttachment;
  dynamic?: boolean;
}

/**
 * Email log instance interface (Sequelize model instance)
 */
interface IEmailLogInstance {
  update: (data: {
    actual_subject?: string;
    actual_body?: string;
    to?: string | string[];
    from?: string;
    configuration_value?: ISMTPConfig | null;
    mail_type?: string;
    attachment?: IEmailAttachment | null;
    response_status?: string;
    success_response?: unknown;
    error_message?: unknown;
    updated_by?: number | null;
    updated_at?: Date;
  }) => Promise<void>;
}

/**
 * Re-send email payload
 */
interface IReSendEmailPayload {
  emailTo: string | string[];
  emailSubject: string;
  htmlToSend: string;
  id?: number | null;
}

// ============================================================================
// EMAIL HELPER CLASS
// ============================================================================

/**
 * Email helper class for sending emails with template support
 * Supports both static file-based templates and dynamic templates
 * Handles PDF attachment generation using Puppeteer
 */
export default class EmailHelper {
  private _transporter: Transporter;
  private _emailTemplate: string | null = null;
  private _contentToReplace: Record<string, unknown> | null = null;
  private _emailTo: string | string[] = [];
  private _emailSubject: string | null = null;
  private _messageType: number | null = null;
  private _attachments: IEmailAttachment | null = null;
  private _dynamic: boolean = false;
  private _clientId: ISMTPConfig | null = null;
  private _value: ISMTPConfig | null = null;
  private _mailType: string;

  /**
   * Creates a new EmailHelper instance
   * @param value - Optional SMTP configuration (falls back to environment variables)
   */
  constructor(value?: ISMTPConfig) {
    this._value = value || null;
    this._mailType =
      (process.env.MAIL_SERVICE || value?.smtp_service) === "gmail"
        ? "gmail"
        : "";

    this._transporter = nodemailer.createTransport({
      name: process.env.MAIL_HOST || value?.smtp_host,
      host: process.env.MAIL_HOST || value?.smtp_host,
      port: process.env.MAIL_PORT || value?.smtp_port,
      service: this._mailType,
      secureConnection: process.env.MAIL_SECURE || value?.smtp_secure,
      auth: {
        user: process.env.MAIL_USER_NAME || value?.smtp_user_name,
        pass: process.env.MAIL_PASSWORD || value?.smtp_password,
      },
    });
  }

  /**
   * Prepares email data for sending
   * @param payload - Email preparation payload
   */
  public prepareEmail(payload: IEmailPreparePayload): void {
    this._emailTemplate = payload.emailTemplate;
    this._emailSubject = payload.subject;
    this._contentToReplace = payload.contentToReplace;
    this._emailTo = payload.emailTo;
    this._messageType = payload.messageType || null;
    this._attachments = payload.attachments || null;
    this._dynamic = payload.dynamic || false;
  }

  /**
   * Compiles and processes email template
   * @returns Object containing compiled HTML and subject
   */
  private async compileEmailTemplate(): Promise<{
    html: string;
    subject: string;
  }> {
    if (!this._emailTemplate || !this._contentToReplace || !this._emailSubject) {
      throw new Error("Email template, content, or subject is missing");
    }

    if (this._dynamic) {
      // Dynamic template: template is already a string
      const template = handlebars.compile(this._emailTemplate);
      const html = template(this._contentToReplace);

      const subjectTemplate = handlebars.compile(this._emailSubject);
      const subject = subjectTemplate(this._contentToReplace);

      return { html, subject };
    } else {
      // Static template: read from file
      const filePath = path.join(__dirname, this._emailTemplate);
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      const html = template(this._contentToReplace);

      return { html, subject: this._emailSubject };
    }
  }

  /**
   * Generates PDF from HTML template using Puppeteer
   * @param htmlContent - HTML content to convert to PDF
   * @returns PDF buffer
   */
  private async generatePDFFromHTML(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
      await page.emulateMediaType("screen");
      const pdf = await page.pdf();
      // Ensure we return a proper Buffer
      return Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  /**
   * Processes email attachments if present
   * @returns PDF buffer if attachment exists, null otherwise
   */
  private async processAttachments(): Promise<Buffer | null> {
    if (!this._attachments) {
      return null;
    }

    const filePath = path.join(__dirname, this._attachments.content);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const contentReplacement = this._attachments.toBeReplace || {};
    const htmlToSendFile = template(contentReplacement);

    return this.generatePDFFromHTML(htmlToSendFile);
  }

  /**
   * Gets SMTP configuration value (environment variable or client config)
   */
  private getSMTPConfig(): {
    host: string;
    userName: string;
    password: string;
    port: string | number;
    from: string;
  } {
    const config = this._clientId || this._value;

    return {
      host: (process.env.MAIL_HOST || config?.smtp_host) as string,
      userName: (process.env.MAIL_USER_NAME || config?.smtp_user_name) as string,
      password: (process.env.MAIL_PASSWORD || config?.smtp_password) as string,
      port: process.env.MAIL_PORT || config?.smtp_port || 587,
      from: (process.env.MAIL_FROM || config?.smtp_from) as string,
    };
  }

  /**
   * Updates email log instance with email data
   */
  private async updateEmailLogBeforeSend(
    emailLogInstance: IEmailLogInstance | null,
    compiledSubject: string,
    compiledHtml: string,
    appUserId?: number | null
  ): Promise<void> {
    if (!emailLogInstance) {
      return;
    }

    const smtpConfig = this.getSMTPConfig();

    await emailLogInstance.update({
      actual_subject: compiledSubject,
      actual_body: compiledHtml,
      to: this._emailTo,
      from: smtpConfig.from,
      configuration_value: this._value,
      mail_type: this._mailType,
      attachment: this._attachments,
      updated_by: appUserId || null,
      updated_at: getLocalDate(),
    });
  }

  /**
   * Updates email log instance with send result
   */
  private async updateEmailLogAfterSend(
    emailLogInstance: IEmailLogInstance | null,
    sendResult: unknown,
    appUserId?: number | null
  ): Promise<void> {
    if (!emailLogInstance) {
      return;
    }

    await emailLogInstance.update({
      response_status: EmailLogType.Success,
      success_response: sendResult,
      updated_by: appUserId || null,
      updated_at: getLocalDate(),
    });
  }

  /**
   * Updates email log instance with error
   */
  private async updateEmailLogOnError(
    emailLogInstance: IEmailLogInstance | null,
    error: unknown,
    appUserId?: number | null
  ): Promise<void> {
    if (!emailLogInstance) {
      return;
    }

    await emailLogInstance.update({
      response_status: EmailLogType.Error,
      error_message: error,
      updated_by: appUserId || null,
      updated_at: getLocalDate(),
    });
  }

  /**
   * Sends email with template support
   * @param emailLogInstance - Optional email log instance for tracking
   * @param appUserId - Optional user ID who triggered the email
   * @returns Promise that resolves when email is sent
   */
  public async sendMail(
    emailLogInstance?: IEmailLogInstance | null,
    appUserId?: number | null
  ): Promise<void> {
    try {
      // Compile email template
      const { html: compiledHtml, subject: compiledSubject } =
        await this.compileEmailTemplate();

      // Process attachments if present
      const pdfAttachment = await this.processAttachments();

      // Update email log before sending
      if (this._dynamic && emailLogInstance) {
        await this.updateEmailLogBeforeSend(
          emailLogInstance,
          compiledSubject,
          compiledHtml,
          appUserId
        );
      }

      // Get SMTP configuration
      const smtpConfig = this.getSMTPConfig();

      // Send email
      const sendResult = await sendMailAPI(
        smtpConfig.host,
        smtpConfig.userName,
        smtpConfig.password,
        smtpConfig.port,
        smtpConfig.from,
        this._emailTo,
        compiledSubject,
        compiledHtml,
        pdfAttachment || this._attachments || null
      );

      // Update email log after successful send
      if (this._dynamic && emailLogInstance) {
        await this.updateEmailLogAfterSend(
          emailLogInstance,
          sendResult,
          appUserId
        );
      }
    } catch (error) {
      // Update email log on error
      await this.updateEmailLogOnError(emailLogInstance, error, appUserId);
      
      // Re-throw error for caller to handle
      throw error;
    }
  }

  /**
   * Re-sends an email using stored HTML content
   * @param payload - Re-send email payload
   * @returns Promise that resolves when email is sent
   */
  public async reSendMail(payload: IReSendEmailPayload): Promise<void> {
    try {
      const smtpConfig = this.getSMTPConfig();

      const sendMailResult = await this._transporter.sendMail({
        from: smtpConfig.from,
        to: payload.emailTo,
        subject: payload.emailSubject,
        html: payload.htmlToSend,
      });

      return sendMailResult;
    } catch (error) {
      console.error("Failed to re-send email:", error);
      throw error;
    }
  }
}
