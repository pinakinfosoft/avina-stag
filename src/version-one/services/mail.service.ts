import EmailHelper from "../../helpers/mail.helper";
import { ActiveStatus, DeletedStatus, DYNAMIC_MAIL_TYPE, EmailLogType, WantToSendMailDynamic } from "../../utils/app-enumeration";
import {  getLocalDate, getWebSettingData, prepareMessageFromParams, resBadRequest } from "../../utils/shared-functions";
import { Op } from "sequelize";
import { EMAIL_TEMPLATE_NOT_FOUND } from "../../utils/app-messages";
import { CompanyInfo } from "../model/companyinfo.model";
import { Image } from "../model/image.model";
import { EmailTemplate } from "../model/email-template.model";
import { EamilLog } from "../model/email-logs.model";

async function prepareAndSendEmail(
  mailTemplate: string,
  mailSubject: string,
  messageType: number,
  payload: any,
  EamilLogInstance?:any,
  appUserId?: any,
) {
  try {
    const companyInfo = await (<any>CompanyInfo.findOne({
      where: { },
      attributes: [
        "id",
        "company_name",
        "company_email",
        "company_phone",
        "copy_right",
        "sort_about",
        "web_link",
        "facebook_link",
        "insta_link",
        "youtube_link",
        "linkdln_link",
        "twitter_link",
        "web_primary_color",
        "web_secondary_color",
        "light_id_image",
        "company_phone",
        "dark_id_image",
        "company_address",
        "gst_number",
        "mail_tem_logo"
      ],
    }));

    const configData = await getWebSettingData();

    const mailLogoPath = await Image.findOne({where:{id:companyInfo.dataValues.mail_tem_logo}})
   
    payload = {
      ...payload,
      contentTobeReplaced: {
        ...payload?.contentTobeReplaced,
        logo_image: configData?.image_base_url + mailLogoPath?.dataValues?.image_path,
        frontend_url: companyInfo.web_link,
        app_name: companyInfo?.company_name,
        bg_color: companyInfo?.web_primary_color,
        text_color: companyInfo?.web_secondary_color,
        company_phone: companyInfo?.company_phone,
        support_email: companyInfo?.company_email,
        company_address: companyInfo?.company_address,
        gst_number: companyInfo?.gst_number
      },
    };

    const objMail = new EmailHelper(configData);

    const mailInfo = {
      emailTemplate: mailTemplate,
      subject: mailSubject,
      contentToReplace: payload.contentTobeReplaced,
      emailTo: payload.contentTobeReplaced && payload.contentTobeReplaced.mail && payload.contentTobeReplaced.mail == 'admin' ? companyInfo?.company_email : payload.toEmailAddress,
      messageType: messageType,
      attachments: payload.attachments,
      dynamic: payload?.dynamic ? payload?.dynamic : false,

    };
    await objMail.prepareEmail(mailInfo);
    objMail.sendMail(EamilLogInstance,appUserId);
  } catch (e) {
    if(EamilLogInstance){
      await EamilLogInstance.update({
        response_status: EmailLogType.Error,
        error_message: e,
        updated_by: appUserId ? appUserId : null ,
        updated_at: getLocalDate()
      });
    }
  }
}

export const mailPasswordResetLink = async (payload: any) => {

    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.ResetPassword);

};

export const mailRegistrationOtp = async (payload: any) => {
      await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.CustomerOtp);
 
};

export const configuratoreVerificationOtp = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.configuratorOtp);
};

export const successRegistration = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.Registration);
};

export const mailNewOrderReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.UserOrderPurchase);
};

export const mailOrderInvoiceReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.EmailAttachmentInvoice);
};

export const mailProductInquiryFoeCustomerReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.CustomerProductInquiry);
};

export const mailAppointmentForCustomerReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.CustomerAppointment);
};

export const mailProductInquiryForAdminReceived = async (payload: any) => {
  await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.AdminProductInquiry);
};

export const mailAppointmentForAdminReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.AdminAppointment);
};

export const mailNewOrderAdminReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.NewOrderReceivedAdmin);
};

export const mailCatalogueNewOrderAdminReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.CataloguesNewOrderReceivedAdmin);
};

export const mailCatalogueNewOrderUserReceived = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.CataloguesNewOrderReceivedUser);
};
export const mailSendForOrderStatusUpdate = async (payload: any) => {
    await sendMailByMessageType(payload, DYNAMIC_MAIL_TYPE.AdminChangeOrderStatus);
};

export const sendMailByMessageType = async (payload: any,DYNAMIC_MAIL_TYPE:any, appUserId:any=null) => {
  payload.dynamic = true;
  try {
  // If no template ID is provided, we are creating a new template
  const existingTemplate = await EmailTemplate.findOne({
    where: {
      message_type: {
        [Op.contains]: [DYNAMIC_MAIL_TYPE], // Checks if DYNAMIC_MAIL_TYPE contains 1
      },
      is_deleted: DeletedStatus.No,
      is_active: ActiveStatus.Active,
    },
  });  
  if(existingTemplate){
    const rawHtmlContent = existingTemplate?.dataValues?.body.replace(/\\n/g, '\n');

    const EamilLogData:any = await EamilLog.create({
      raw_subject: existingTemplate?.dataValues?.subject,
      containt_replace_payload: payload,
      raw_body: rawHtmlContent,
      mail_for:DYNAMIC_MAIL_TYPE,
      response_status: EmailLogType.Pending,
      is_dunamic: true,
      created_by: appUserId ? appUserId : null ,
      created_at: getLocalDate(),
      updated_at: getLocalDate()
    });
    await prepareAndSendEmail(
      rawHtmlContent,
      existingTemplate.dataValues.subject,
      DYNAMIC_MAIL_TYPE,
      payload,
      EamilLogData,
      appUserId
    );  
  }else{
    await EamilLog.create({
      containt_replace_payload: payload,
      mail_for:DYNAMIC_MAIL_TYPE,
      response_status: EmailLogType.Pending,
      error_message: prepareMessageFromParams(EMAIL_TEMPLATE_NOT_FOUND, [["templateName", DYNAMIC_MAIL_TYPE],]),
      is_dunamic: true,
      created_by: appUserId ? appUserId : null ,
      created_at: getLocalDate(),
      updated_at: getLocalDate(),
    });
  }
}catch(e){
  await EamilLog.create({
    containt_replace_payload: payload,
    response_status: EmailLogType.Pending,
    error_message: e,
    is_dunamic: true,
    created_by: appUserId ? appUserId : null ,
    created_at: getLocalDate(),
    updated_at: getLocalDate(),
  });
   
}
  
};