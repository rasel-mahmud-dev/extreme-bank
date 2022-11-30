// const dbConnect = require("../database/dbConnect");

import Base from "./Base";


// import Joi from "joi";
class Account extends Base {
    static tableName = "accounts";

    public account_id
    public user_id
    public balance
    public withdraw
    public deposit
    public current_loan_id

    constructor(data) {
        super(Account.tableName);
        this.account_id = data.account_id;
        this.user_id = data.user_id;
        this.balance = data.balance;
        this.withdraw = data?.withdraw;
        this.deposit = data.deposit
        this.current_loan_id = data?.current_loan_id
    }
}

export default Account;
