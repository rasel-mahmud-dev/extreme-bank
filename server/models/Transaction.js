// const dbConnect = require("../database/dbConnect");

import Base from "./Base";
import {ObjectId} from "mongodb";


// import Joi from "joi";
class Transaction extends Base {
    static collectionName = "transactions";
    _id
    sender_id
    receiver_id
    amount
    description
    payment_type
    created_at = new Date()
    updated_at = new Date()

    constructor(data) {
        super(Transaction.collectionName);
        this.sender_id = new ObjectId(data.sender_id);
        this.receiver_id = new ObjectId( data.receiver_id);
        this.amount = data.amount;
        this.description = data.description;
        this.payment_type = data.payment_type
    }
}

export default Transaction;
