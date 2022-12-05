import Base from "./Base";
import {ObjectId} from "mongodb";

class Deposit extends Base {
    static collectionName = "deposit";
    id
    user_id = ""
    amount = 0
    account_no = 0
    interest_rate = 0
    created_at = ""
    updated_at = ""

    constructor(data) {
        super(Deposit.collectionName);
        this.user_id = new ObjectId(data.user_id);
        this.account_no = Number(data.account_no);
        this.amount = Number(data.amount);
        this.interest_rate = Number(data.interest_rate);
        this.created_at = data.updated_at ? data.created_at : new Date()
        this.updated_at = data.updated_at ? data.updated_at : new Date()
    }
}

export default Deposit;
