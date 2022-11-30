import Base from "./Base";
import SQL_Date from "../utilities/SQL_Date";

class Loan extends Base {
    static tableName = "emi";
    user_id = ""
    loan_id = ""
    amount = ""
    emi_no = 0
    description = ""
    created_at = ""
    updated_at = ""

    constructor(data) {
        super(Loan.tableName);
        this.user_id = data.user_id;
        this.loan_id = data.loan_id;
        this.amount = data.amount;
        this.emi_no = data.emi_no;
        this.description = data.description;
        this.created_at = data.updated_at ? data.created_at : SQL_Date()
        this.updated_at = data.updated_at ? data.updated_at : SQL_Date()
    }
}

export default Loan;
