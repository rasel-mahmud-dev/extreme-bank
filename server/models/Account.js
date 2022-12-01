import Base from "./Base";
class Account extends Base {
    static collectionName = "accounts";
    id
    account_no
    user_id
    balance
    withdraw
    deposit
    current_loan_id
    current_loan_emi_recieved = 0

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
