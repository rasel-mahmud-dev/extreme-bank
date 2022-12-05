export enum ACTION_TYPES {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_ACCOUNT = "SET_ACCOUNT",
    FETCH_NOTIFICATION = "FETCH_NOTIFICATION",
    SET_NOTIFICATION = "SET_NOTIFICATION",
    TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
}

export type Deposit = {
    amount: number;
    created_at: string;
    interest_rate: number
};

export type CurrentLoan = {
    amount: number;
    total_emi: string;
    current_loan_id: string;
    created_at: string;
    monthly_emi: string;
    interest_rate: number;
    loan_duration: number;
};

export type Account = {
    account_no: string,
    balance: number,
    current_loan_id?: string,
    deposit: number,
    user?: {
        _id: string,
        username: string,
        email: string
        avatar?: string
    },
    user_id: string
    withdraw: number
    _id: string
}
