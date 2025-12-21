import { Router } from "express";
import {
  getCompanyInfoCustomerFn,
  getCompanyInfoForAdminFn,
  updateWebRestrictURLFn,
} from "../../controllers/companyinfo.controller";

export default (app: Router) => {
  app.get("/company-info", getCompanyInfoCustomerFn);
  app.get("/company-info/admin", getCompanyInfoForAdminFn);

  // app.put("/web-restrict-url/:key", updateWebRestrictURLFn);
};
