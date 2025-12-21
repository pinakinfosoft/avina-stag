import { Router } from "express";
import { addUserAddressFn, cityListCustomerSideFn, countryListCustomerSideFn, currencyListCustomerSideFn, deleteUserAddressFn, getUserAddressFn, mainCategoryListFn, stateListCustomerSideFn, updateUserAddressFn } from "../../../controllers/Frontend/master.controller";
import { addressValidator } from "../../../../validators/address/address.validator";
import { customerAuthorization } from "../../../../middlewares/authenticate";
import { addSubscriptionsValidator } from "../../../../validators/enquirie/enquirie.validator";

export default (app: Router) => {
    app.get("/countries", countryListCustomerSideFn)
    app.post("/states", stateListCustomerSideFn)
    app.post("/cities", cityListCustomerSideFn)
    // app.get("/category/list", mainCategoryListFn)
    // app.get("/currency/list", currencyListCustomerSideFn)


    app.post("/addresses/add", [customerAuthorization, addressValidator], addUserAddressFn )
    app.post("/addresses/get", [customerAuthorization], getUserAddressFn)
    app.put("/addresses/edit", [customerAuthorization, addressValidator], updateUserAddressFn)
    app.post("/addresses/delete", [customerAuthorization], deleteUserAddressFn);

}
