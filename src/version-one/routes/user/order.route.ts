import { Router } from "express";
import { addProductOrderFn, addProductWithPaypalOrderFn, getAllOrdersUserFn , orderDetailsAPIFn } from "../../controllers/orders.controller";

export default  (app: Router) => {
    app.post("/order", addProductOrderFn)
    app.get("/orders", getAllOrdersUserFn)
    app.post("/orders-details", orderDetailsAPIFn)
    

    ////////------------ paypal paymentmethod with order ----------/////////

    app.post("/orders-add", addProductWithPaypalOrderFn)
    
}