import usersRoute from "./usersRoute";


const router  = require("express").Router()

router.get("/", (req, res)=>{
	res.send("Hello")
})

router.use("/api/v1/auth", usersRoute)


export default router