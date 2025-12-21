import { TResponseReturn } from "../data/interfaces/common/common.interface";

// ============================================================================
// CUSTOM ERROR BASE CLASS
// ============================================================================

/**
 * Base custom error class with data payload
 * Extends the standard Error class to include additional error data
 */
export abstract class BaseCustomError extends Error {
  protected readonly errorData: unknown;

  /**
   * Creates a new custom error instance
   * @param name - Error name/type
   * @param message - Error message
   * @param data - Additional error data
   */
  constructor(name: string, message: string, data?: unknown) {
    super(message);
    this.name = name;
    this.errorData = data;
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Gets the error data
   * @returns The error data payload
   */
  public getData(): unknown {
    return this.errorData;
  }

  /**
   * Gets the error as a JSON-serializable object
   * @returns Error object with name, message, and data
   */
  public toJSON(): {
    name: string;
    message: string;
    data?: unknown;
  } {
    return {
      name: this.name,
      message: this.message,
      ...(this.errorData !== undefined && { data: this.errorData }),
    };
  }
}

// ============================================================================
// MULTER CUSTOM ERROR
// ============================================================================

/**
 * Custom error class for Multer file upload errors
 * Used to wrap Multer validation errors with custom response data
 * 
 * @example
 * ```typescript
 * throw new MulterCustomError(
 *   "Multer Error",
 *   resUnknownError({ message: "Invalid mimetype!" })
 * );
 * ```
 */
export class MulterCustomError extends BaseCustomError {
  /**
   * Creates a new Multer custom error
   * @param name - Error name
   * @param data - Response data (TResponseReturn format)
   */
  constructor(name: string, data: TResponseReturn) {
    super(name, data.message || "Multer file upload error", data);
  }

  /**
   * Gets the response data
   * @returns Response data in TResponseReturn format
   */
  public getData(): TResponseReturn {
    return this.errorData as TResponseReturn;
  }

  /**
   * Gets the error code from response data
   * @returns HTTP status code
   */
  public getCode(): number {
    const data = this.getData();
    return data?.code || 500;
  }

  /**
   * Gets the error status from response data
   * @returns Status string
   */
  public getStatus(): string {
    const data = this.getData();
    return data?.status || "error";
  }
}

// ============================================================================
// FILE UPLOAD ERROR
// ============================================================================

/**
 * Custom error for general file upload errors
 * Used for file upload operations outside of Multer
 */
export class FileUploadError extends BaseCustomError {
  /**
   * File field name that caused the error
   */
  public readonly fieldName?: string;

  /**
   * Original filename that caused the error
   */
  public readonly originalName?: string;

  /**
   * Creates a new file upload error
   * @param message - Error message
   * @param fieldName - File field name (optional)
   * @param originalName - Original filename (optional)
   * @param data - Additional error data (optional)
   */
  constructor(
    message: string,
    fieldName?: string,
    originalName?: string,
    data?: unknown
  ) {
    super("FileUploadError", message, data);
    this.fieldName = fieldName;
    this.originalName = originalName;
  }
}

// ============================================================================
// VALIDATION ERROR
// ============================================================================

/**
 * Custom error for validation failures
 * Used for input validation errors
 */
export class ValidationError extends BaseCustomError {
  /**
   * Field name that failed validation
   */
  public readonly field?: string;

  /**
   * Validation error code
   */
  public readonly code?: string;

  /**
   * Creates a new validation error
   * @param message - Error message
   * @param field - Field name that failed validation (optional)
   * @param code - Validation error code (optional)
   * @param data - Additional error data (optional)
   */
  constructor(
    message: string,
    field?: string,
    code?: string,
    data?: unknown
  ) {
    super("ValidationError", message, data);
    this.field = field;
    this.code = code;
  }
}

// ============================================================================
// BUSINESS LOGIC ERROR
// ============================================================================

/**
 * Custom error for business logic violations
 * Used when business rules are violated
 */
export class BusinessLogicError extends BaseCustomError {
  /**
   * Business error code
   */
  public readonly errorCode?: string | number;

  /**
   * Creates a new business logic error
   * @param message - Error message
   * @param errorCode - Business error code (optional)
   * @param data - Additional error data (optional)
   */
  constructor(message: string, errorCode?: string | number, data?: unknown) {
    super("BusinessLogicError", message, data);
    this.errorCode = errorCode;
  }
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if error is MulterCustomError
 * @param error - Error to check
 * @returns True if error is MulterCustomError
 */
export function isMulterCustomError(
  error: unknown
): error is MulterCustomError {
  return error instanceof MulterCustomError;
}

/**
 * Type guard to check if error is FileUploadError
 * @param error - Error to check
 * @returns True if error is FileUploadError
 */
export function isFileUploadError(error: unknown): error is FileUploadError {
  return error instanceof FileUploadError;
}

/**
 * Type guard to check if error is ValidationError
 * @param error - Error to check
 * @returns True if error is ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard to check if error is BusinessLogicError
 * @param error - Error to check
 * @returns True if error is BusinessLogicError
 */
export function isBusinessLogicError(
  error: unknown
): error is BusinessLogicError {
  return error instanceof BusinessLogicError;
}

/**
 * Type guard to check if error is any custom error
 * @param error - Error to check
 * @returns True if error is a custom error
 */
export function isCustomError(error: unknown): error is BaseCustomError {
  return error instanceof BaseCustomError;
}
