import * as accountController from "../controllers/accountController";
import {auth} from "../middlewares";


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
router.post("/transactions", auth, accountController.transaction);



export default router