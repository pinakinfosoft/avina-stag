import { Request, RequestHandler, Response } from "express";
import {
  PUBLIC_AUTHORIZATION_KEY,
  PUBLIC_AUTHORIZATION_TOKEN,
  SECURE_COMMUNICATION,
} from "../config/env.var";
import { verifyJWT } from "../helpers/jwt.helper";
import {
  APP_KEY,
  BASE_INFO_URL,
  BASE_MASTER_URL,
  BASE_TEMPLATE_TWO_PRODUCT_URL,
  CLIENT_MANAGEMENT_URL,
  JWT_EXPIRED_ERROR_NAME,
  PUBLIC_API_URL,
  SUPER_ADMIN_AUTH_API_VERSIONS,
  SUPER_ADMIN_CREATED_ROLES_COMPANY_KEY,
} from "../utils/app-constants";
import {
  AccessRolePermission,
  ActiveStatus,
  DeletedStatus,
  USER_TYPE,
} from "../utils/app-enumeration";
import {
  DEFAULT_STATUS_CODE_ERROR,
  UNAUTHORIZED_ACCESS_CODE,
  BAD_REQUEST_CODE,
  DEFAULT_STATUS_CODE_SUCCESS,
  AUTHORIZATION_TOKEN_IS_REQUIRED,
  HTTP_METHOD_NOT_FOUND,
  ROLE_API_PERMISSION_NOT_FOUND,
  ROLE_NOT_FOUND,
} from "../utils/app-messages";
import {
  decryptRequestData,
  getMethodFromRequest,
  resBadRequest,
  resUnauthorizedAccess,
  resUnknownError,
} from "../utils/shared-functions";
import { AppUser } from "../version-one/model/app-user.model";
import { Role } from "../version-one/model/role.model";
import { RoleApiPermission } from "../version-one/model/role-api-permission.model";
import { RolePermission } from "../version-one/model/role-permission.model";
import { RolePermissionAccess } from "../version-one/model/role-permission-access.model";
import { MenuItem } from "../version-one/model/menu-items.model";
import { CompanyInfo } from "../version-one/model/companyinfo.model";
import { Op } from "sequelize";

// ============================================================================
// PUBLIC AUTHENTICATION
// ============================================================================

/**
 * Public authentication middleware
 * Validates public authorization key
 */
export const publicAuthentication: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(BAD_REQUEST_CODE)
      .send(resBadRequest({ message: AUTHORIZATION_TOKEN_IS_REQUIRED }));
  }

  if (req.headers.authorization === PUBLIC_AUTHORIZATION_KEY) {
    return next();
  }

  return res.status(UNAUTHORIZED_ACCESS_CODE).send(resUnauthorizedAccess());
};

// ============================================================================
// JWT VERIFICATION UTILITIES
// ============================================================================

/**
 * Verifies JWT authorization token
 * @param req - Express request object
 * @param res - Express response object
 * @returns Decoded JWT payload or sends error response
 */
export const verifyAuthorizationToken = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(BAD_REQUEST_CODE)
        .send(resBadRequest({ message: AUTHORIZATION_TOKEN_IS_REQUIRED }));
    }

    const result = await verifyJWT(req.headers.authorization);

    if (result.code === DEFAULT_STATUS_CODE_SUCCESS) {
      return result.data;
    } else if (
      result.code === UNAUTHORIZED_ACCESS_CODE &&
      result.message === JWT_EXPIRED_ERROR_NAME
    ) {
      return res.status(result.code).send(result);
    }

    return res.status(DEFAULT_STATUS_CODE_ERROR).send(resUnknownError());
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};

/**
 * Simple authentication middleware
 * Verifies JWT token and continues to next middleware
 */
export const authentication: RequestHandler = async (req, res, next) => {
  const data = await verifyAuthorizationToken(req, res);
  if (!res.headersSent) {
    return next();
  }
};

// ============================================================================
// REQUEST DECRYPTION UTILITIES
// ============================================================================

/**
 * Decrypts request body if secure communication is enabled
 * @param req - Express request object
 */
const decryptRequestBody = (req: Request): void => {
  if (
    req.body.data &&
    SECURE_COMMUNICATION.toString() === "true" &&
    !PUBLIC_API_URL.includes(req.originalUrl)
  ) {
    const originalObject = req.body.data;
    const decryptedData = JSON.parse(decryptRequestData(originalObject));
    req.body = { ...decryptedData };
  }
};

/**
 * Extracts company key from request
 * Checks query, params, and body
 * @param req - Express request object
 * @returns Company key or undefined
 */
const getCompanyKeyFromRequest = (req: Request): string | undefined => {
  return (
    (req.query.company_key as string) ||
    (req.params.company_key as string) ||
    req.body.company_key
  );
};

/**
 * Decrypts company key from query if present
 * @param req - Express request object
 */
const decryptCompanyKey = (req: Request): void => {
  if (req?.query?.company_key) {
    const companyKey = decryptRequestData(req.query.company_key as string);
    req.query.company_key =
      companyKey && companyKey !== "" ? companyKey : req.query.company_key;
  }
};

// ============================================================================
// SESSION SETUP UTILITIES
// ============================================================================

/**
 * Creates guest session for public API access
 * @param req - Express request object
 */
const setGuestSession = (req: Request): void => {
  req.body["session_res"] = {
    id: null,
    id_app_user: null,
    userType: USER_TYPE.Guest,
    id_role: null,
  };
  // Use single database connection (default dbContext)
  req.body["db_connection"] = null;
};

/**
 * Creates public session with additional fields
 * @param req - Express request object
 */
const setPublicSession = (req: Request): void => {
  req.body["session_res"] = {
    id: null,
    id_app_user: null,
    userType: USER_TYPE.Guest,
    id_role: null,
    otp: null,
  };
  // Use single database connection (default dbContext)
  req.body["db_connection"] = null;
};

/**
 * Sets authenticated user session
 * @param req - Express request object
 * @param jwtPayload - Decoded JWT payload
 */
const setAuthenticatedSession = (req: Request, jwtPayload: any): void => {
  req.body["session_res"] = jwtPayload;
  // Use single database connection (default dbContext)
  req.body["db_connection"] = null;
};

// ============================================================================
// TOKEN VERIFICATION MIDDLEWARE
// ============================================================================

/**
 * Token verification middleware
 * Handles JWT verification and request decryption
 * Sets up session and database connection
 */
export const tokenVerification: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(BAD_REQUEST_CODE)
        .send(resBadRequest({ message: AUTHORIZATION_TOKEN_IS_REQUIRED }));
    }

    // Decrypt request body if needed
    decryptRequestBody(req);

    const companyKey = getCompanyKeyFromRequest(req);

    // Handle public authorization token
    if (req.headers.authorization === PUBLIC_AUTHORIZATION_TOKEN) {
      setGuestSession(req);
      return next();
    }

    // Handle public authorization key
    if (req.headers.authorization === PUBLIC_AUTHORIZATION_KEY) {
      setPublicSession(req);
      return next();
    }

    // Handle JWT token
    const result = await verifyJWT(req.headers.authorization);

    if (result.code === DEFAULT_STATUS_CODE_SUCCESS) {
      const jwtPayload = result.data as any;

      if (!jwtPayload.id_app_user) {
        return res
          .status(UNAUTHORIZED_ACCESS_CODE)
          .send(resUnauthorizedAccess());
      }

      // Decrypt request body if needed (for authenticated users)
      decryptRequestBody(req);

      setAuthenticatedSession(req, jwtPayload);
      return next();
    } else {
      return res.status(result.code).send(result);
    }
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};

/**
 * Token verification middleware for V4 API
 * Similar to tokenVerification but with company key decryption
 */
export const tokenVerificationForV4: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Decrypt company key from query if present
    decryptCompanyKey(req);

    if (!req.headers.authorization) {
      return res
        .status(BAD_REQUEST_CODE)
        .send(resBadRequest({ message: AUTHORIZATION_TOKEN_IS_REQUIRED }));
    }

    // Decrypt request body if needed
    decryptRequestBody(req);

    const companyKey = getCompanyKeyFromRequest(req);

    // Handle public authorization token
    if (req.headers.authorization === PUBLIC_AUTHORIZATION_TOKEN) {
      setGuestSession(req);
      return next();
    }

    // Handle public authorization key
    if (req.headers.authorization === PUBLIC_AUTHORIZATION_KEY) {
      setPublicSession(req);
      return next();
    }

    // Handle JWT token
    const result = await verifyJWT(req.headers.authorization);

    if (result.code === DEFAULT_STATUS_CODE_SUCCESS) {
      const jwtPayload = result.data as any;

      if (!jwtPayload.id_app_user) {
        return res
          .status(UNAUTHORIZED_ACCESS_CODE)
          .send(resUnauthorizedAccess());
      }

      // Decrypt request body if needed (for authenticated users)
      decryptRequestBody(req);

      setAuthenticatedSession(req, jwtPayload);
      return next();
    } else {
      return res.status(result.code).send(result);
    }
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};

// ============================================================================
// AUTHORIZATION MIDDLEWARE
// ============================================================================

/**
 * Admin request authorization middleware
 * Validates user permissions and role-based access
 */
export const authorization: RequestHandler = async (req, res, next) => {
  try {
    // Use models directly
    const userModel = req.baseUrl.includes(SUPER_ADMIN_AUTH_API_VERSIONS)
      ? AppUser
      : null;
    const roleModel = req.baseUrl.includes(SUPER_ADMIN_AUTH_API_VERSIONS)
      ? Role
      : null;
    const roleApiPermissionModel = req.baseUrl.includes(
      SUPER_ADMIN_AUTH_API_VERSIONS
    )
      ? RoleApiPermission
      : null;
    const rolePermissionModel = req.baseUrl.includes(
      SUPER_ADMIN_AUTH_API_VERSIONS
    )
      ? RolePermission
      : null;
    const rolePermissionAccessModel = req.baseUrl.includes(
      SUPER_ADMIN_AUTH_API_VERSIONS
    )
      ? RolePermissionAccess
      : null;
    const MenuItemModel = req.baseUrl.includes(SUPER_ADMIN_AUTH_API_VERSIONS)
      ? MenuItem
      : null;
    const CompanyInfoModel = req.baseUrl.includes(SUPER_ADMIN_AUTH_API_VERSIONS)
      ? CompanyInfo
      : null;

    // Handle super admin authentication
    if (req.baseUrl.includes(SUPER_ADMIN_AUTH_API_VERSIONS)) {
      const findUser = await userModel.findOne({
        where: { id: req.body.session_res.id_app_user },
      });

      if (!findUser) {
        return res
          .status(DEFAULT_STATUS_CODE_ERROR)
          .send(resUnauthorizedAccess({ data: ROLE_NOT_FOUND }));
      }

      const findUserRole = await roleModel.findOne({
        where: {
          id: findUser.dataValues.id_role,
          is_active: ActiveStatus.Active,
          is_deleted: DeletedStatus.No,
        },
      });

      if (!(findUserRole && findUserRole.dataValues)) {
        return res
          .status(DEFAULT_STATUS_CODE_ERROR)
          .send(resUnauthorizedAccess({ data: ROLE_NOT_FOUND }));
      }

      // Validate company for client management URLs
      if (req.originalUrl.includes(CLIENT_MANAGEMENT_URL)) {
        const company = await CompanyInfoModel.findOne({
          where: {
            key: JSON.parse(await decryptRequestData(APP_KEY)),
          },
        });

        if (!company) {
          return res
            .status(DEFAULT_STATUS_CODE_ERROR)
            .send(
              resUnauthorizedAccess({ data: ROLE_API_PERMISSION_NOT_FOUND })
            );
        }
      }

      // Handle super admin with OTP validation
      if (
        findUser.dataValues?.user_type == USER_TYPE.Administrator &&
        findUser.dataValues.is_super_admin == true
      ) {
        if (
          findUser &&
          findUser.dataValues.one_time_pass != req.body.session_res.otp
        ) {
          return res.status(DEFAULT_STATUS_CODE_ERROR).send(resUnauthorizedAccess());
        } else {
          return next();
        }
      } else if (req.body.session_res.id_role === 0) {
        return next();
      }
    } else {
      // Non-super admin routes
      if (req.body.session_res.id_role === 0) {
        return next();
      }
    }

    // Validate HTTP method
    const method = getMethodFromRequest(req.method);
    if (method === 0) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(resUnauthorizedAccess({ data: HTTP_METHOD_NOT_FOUND }));
    }

    // Build API endpoint
    const baseUrlParts = req.baseUrl.split("/");
    const lastPart =
      baseUrlParts[baseUrlParts.length - 1] === "admin" ||
      baseUrlParts[baseUrlParts.length - 1] === "user"
        ? baseUrlParts[baseUrlParts.length - 1]
        : "";
    const apiEndpoint = `/${lastPart}${req.route.path}`;

    // Find user and role
    const findUser = await userModel.findOne({
      where: { id: req.body.session_res.id_app_user },
    });

    if (!findUser) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(resUnauthorizedAccess({ data: ROLE_NOT_FOUND }));
    }

    const findUserRole = await roleModel.findOne({
      where: {
        id: findUser.dataValues.id_role,
        is_active: ActiveStatus.Active,
        is_deleted: DeletedStatus.No,
      },
    });

    if (!(findUserRole && findUserRole.dataValues)) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(resUnauthorizedAccess({ data: ROLE_NOT_FOUND }));
    }

    // Find role API permission
    let resultRAP: any;

    if (
      apiEndpoint.startsWith(BASE_MASTER_URL) ||
      apiEndpoint.includes(BASE_INFO_URL) ||
      apiEndpoint.includes(BASE_TEMPLATE_TWO_PRODUCT_URL)
    ) {
      resultRAP = await roleApiPermissionModel.findOne({
        where: {
          http_method: method,
          api_endpoint: apiEndpoint,
          is_active: ActiveStatus.Active,
          master_type:
            req.params.master_type ||
            req.body.master_type ||
            req.body.info_key ||
            req.params.info_key ||
            req.params.product_type ||
            req.body.product_type ||
            String(req.params.banner_type) ||
            String(req.body.banner_type) ||
            req.params.section_type ||
            req.body.section_type,
        },
      });
    } else {
      resultRAP = await roleApiPermissionModel.findOne({
        where: {
          http_method: method,
          api_endpoint: apiEndpoint,
          is_active: ActiveStatus.Active,
        },
      });
    }

    if (!(resultRAP && resultRAP.dataValues)) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(
          resUnauthorizedAccess({ data: ROLE_API_PERMISSION_NOT_FOUND })
        );
    }

    // Validate menu item access for super admin
    const menuItem = await MenuItemModel.findOne({
      where: { id: resultRAP.dataValues.id_menu_item },
    });

    if (
      menuItem &&
      menuItem.dataValues.is_for_super_admin == false &&
      findUser &&
      findUser.dataValues.is_super_admin == true
    ) {
      return next();
    }

    // Validate role permission
    const rolePermission = await rolePermissionModel.findOne({
      where: {
        id_role: req.body.session_res.id_role,
        id_menu_item: resultRAP.dataValues.id_menu_item,
        is_active: ActiveStatus.Active
      },
      include: {
        model: rolePermissionAccessModel,
        as: "RPA",
        required: true,
        where: {
          id_action: resultRAP.dataValues.id_action,
          access: AccessRolePermission.Yes,
        },
      },
    });

    if (!(rolePermission && rolePermission.dataValues)) {
      return res.status(DEFAULT_STATUS_CODE_ERROR).send(resUnauthorizedAccess());
    }

    return next();
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};

// ============================================================================
// CUSTOMER AUTHORIZATION MIDDLEWARE
// ============================================================================

/**
 * Customer request authorization middleware
 * Validates customer user type and permissions
 */
export const customerAuthorization: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.session_res.id_role === 0) {
      return next();
    }

    const method = getMethodFromRequest(req.method);

    if (method === 0) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(resUnauthorizedAccess({ data: HTTP_METHOD_NOT_FOUND }));
    }

    // Validate customer user type
    if (parseInt(req.body.session_res.user_type) != USER_TYPE.Customer) {
      return res.status(DEFAULT_STATUS_CODE_ERROR).send(resUnauthorizedAccess());
    }

    return next();
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};
