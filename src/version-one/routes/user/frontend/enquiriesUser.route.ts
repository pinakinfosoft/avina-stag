import { Router } from "express";
import { addEnquirieValidator, addProductEnquiriesValidator } from "../../../../validators/enquirie/enquirie.validator";
import { addEnquiriesFn, addProductEnquiriesFn } from "../../../controllers/Frontend/enquiries.controller";

export default (app: Router) => {

    app.post("/enquiries", [addEnquirieValidator], addEnquiriesFn);
    app.post("/enquiries/product", [addProductEnquiriesValidator], addProductEnquiriesFn);

}