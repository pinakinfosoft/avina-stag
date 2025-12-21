import { Router } from "express";
import {
  reqArrayImageParser,
  reqProductBulkUploadFileParser,
} from "../../../middlewares/multipart-file-parser";
import {

  getLooseDiamondDetailFn,
  getLooseDiamondsFn,

} from "../../controllers/loose-diamond.controller";

export default (app: Router) => {
  
  app.get("/loose-diamonds", getLooseDiamondsFn);
  app.get("/loose-diamonds/:product_id", getLooseDiamondDetailFn);

};
