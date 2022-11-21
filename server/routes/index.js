import usersRoute from "./usersRoute";
import accountRoute from "./accountRoute";


const router  = require("express").Router()

router.get("/", (req, res)=>{
	res.send("Hello")
})

router.use("/api/v1/auth", usersRoute)
router.use("/api/v1/account", accountRoute)


export default router