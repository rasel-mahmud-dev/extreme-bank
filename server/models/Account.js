// const dbConnect = require("../database/dbConnect");

import Base from "./Base";


// import Joi from "joi";
class Account extends Base {
    static tableName = "accounts";
    // id // uuid
    // account_id
    // user_id
    // balance
    // withdraw
    // deposit
    // current_loan_id

    constructor(data) {
        super(Account.tableName);
        this.account_id = data.account_id;
        this.user_id = data.user_id;
        this.balance = data.balance;
        this.withdraw = data.withdraw;
        this.deposit = data.deposit
    }
}

export default Account;
