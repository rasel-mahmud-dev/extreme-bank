import * as accountController from "../controllers/accountController";
import {auth} from "../middlewares";

const router = require("express").Router();

router.get("/", auth, accountController.getAccountInfo);
router.get("/transactions", auth, accountController.getAllTransaction);
router.post("/transactions", auth, accountController.transaction);


export default router