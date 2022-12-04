import Base from "./Base";
class Account extends Base {
    static collectionName = "accounts";
    _id
    account_no
    user_id
    balance
    withdraw
    deposit
    current_loan_id

    constructor(data) {
        super(Account.collectionName);
        this.account_no = Number(data.account_no);
        this.user_id = data.user_id;
        this.balance = data.balance;
        this.withdraw = data.withdraw;
        this.deposit = data.deposit
    }
}

export default Account;
