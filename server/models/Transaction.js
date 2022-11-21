// const dbConnect = require("../database/dbConnect");

import Base from "./Base";


// import Joi from "joi";
class Transaction extends Base {
    static tableName = "transactions";

    public transaction_id
    public server_id
    public receiver
    public amount
    public description
    public payment_type

    constructor(data) {
        super(Transaction.tableName);
        this.server_id = data?.server_id;
        this.receiver = data?.receiver;
        this.amount = data?.amount;
        this.description = data?.description;
        this.payment_type = data?.payment_type
    }
}

export default Transaction;
