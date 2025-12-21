// ============================================================================
// SERVER LOG INTERFACES
// ============================================================================

/**
 * Server log interface for HTTP request/response logging
 * Used to track API requests and their responses for debugging and monitoring
 */
export interface IServerLog {
  /** Timestamp when the request was received */
  requestTime: Date;
  
  /** Request URL endpoint */
  url: string;
  
  /** Action or method name being executed */
  action: string;
  
  /** Request body data (can be empty object, null, or contain request payload) */
  body: Record<string, unknown> | null | undefined;
  
  /** Timestamp when the response was sent */
  responseTime: Date;
  
  /** Response data (can be empty object, null, or contain response payload) */
  response: Record<string, unknown> | null | undefined;
  
  /** HTTP method (GET, POST, PUT, DELETE, etc.) - optional */
  method?: string;
  
  /** HTTP status code - optional */
  statusCode?: number;
  
  /** Request duration in milliseconds - optional */
  duration?: number;
  
  /** User ID who made the request - optional */
  userId?: number;
  
  /** IP address of the client - optional */
  ipAddress?: string;
  
  /** User agent string - optional */
  userAgent?: string;
}

// ============================================================================
// S3 LOG INTERFACES
// ============================================================================

/**
 * S3 service log interface for AWS S3 operations
 * Used to track S3 service method calls and their responses
 */
export interface IS3Log {
  /** Timestamp when the S3 operation was initiated */
  requestTime: Date;
  
  /** S3 service method label/name */
  S3ServiceMethodLabel: string;
  
  /** Method payload/parameters */
  methodPayload: Record<string, unknown> | null;
  
  /** Timestamp when the S3 operation completed */
  responseTime: Date;
  
  /** Response from S3 operation */
  response: Record<string, unknown> | null;
  
  /** S3 bucket name - optional */
  bucketName?: string;
  
  /** S3 object key - optional */
  objectKey?: string;
  
  /** Operation duration in milliseconds - optional */
  duration?: number;
  
  /** Error message if operation failed - optional */
  error?: string;
}

// ============================================================================
// EXCEPTION LOG INTERFACES
// ============================================================================

/**
 * Exception log interface for error tracking
 * Used to log exceptions and errors that occur during request processing
 */
export interface IExceptionLog {
  /** Request body that caused the exception */
  request_body: Record<string, unknown> | null;
  
  /** Request query parameters */
  request_query: Record<string, unknown> | null;
  
  /** Request path parameters */
  request_param: Record<string, unknown> | null;
  
  /** Error details */
  error: {
    message: string;
    stack?: string;
    code?: string | number;
    [key: string]: unknown;
  } | null;
  
  /** Date when exception occurred */
  created_date: Date;
  
  /** User ID who triggered the exception - optional */
  created_by?: number | null;
  
  /** Response sent to client - optional */
  response?: Record<string, unknown> | null;
  
  /** Request URL - optional */
  url?: string;
  
  /** HTTP method - optional */
  method?: string;
}

// ============================================================================
// ACTIVITY LOG INTERFACES
// ============================================================================

/**
 * Activity log interface for tracking user actions
 * Used to log user activities and changes in the system
 */
export interface IActivityLog {
  /** Type of log (create, update, delete, etc.) */
  log_type: string;
  
  /** Type of activity being performed */
  activity_type: string;
  
  /** Reference ID (e.g., product ID, order ID) */
  ref_id: number | string;
  
  /** Old value data in JSON format */
  old_value_json: Record<string, unknown> | null;
  
  /** Updated/new value data in JSON format */
  updated_value_json: Record<string, unknown> | null;
  
  /** User ID who performed the activity */
  created_by: number;
  
  /** Date when activity was created */
  created_date: Date;
  
  /** User ID who last modified the log - optional */
  modified_by?: number | null;
  
  /** Date when log was last modified - optional */
  modified_date?: Date | null;
  
}

// ============================================================================
// EMAIL LOG INTERFACES
// ============================================================================

/**
 * Email log interface for tracking email operations
 * Used to log email sending attempts and their status
 */
export interface IEmailLog {
  /** Raw email subject */
  raw_subject: string | null;
  
  /** Actual processed subject (can be JSON for dynamic content) */
  actual_subject: Record<string, unknown> | null;
  
  /** Payload used for content replacement */
  containt_replace_payload: Record<string, unknown> | null;
  
  /** Raw email body */
  raw_body: string | null;
  
  /** Actual processed body (can be JSON for dynamic content) */
  actual_body: Record<string, unknown> | null;
  
  /** Recipient email address */
  to: string | null;
  
  /** Sender email address */
  from: string | null;
  
  /** CC recipients - optional */
  cc?: string | null;
  
  /** Configuration values for email */
  configuration_value: Record<string, unknown> | null;
  
  /** Type of mail */
  mail_type: string | null;
  
  /** Response status (success, error, pending) */
  response_status: "success" | "error" | "pending";
  
  /** Purpose/type of mail (enum value) */
  mail_for: string | null;
  
  /** Email attachments - optional */
  attachment?: Record<string, unknown> | null;
  
  /** Success response data - optional */
  success_response?: Record<string, unknown> | null;
  
  /** Error message if sending failed - optional */
  error_message?: Record<string, unknown> | null;
  
  /** Whether email is dynamic - optional */
  is_dunamic?: boolean | null;
}

// ============================================================================
// GENERIC LOG INTERFACE
// ============================================================================

/**
 * Generic log interface for flexible logging scenarios
 * Can be used for various logging purposes
 */
export interface IGenericLog {
  /** Log timestamp */
  timestamp: Date;
  
  /** Log level (info, warn, error, debug) */
  level: "info" | "warn" | "error" | "debug";
  
  /** Log message */
  message: string;
  
  /** Additional log data */
  data?: Record<string, unknown> | null;
  
  /** Source/module where log originated */
  source?: string;
  
  /** User ID associated with the log - optional */
  userId?: number | null;
  
  /** Request ID for tracing - optional */
  requestId?: string | null;
}
