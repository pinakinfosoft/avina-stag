import { Router } from "express"
import { getFilterForUserFn } from "../../controllers/filters.controller"


export default (app: Router) => {
    app.get("/filters", getFilterForUserFn)
}