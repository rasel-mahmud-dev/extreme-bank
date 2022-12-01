

import {auth} from "../middlewares";
import {

    createLoan,
    getAllEmi,
    getAllLoansInfo,
    getCurrentLoan, payEmi
} from "../controllers/loanController";


const router = require("express").Router();


// [GET] api/v1/loan/:loanId get all loans
router.get("/loan/:loanId", auth, getCurrentLoan);


// [GET] api/v1/account/loans  get all loans
router.get("/", auth, getAllLoansInfo);


// [POST] api/v1/loan/loan-money  create a load
router.post("/loan-money", auth, createLoan);


// [GET] api/v1/loan/emis  get all emi for current logged user
router.get("/emis", auth, getAllEmi);


// [POST] api/v1/loan/submit-emi  submit a monthly emi
router.post("/pay-emi", auth, payEmi);



export default router