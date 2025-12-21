import { Router } from "express";

import {
  getAllSectionsUserFn
} from "../../controllers/template-eight.controller";
import { currencyMiddleware } from "../../../middlewares/currency-rate-change";

export default (app: Router) => {
    // Get all sections (user)
  app.get("/template-one",[currencyMiddleware], getAllSectionsUserFn);
};