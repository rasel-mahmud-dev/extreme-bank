import usersRoute from "./usersRoute";
import accountRoute from "./accountRoute";
import loanRoute from "./loanRoute";
import notificationRoute from "./notificationRoute";
import Review from "../models/Review";
import response from "../response";

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hello")
})

router.use("/api/v1/auth", usersRoute)
router.use("/api/v1/account", accountRoute)
router.use("/api/v1/loans", loanRoute)
router.use("/api/v1/notifications", notificationRoute)

router.get("/api/v1/reviews", async (req, res, next) => {
    try {
        let reviews = await Review.find()
        response(res, reviews, 200)
    } catch (ex) {
        next(ex)
    }
})


export default router