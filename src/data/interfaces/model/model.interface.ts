import { TUserType } from "../../types/common/common.type";

// ============================================================================
// BASE INTERFACES - Common fields shared across models
// ============================================================================

/**
 * Base interface for audit fields (created/modified tracking)
 */
export interface IBaseAuditFields {
  /** User ID who created the record */
  created_by?: number | null;
  
  /** Date when record was created */
  created_date?: Date | null;
  
  /** User ID who last modified the record */
  modified_by?: number | null;
  
  /** Date when record was last modified */
  modified_date?: Date | null;
}

/**
 * Base interface for soft delete and status fields
 */
export interface IBaseStatusFields {
  /** Whether the record is active */
  is_active?: string | boolean | null;
  
  /** Whether the record is deleted (soft delete) */
  is_deleted?: string | boolean | null;
}


// ============================================================================
// APP USER INTERFACES
// ============================================================================

/**
 * Base app user interface with core authentication fields
 */
export interface IAppUserBase {
  /** Unique username for login */
  username: string;
  
  /** Hashed password */
  pass_hash: string;
  
  /** User type (Administrator, BusinessUser, Customer, Guest, SuperAdmin) */
  user_type: TUserType;
}

/**
 * App user interface with authentication and token fields
 * Used for user authentication and session management
 */
export interface IAppUser extends IAppUserBase, IBaseAuditFields, IBaseStatusFields {
  /** Unique identifier */
  id?: number;
  
  /** Refresh token for JWT authentication */
  refresh_token?: string | null;
  
  /** Password reset token */
  pass_reset_token?: string | null;
  
  /** One-time password for verification */
  one_time_pass?: string | null;
  
  /** Count of OTP resend attempts */
  resend_otp_count?: number | null;
  
  /** Date of last login */
  last_login_date?: Date | null;
  
  /** Firebase device token for push notifications */
  firebase_device_token?: string | null;
  
  /** Whether email is verified */
  is_email_verified?: string | boolean | null;
  
  /** User ID who approved this user */
  approved_by?: number | null;
  
  /** Date when user was approved */
  approved_date?: Date | null;
  
  /** Role ID associated with user */
  id_role?: number | null;
  
  /** Date when OTP was created */
  otp_create_date?: Date | null;
  
  /** Date when OTP expires */
  otp_expire_date?: Date | null;
  
  /** Whether user is super admin */
  is_super_admin?: boolean | null;
  
  /** User status (pending, approved, blocked, etc.) */
  user_status?: number | null;
  
  /** Legacy field - use created_date instead */
  created_at?: Date;
  
  /** Legacy field - use modified_date instead */
  modified_at?: Date;
}

/**
 * App user creation payload (for new user registration)
 */
export interface IAppUserCreatePayload extends IAppUserBase {
  /** User status (defaults to pending) */
  user_status?: number;
  
  /** Role ID */
  id_role: number;
  
  /** Whether email is verified */
  is_email_verified?: string | boolean;

  
  /** User ID creating this record */
  created_by?: number;
}

/**
 * App user update payload
 */
export interface IAppUserUpdatePayload {
  /** Username to update */
  username?: string;
  
  /** Password hash to update */
  pass_hash?: string;
  
  /** User type to update */
  user_type?: TUserType;
  
  /** User status to update */
  user_status?: number;
  
  /** Refresh token to update */
  refresh_token?: string | null;
  
  /** Whether user is active */
  is_active?: string | boolean;
  
  /** Whether email is verified */
  is_email_verified?: string | boolean;
  
  /** Role ID to update */
  id_role?: number;
  
  /** User ID modifying this record */
  modified_by?: number;
}

// ============================================================================
// CUSTOMER USER INTERFACES
// ============================================================================

/**
 * Customer user interface
 * Extends app user with customer-specific information
 */
export interface ICustomerUser extends IBaseAuditFields, IBaseStatusFields {
  /** Unique identifier */
  id?: number;
  
  /** Associated app user ID */
  id_app_user: number;
  
  /** Full name of customer */
  full_name?: string | null;
  
  /** Email address */
  email?: string | null;
  
  /** Mobile phone number */
  mobile?: string | null;
  
  /** Profile image ID */
  id_image?: number | null;
  
  /** Sign up type (email, social, etc.) */
  sign_up_type?: string | null;
  
  /** Third-party authentication response data */
  third_party_response?: Record<string, unknown> | null;
  
  /** Gender */
  gender?: string | null;
}

/**
 * Customer user creation payload
 */
export interface ICustomerUserCreatePayload {
  /** Associated app user ID */
  id_app_user: number;
  
  /** Full name */
  full_name?: string;
  
  /** Email address */
  email?: string;
  
  /** Mobile phone number */
  mobile?: string;
  
  /** Country ID */
  country_id?: number;
  
  /** Profile image ID */
  id_image?: number;
  
  /** Sign up type */
  sign_up_type?: string;
  
  /** Third-party response data */
  third_party_response?: Record<string, unknown>;
  
  /** Gender */
  gender?: string;
  

  
  /** User ID creating this record */
  created_by?: number;
}

// ============================================================================
// BUSINESS USER INTERFACES
// ============================================================================

/**
 * Business user interface
 * Extends app user with business-specific information
 */
export interface IBusinessUser extends IBaseAuditFields, IBaseStatusFields {
  /** Unique identifier */
  id?: number;
  
  /** Associated app user ID */
  id_app_user: number;
  
  /** Business user name */
  name?: string | null;
  
  /** Email address */
  email?: string | null;
  
  /** Phone number */
  phone_number?: string | null;
  
  /** Profile image ID */
  id_image?: number | null;
}

/**
 * Business user creation payload
 */
export interface IBusinessUserCreatePayload {
  /** Associated app user ID */
  id_app_user: number;
  
  /** Business user name */
  name?: string;
  
  /** Email address */
  email?: string;
  
  /** Phone number */
  phone_number?: string;
  
  /** Profile image ID */
  id_image?: number;
  
  /** User ID creating this record */
  created_by?: number;
}

// ============================================================================
// USER AUTHENTICATION INTERFACES
// ============================================================================

/**
 * User login payload
 */
export interface IUserLoginPayload {
  /** Username for login */
  username: string;
  
  /** Password for login */
  password: string;
}

/**
 * User login response
 */
export interface IUserLoginResponse {
  /** Access token */
  accessToken: string;
  
  /** Refresh token */
  refreshToken: string;
  
  /** User information */
  user: Partial<IAppUser>;
  
  /** Token expiration time */
  expiresIn?: number;
}

/**
 * User password reset payload
 */
export interface IUserPasswordResetPayload {
  /** Username or email */
  identifier: string;
  
  /** New password */
  newPassword: string;
  
  /** Reset token */
  resetToken?: string;
}

/**
 * User password change payload
 */
export interface IUserPasswordChangePayload {
  /** Current password */
  currentPassword: string;
  
  /** New password */
  newPassword: string;
  
  /** User ID */
  userId: number;
}
