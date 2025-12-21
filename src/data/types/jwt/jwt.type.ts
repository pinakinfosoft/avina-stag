import { TUserType } from "../common/common.type";

// ============================================================================
// JWT PAYLOAD INTERFACES
// ============================================================================

/**
 * JWT payload structure
 * Contains user authentication and authorization information
 */
export interface IJWTPayload {
  /** User ID (can be app user ID or business/customer user ID) */
  id: number;
  
  /** App user ID (always the base app_users.id) */
  id_app_user: number;
  
  /** User type (Administrator, BusinessUser, Customer, Guest, SuperAdmin) */
  user_type: TUserType;
  
  /** Role ID associated with the user */
  id_role: number | null;
  
}

/**
 * JWT payload for password reset tokens
 */
export interface IResetTokenPayload {
  /** User ID */
  id: number;
  
}

// ============================================================================
// JWT TOKEN INTERFACES
// ============================================================================

/**
 * JWT token response structure
 * Returned after successful token creation
 */
export interface IJWTTokenResponse {
  /** Access token (JWT) */
  token: string;
  
  /** Refresh token (JWT) */
  refreshToken: string;
}

/**
 * Decoded JWT payload structure
 * Structure after verifying and decoding a JWT token
 */
export interface IDecodedJWTPayload extends IJWTPayload {
  /** Token issued at timestamp (iat) */
  iat?: number;
  
  /** Token expiration timestamp (exp) */
  exp?: number;
}

// ============================================================================
// JWT FUNCTION TYPES
// ============================================================================

/**
 * Function type for creating user JWT tokens
 * @param id - User ID
 * @param data - JWT payload data
 * @param userType - User type for determining token expiration
 * @returns Object containing access token and refresh token
 */
export type ICreateUserJWT = (
  id: number,
  data: IJWTPayload,
  userType: TUserType
) => IJWTTokenResponse;

/**
 * Function type for verifying JWT tokens
 * @param token - JWT token string to verify
 * @returns Decoded JWT payload or error
 */
export type IVerifyJWT = (token: string) => Promise<IDecodedJWTPayload | Error>;

/**
 * Function type for creating password reset tokens
 * @param id - User ID
 * @returns Reset token string
 */
export type ICreateResetToken = (
  id: number,
) => string;

// ============================================================================
// JWT ERROR TYPES
// ============================================================================

/**
 * JWT error types
 */
export type TJWTErrorType =
  | "TokenExpiredError"
  | "JsonWebTokenError"
  | "NotBeforeError"
  | "TokenInvalidError";

/**
 * JWT verification error structure
 */
export interface IJWTError {
  /** Error name/type */
  name: TJWTErrorType | string;
  
  /** Error message */
  message: string;
  
  /** Additional error data */
  data?: unknown;
}

// ============================================================================
// JWT CONFIGURATION TYPES
// ============================================================================

/**
 * JWT expiration time configuration
 */
export interface IJWTExpirationTime {
  /** Access token expiration time in seconds */
  tokenTime: number | string;
  
  /** Refresh token expiration time in seconds */
  refreshTokenTime: number | string;
}

/**
 * JWT expiration time configuration mapped by user type
 */
export type TJWTExpirationTimeMap = {
  [K in TUserType]: IJWTExpirationTime;
} & {
  /** Special case for remember me (type 5) */
  5?: IJWTExpirationTime;
};
