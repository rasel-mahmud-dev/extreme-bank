import Base from "./Base";
import {ObjectId} from "mongodb";

class Loan extends Base {
    static collectionName = "loans";
    _id
    user_id
    account_no = ""
    loan_purpose = ""
    nid = ""
    amount = ""
    interest_rate = 0
    loan_duration = ""
    isCompleted = false
    description = ""
    created_at = new Date()
    updated_at = new Date()


    constructor(data) {
        super(Loan.collectionName);
        this.user_id = new ObjectId(data.user_id);
        this.account_no = data.account_no;
        this.loan_purpose = data.loan_purpose;
        this.nid = data.nid;
        this.amount = data.amount;
        this.loan_duration = data.loan_duration
        this.interest_rate = data.interest_rate
        this.description = data.description
    }
}

export default Loan;
