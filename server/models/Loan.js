import Base from "./Base";

class Loan extends Base {
    static tableName = "loans";

    user_id = ""
    account_no = ""
    loan_purpose = ""
    nid = ""
    amount = ""
    interest_rate = 0
    loan_duration = ""
    expired_at = ""
    description = ""
    created_at = ""
    updated_at = ""


    constructor(data) {
        super(Loan.tableName);
        this.user_id = data.user_id;
        this.account_no = data.account_no;
        this.loan_purpose = data.loan_purpose;
        this.nid = data.nid;
        this.amount = data.amount;
        this.loan_duration = data.loan_duration
        this.interest_rate = data.interest_rate
        this.description = data.description
        this.expired_at = data.expired_at
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

export default Loan;
