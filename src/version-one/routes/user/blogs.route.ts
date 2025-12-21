import { Router } from "express";
import {
  bolgDetailAPIFn,
  getBlogsDataUserFn,
} from "../../controllers/blogs.controller";

export default (app: Router) => {
 
  app.get("/blogs", getBlogsDataUserFn);

  // details endpoint expects body with identifier; keep POST but normalize path
  app.post("/blogs/detail", bolgDetailAPIFn);

};
