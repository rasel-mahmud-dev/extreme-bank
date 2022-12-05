import Base from "./Base";
import {ObjectId} from "mongodb";

class Loan extends Base {
    static collectionName = "loans";
    _id
    user_id
    account_no = ""
    loan_purpose = ""
    nid = ""
    amount = 0
    total_pay = 0
    monthly_emi = 0
    interest_rate = 0
    loan_duration = ""
    total_emi = 0
    is_completed = false
    description = ""
    created_at = new Date()
    updated_at = new Date()


    constructor(data) {
        super(Loan.collectionName);
        this.user_id = new ObjectId(data.user_id);
        this.account_no = data.account_no;
        this.loan_purpose = data.loan_purpose;
        this.nid = data.nid;
        this.amount = Number(data.amount);
        this.loan_duration = Number(data.loan_duration)
        this.total_emi = Number(data.total_emi)
        this.monthly_emi = Number(data.monthly_emi)
        this.total_pay = Number(data.total_pay)
        this.interest_rate = Number(data.interest_rate)
        this.description = data.description
    }
}

export default Loan;
