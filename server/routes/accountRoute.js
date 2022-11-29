import * as accountController from "../controllers/accountController";
import {auth} from "../middlewares";

const router = require("express").Router();

// get account detail for logged user
router.get("/", auth, accountController.getAccountInfo);

// get transactions able peopes
router.get("/peoples", auth, accountController.getOtherPeoples);


// get all transactions for logged user
router.get("/transactions", auth, accountController.getAllTransaction);

// make new transactions
router.post("/transactions", auth, accountController.transaction);



// [POST] api/v1/account/loan-money  create a load
router.post("/loan-money", auth, accountController.createLoan);


export default router