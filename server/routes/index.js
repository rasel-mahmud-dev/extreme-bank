import usersRoute from "./usersRoute";
import accountRoute from "./accountRoute";
import loanRoute from "./loanRoute";

const router  = require("express").Router()

router.get("/", (req, res)=>{
	res.send("Hello")
})

router.use("/api/v1/auth", usersRoute)
router.use("/api/v1/account", accountRoute)
router.use("/api/v1/loans", loanRoute)


export default router