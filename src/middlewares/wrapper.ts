import { Request, Response, NextFunction, RequestHandler } from "express";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Extended Request interface with email type property
 * Used to distinguish between regular email templates and invoice email templates
 */
export interface IEmailTypeRequest extends Request {
  /** Boolean flag indicating if this is an invoice email template route */
  email_type?: boolean;
}

// ============================================================================
// EMAIL TYPE MIDDLEWARE
// ============================================================================

/**
 * Middleware factory that sets email type on the request object
 * 
 * This middleware is used to distinguish between:
 * - Regular email templates (email_type = false)
 * - Invoice email templates (email_type = true)
 * 
 * The email_type is used in mail template services to filter templates
 * by the `is_invoice` field in the database.
 * 
 * @param type - Boolean value indicating email type (true for invoice, false for regular)
 * @returns Express middleware handler
 * 
 * @example
 * ```typescript
 * // Regular email template route
 * app.post("/email-template", [authorization, setEmailType(false)], handler);
 * 
 * // Invoice email template route
 * app.post("/invoice/email-template", [authorization, setEmailType(true)], handler);
 * ```
 */
export const setEmailType = (type: boolean): RequestHandler => {
  return (req: IEmailTypeRequest, _res: Response, next: NextFunction): void => {
    req.email_type = type;
    next();
  };
};
