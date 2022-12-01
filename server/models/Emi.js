import Base from "./Base";
import {ObjectId} from "mongodb";

class Emi extends Base {
    static collectionName = "emi";
    id
    user_id = ""
    loan_id = ""
    amount = ""
    emi_no = 0
    description = ""
    created_at = ""
    updated_at = ""

    constructor(data) {
        super(Emi.collectionName);
        this.user_id = new ObjectId(data.user_id);
        this.loan_id = new ObjectId(data.loan_id);
        this.amount = data.amount;
        this.emi_no = data.emi_no;
        this.description = data.description;
        this.created_at = data.updated_at ? data.created_at : new Date()
        this.updated_at = data.updated_at ? data.updated_at : new Date()
    }
}

export default Emi;
