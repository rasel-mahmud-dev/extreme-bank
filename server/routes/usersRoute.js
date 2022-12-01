import * as userController from "../controllers/userController";


const router = require("express").Router();

router.post("/login", userController.loginUser);
router.post("/registration", userController.createNewUser);
router.get("/current-auth", userController.loginViaToken);
router.get("/logout", userController.logout)

export default router