import { Router } from "express";
import {
  applyCouponFn,
  removeCouponFn,
} from "../../controllers/coupon.controller";

export default (app: Router) => {
  app.post("/coupons/apply", applyCouponFn);
  app.delete("/coupons/remove", removeCouponFn);
};
