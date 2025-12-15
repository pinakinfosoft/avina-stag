import { RequestHandler } from "express";
import {
  addOrUpdateMenuItemWithPermission,
  authenticateCustomerUserWithOTP,
  authenticateSystemUser,
  // TODO: wire real service when available
  // authenticate3dConfiguratorSystemUser,
  changeAnyUserPassword,
  changePassword,
  customerRegisterOtpVerified,
  deleteMenuItem,
  forgotPassword,
  getMenuItemWithPermissions,
  getProfileForCustomer,
  importMenuItemsWithPermission,
  refreshAuthorizationToken,
  registerCustomerUser,
  registerSystemUser,
  registrationCustomerUserWithThirdParty,
  resendOtpVerification,
  resetPassword,
  statusUpdateForMenuItem,
  superAdminOtpVerified,
  test,
  updateProfileForCustomer,
} from "../services/auth.service";
import { callServiceMethod } from "./base.controller";

export const testFn: RequestHandler = (req, res) => {
  callServiceMethod(req, res, test(req), "registerSystemUserFn");
};

export const registerSystemUserFn: RequestHandler = (req, res) => {
  callServiceMethod(req, res, registerSystemUser(req), "registerSystemUserFn");
};

export const authenticateSystemUserFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    authenticateSystemUser(req),
    "authenticateSystemUserFn"
  );
};

// NOTE: These three handlers are currently simple stubs because the underlying
// service-layer implementations do not yet exist in auth.service.ts. They are
// added to satisfy the router's expectations and prevent Express from
// receiving `undefined` as a callback, which caused
// "Route.post() requires a callback function" at runtime.
// Replace the bodies with real implementations when the services are created.

export const authenticate3dConfiguratorSystemUserFn: RequestHandler = (
  req,
  res
) => {
  // callServiceMethod(req, res, authenticate3dConfiguratorSystemUser(req), "authenticate3dConfiguratorSystemUserFn");
  res.status(501).json({
    success: false,
    message: "authenticate3dConfiguratorSystemUserFn is not implemented yet",
  });
};

export const loginOtpverificationConfigUserFn: RequestHandler = (req, res) => {
  res.status(501).json({
    success: false,
    message: "loginOtpverificationConfigUserFn is not implemented yet",
  });
};

export const otpvVeificationConfigUserFn: RequestHandler = (req, res) => {
  res.status(501).json({
    success: false,
    message: "otpvVeificationConfigUserFn is not implemented yet",
  });
};

export const authenticateCustomerUserWithOTPFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    authenticateCustomerUserWithOTP(req),
    "authenticateCustomerUserWithOTPFn"
  );
};
export const refreshAuthorizationTokenFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    refreshAuthorizationToken(req),
    "refreshAuthorizationTokenFn"
  );
};

export const changePasswordFn: RequestHandler = (req, res) => {
  callServiceMethod(req, res, changePassword(req), "changePasswordFn");
};

export const forgotPasswordFn: RequestHandler = (req, res) => {
  callServiceMethod(req, res, forgotPassword(req), "forgotPasswordFn");
};

export const resetPasswordFn: RequestHandler = (req, res) => {
  callServiceMethod(req, res, resetPassword(req), "resetPasswordFn");
};

export const changeAnyUserPasswordFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    changeAnyUserPassword(req),
    "changeAnyUserPasswordFn"
  );
};

export const registerCustomerUserFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    registerCustomerUser(req),
    "registerCustomerUserFn"
  );
};

export const customerRegisterOtpVerifiedFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    customerRegisterOtpVerified(req),
    "customerRegisterOtpVerifiedFn"
  );
};

export const resendOtpVerificationFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    resendOtpVerification(req),
    "resendOtpVerificationFn"
  );
};

export const updateProfileForCustomerFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    updateProfileForCustomer(req),
    "updateProfileForCustomerFn"
  );
};

export const getProfileForCustomerFn: RequestHandler = (req, res) => {
  callServiceMethod(
    req,
    res,
    getProfileForCustomer(req),
    "getProfileForCustomerFn"
  );
};

/* sign up with third party */

export const registrationCustomerUserWithThirdPartyFn: RequestHandler = (
  req,
  res
) => {
  callServiceMethod(
    req,
    res,
    registrationCustomerUserWithThirdParty(req),
    "registrationCustomerUserWithThirdPartyFn"
  );
};

// Start Admin Panel Menu Access & Permission API Management

  export const addOrUpdateMenuItemWithPermissionFn: RequestHandler = (
    req,
    res
  ) => {
    callServiceMethod(
      req,
      res,
      addOrUpdateMenuItemWithPermission(req),
      "addOrUpdateMenuItemWithPermissionFn"
    );
  };

  export const getMenuItemWithPermissionsFn: RequestHandler = (
    req,
    res
  ) => {
    callServiceMethod(
      req,
      res,
      getMenuItemWithPermissions(req),
      "addOrUpdateMenuItemWithPermissionFn"
    );
  };
  export const importMenuItemsWithPermissionFn: RequestHandler = (
    req,
    res
  ) => {
    callServiceMethod(
      req,
      res,
      importMenuItemsWithPermission(req),
      "importMenuItemsWithPermissionFn"
    );
  };

  export const deleteMenuItemFn: RequestHandler = (
    req,
    res
  ) => {
    callServiceMethod(
      req,
      res,
      deleteMenuItem(req),
      "deleteMenuItemFn"
    );
  };

  export const statusUpdateForMenuItemFn: RequestHandler = (
    req,
    res
  ) => {
    callServiceMethod(
      req,
      res,
      statusUpdateForMenuItem(req),
      "statusUpdateForMenuItemFn"
    );
  };
// End Admin Panel Menu Access & Permission API Management

export const superAdminOtpVerifiedFn: RequestHandler = (
  req,
  res
) => {
  callServiceMethod(
    req,
    res,
    superAdminOtpVerified(req),
    "superAdminOtpVerifiedFn"
  );
};