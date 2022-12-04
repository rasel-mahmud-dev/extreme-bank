import passport from "passport";
import * as userController from "../controllers/userController";


const router = require("express").Router();


// Getting login URL
router.get("/google/callback",  passport.authenticate('google', {  session: false}), userController.loginWithGoogle  );

router.get("/google/login",   passport.authenticate('google', {
    scope : ['profile', 'email'] }));

// router.post("/google/login", userController.loginWithGoogle);

router.post("/login", userController.loginUser);
router.post("/registration", userController.createNewUser);
router.get("/current-auth", userController.loginViaToken);
router.get("/logout", userController.logout)

export default router