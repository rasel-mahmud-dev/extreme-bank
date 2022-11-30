import * as accountController from "../controllers/accountController";
import {auth} from "../middlewares";
import {getAllEmi} from "../controllers/accountController";

const router = require("express").Router();

// get account detail for logged user
router.get("/", auth, accountController.getAccountInfo);

// get transactions able peopes
router.get("/peoples", auth, accountController.getOtherPeoples);


// get all transactions for logged user
router.get("/transactions", auth, accountController.getAllTransaction);

// make new transactions
router.post("/transactions", auth, accountController.transaction);



// [GET] api/v1/account/loans  get all loans
router.get("/loans", auth, accountController.getAllLoansInfo);

// [POST] api/v1/account/loan-money  create a load
router.post("/loan-money", auth, accountController.createLoan);



// [POST] api/v1/account/emis  get all emi for current logged user
router.get("/emis", auth, accountController.getAllEmi);

// [POST] api/v1/account/submit-emi  submit a monthly emi
router.post("/submit-emi", auth, accountController.createEmi);


export default router