import { Router } from "express"
import { PaymentTransactionFn, PaymentTransactionWithPaypalFn , invoivesDetailsApiFn } from "../../controllers/payment.controller"

export default (app: Router) => {

    app.post("/payment",  PaymentTransactionFn)

    /* paypal method */

    app.post("/payment-add",  PaymentTransactionWithPaypalFn)

}