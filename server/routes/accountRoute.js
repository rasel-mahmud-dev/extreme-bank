import * as accountController from "../controllers/accountController";
import {auth} from "../middlewares";
import {getAllDeposit} from "../controllers/accountController";


const router = require("express").Router();

// create a bank account
router.post("/", auth, accountController.createBankAccount);

// get account detail for logged user
router.get("/", auth, accountController.getAccountInfo);

// get transactions able peoples
router.get("/peoples", auth, accountController.getOtherPeoples);


// get all transactions for logged user
router.get("/transactions", auth, accountController.getAllTransaction);

// make new transactions
router.post("/money-transfer", auth, accountController.moneyTransfer);

// add new deposit
router.post("/deposit-money", auth, accountController.addDeposit);


// get all deposit
router.get("/deposit-money", auth, accountController.getAllDeposit);



export default router