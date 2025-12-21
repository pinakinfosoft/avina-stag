import { Router } from "express";
import { publicAuthentication } from "../../middlewares/authenticate";
import { bulkUploadSampleFileColumnsFn, getAllProductImageNamePublicAPIFn, getProductImagesUsingS3AndAddInDBFn, updateRingConfiguratorProductHeadNumberFn } from "../controllers/product.controller";

export default (app: Router) => {
      app.post(
        "/public/product-images",
        [publicAuthentication],
        getAllProductImageNamePublicAPIFn
    );
      /* get product images using s3 & add image in db */
    
  app.post("/public/product-images/s3-add", getProductImagesUsingS3AndAddInDBFn);
  app.get("/public/sample-files/:type", bulkUploadSampleFileColumnsFn)
  app.put("/public/ring-configurator/head-number", updateRingConfiguratorProductHeadNumberFn)

}