import {
  JWT_EXPIRED_ERROR_NAME,
  JWT_SECRET_KEY,
  RESET_JWT_TOKEN_EXPRATION_TIME,
  USER_JWT_EXPIRATION_TIME,
} from "../utils/app-constants";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { resSuccess, resUnauthorizedAccess } from "../utils/shared-functions";
import {
  ICreateUserJWT,
  IJWTPayload,
  IResetTokenPayload,
  IDecodedJWTPayload,
  IJWTTokenResponse,
  TJWTErrorType,
} from "../data/types/jwt/jwt.type";
import { TUserType } from "../data/types/common/common.type";
import { TResponseReturn } from "../data/interfaces/common/common.interface";

// ============================================================================
// JWT CREATION FUNCTIONS
// ============================================================================

/**
 * Creates JWT access token and refresh token for a user
 * @param id - User ID (legacy parameter, can be derived from data)
 * @param data - JWT payload data containing user information
 * @param userType - User type for determining token expiration time
 * @returns Object containing access token and refresh token
 * 
 * @example
 * ```typescript
 * const tokens = createUserJWT(
 *   userId,
 *   { id: userId, id_app_user: userId, user_type: 1, id_role: 2 },
 *   USER_TYPE.Administrator
 * );
 * ```
 */
export const createUserJWT: ICreateUserJWT = (
  id: number,
  data: IJWTPayload,
  userType: TUserType
): IJWTTokenResponse => {
  const jwtExpiredTime = USER_JWT_EXPIRATION_TIME[userType];

  if (!jwtExpiredTime) {
    throw new Error(`Invalid user type: ${userType}. No expiration time configured.`);
  }

  const token = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: jwtExpiredTime.tokenTime,
  });

  const refreshToken = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: jwtExpiredTime.refreshTokenTime,
  });

  return { token, refreshToken };
};

/**
 * Creates a password reset token
 * @param id - User ID
 * @returns JWT reset token string
 * 
 * @example
 * ```typescript
 * const resetToken = createResetToken(userId);
 * ```
 */
export const createResetToken = (
  id: number,
): string => {
  const payload: IResetTokenPayload = {
    id: id,
  };

  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: RESET_JWT_TOKEN_EXPRATION_TIME,
  });
};

// ============================================================================
// JWT VERIFICATION FUNCTIONS
// ============================================================================

/**
 * Verifies a JWT token and returns the decoded payload
 * @param token - JWT token string to verify
 * @returns Response with decoded JWT payload or error
 * 
 * @example
 * ```typescript
 * const result = await verifyJWT(token);
 * if (result.code === 200) {
 *   const payload = result.data as IDecodedJWTPayload;
 * }
 * ```
 */
export const verifyJWT = async (
  token: string
): Promise<TResponseReturn> => {
  try {
    const result = jwt.verify(token, JWT_SECRET_KEY) as IDecodedJWTPayload;
    return resSuccess({ data: result });
  } catch (error) {
    const jwtError = error as VerifyErrors;

    if (jwtError?.name === JWT_EXPIRED_ERROR_NAME) {
      return resUnauthorizedAccess({
        data: jwtError,
        message: JWT_EXPIRED_ERROR_NAME,
      });
    }

    // Re-throw other JWT errors (invalid token, malformed, etc.)
    throw jwtError;
  }
};

/**
 * Verifies a JWT token and returns the decoded payload directly
 * Throws an error if verification fails
 * @param token - JWT token string to verify
 * @returns Decoded JWT payload
 * @throws Error if token is invalid or expired
 * 
 * @example
 * ```typescript
 * try {
 *   const payload = await verifyJWTDirect(token);
 *   console.log(payload.id_app_user);
 * } catch (error) {
 *   // Handle error
 * }
 * ```
 */
export const verifyJWTDirect = async (
  token: string
): Promise<IDecodedJWTPayload> => {
  try {
    const result = jwt.verify(token, JWT_SECRET_KEY);
    return result as IDecodedJWTPayload;
  } catch (error) {
    const jwtError = error as VerifyErrors;
    throw new Error(
      `JWT verification failed: ${jwtError.name} - ${jwtError.message}`
    );
  }
};

/**
 * Verifies a password reset token
 * @param token - Reset token string to verify
 * @returns Decoded reset token payload
 * @throws Error if token is invalid or expired
 * 
 * @example
 * ```typescript
 * try {
 *   const payload = await verifyResetToken(resetToken);
 *   const userId = payload.id;
 * } catch (error) {
 *   // Handle invalid/expired token
 * }
 * ```
 */
export const verifyResetToken = async (
  token: string
): Promise<IResetTokenPayload & JwtPayload> => {
  try {
    const result = jwt.verify(token, JWT_SECRET_KEY);
    return result as IResetTokenPayload & JwtPayload;
  } catch (error) {
    const jwtError = error as VerifyErrors;
    throw new Error(
      `Reset token verification failed: ${jwtError.name} - ${jwtError.message}`
    );
  }
};

// ============================================================================
// JWT UTILITY FUNCTIONS
// ============================================================================

/**
 * Decodes a JWT token without verification
 * Use with caution - does not verify signature or expiration
 * @param token - JWT token string to decode
 * @returns Decoded payload (may be expired or invalid)
 * 
 * @example
 * ```typescript
 * const payload = decodeJWT(token);
 * console.log(payload.exp); // Check expiration manually
 * ```
 */
export const decodeJWT = (token: string): IDecodedJWTPayload | null => {
  try {
    const decoded = jwt.decode(token) as IDecodedJWTPayload | null;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Checks if a JWT token is expired
 * @param token - JWT token string to check
 * @returns True if token is expired, false otherwise
 * 
 * @example
 * ```typescript
 * if (isJWTExpired(token)) {
 *   // Token is expired, refresh needed
 * }
 * ```
 */
export const isJWTExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true; // Consider invalid tokens as expired
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Gets the expiration time of a JWT token
 * @param token - JWT token string
 * @returns Expiration timestamp in seconds, or null if invalid
 * 
 * @example
 * ```typescript
 * const expTime = getJWTExpiration(token);
 * if (expTime) {
 *   const expiresIn = expTime - Math.floor(Date.now() / 1000);
 * }
 * ```
 */
export const getJWTExpiration = (token: string): number | null => {
  const decoded = decodeJWT(token);
  return decoded?.exp || null;
};

/**
 * Gets the time until JWT token expires
 * @param token - JWT token string
 * @returns Seconds until expiration, or null if invalid/expired
 * 
 * @example
 * ```typescript
 * const timeLeft = getJWTTimeUntilExpiration(token);
 * if (timeLeft && timeLeft < 3600) {
 *   // Token expires in less than an hour, refresh it
 * }
 * ```
 */
export const getJWTTimeUntilExpiration = (token: string): number | null => {
  const expTime = getJWTExpiration(token);
  if (!expTime) {
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiration = expTime - currentTime;

  return timeUntilExpiration > 0 ? timeUntilExpiration : null;
};
