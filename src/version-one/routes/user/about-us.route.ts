import { Router } from "express";
import { aboutUsSectionDetailForUserFn, aboutUsSectionListForUserFn } from "../../controllers/about-us.controller";

export default (app: Router) => {

  app.get("/about-us/sections", aboutUsSectionListForUserFn)
  // app.get("/about-us/:id", aboutUsSectionDetailForUserFn)

}