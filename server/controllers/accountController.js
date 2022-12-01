import response from "../response";
import Base from "../models/Base";
import { compare, makeHash } from "../bcrypt/bcrypt";
import Loan from "../models/Loan";
import SQL_Date from "../utilities/SQL_Date";
import Emi from "../models/Emi";
import Account from "../models/Account";

export const createBankAccount = async (req, res, next) => {
    try {
        let { account_no } = req.body

        let account = await Account.findOne({ user_id: req.user.user_id });

        if (account) {
            return res.status(404).json({ message: "Your Account already exists" });
        }

        let newAcc = new Account({
            user_id: req.user.user_id,
            balance: 0,
            deposit: 0,
            withdraw: 0,
            account_no: account_no,
            is_loan_eligible: true
        });

        newAcc = await newAcc.save();
        if (!newAcc) {
            return res.status(500).json({ message: "Bank Account create fail. please try again" });
        }

        response(res, "Account create successfully", 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAccountInfo = async (req, res, next) => {
    try {
        let sql = `Select * from accounts where user_id = ?`;
        let Db = await Base.Db;
        let [rows, _] = await Db.query(sql, [req.user.user_id]);
        if (rows.length) {
            response(res, {
                ...rows[0],
            });
        }
    } catch (ex) {
        next(ex);
    }
};

export const getAllTransaction = async (req, res, next) => {
    try {
        const { limit } = req.query;

        let paginate = " ORDER BY created_at desc";
        if (limit) {
            paginate = paginate + " LIMIT " + limit;
        }

        let sql = `
        Select t.*, ru.username as receiver_name, ru.avatar as receiver_avatar 
            from transactions t left 
            join users ru on ru.user_id = t.receiver 
            where sender = ? OR receiver = ? ${paginate}`;

        let Db = await Base.Db;
        let [rows, _] = await Db.query(sql, [req.user.user_id, req.user.user_id]);
        if (rows.length) {
            response(res, rows);
        }
    } catch (ex) {
        next(ex);
    }
};

export const getOtherPeoples = async (req, res, next) => {
    try {
        const { limit } = req.query;

        let paginate = "";
        if (limit) {
            paginate = "LIMIT " + limit;
        }

        let sql = `Select username, user_id, avatar from users ${paginate}`;
        let Db = await Base.Db;
        let [rows, _] = await Db.query(sql);
        if (rows.length) {
            response(res, rows);
        }
    } catch (ex) {
        next(ex);
    }
};

export const transaction = async (req, res, next) => {
    try {
        const { account_no, amount, password, description, payment_type } = req.body;
        let Db = await Base.Db;

        // find auth account info such as password, account no
        let [authUser] = await Db.query(
            `
            select u.*, a.balance, a.account_no from users u 
                left join accounts a on u.user_id = a.user_id 
                where u.user_id = ? 
            `,
            [req.user.user_id]
        );

        if (!authUser.length) {
            return response(res);
        }
        authUser = authUser[0];

        if (account_no === authUser.account_no) {
            return response(res, "You can't send money to your own account", 422);
        }

        if (!compare(password, authUser.password)) {
            return response(res, "Please provide valid password", 401);
        }

        if (authUser.balance < amount) {
            return response(res, "Insufficient Balance", 401);
        }

        // find destination account
        let [receiverUser] = await Db.query(`select * from accounts where account_no = ? `, [
            account_no,
        ]);
        if (!receiverUser.length) {
            return response(res, "Account number is wrong", 404);
        }
        receiverUser = receiverUser[0];

        // increase destination user balance
        let [result] = await Db.execute(
            `
            UPDATE accounts
                SET balance = balance + ?,
                   income = income + ?
             where account_no = ?
         `,
            [amount, amount, receiverUser.account_no]
        );

        if (!result.affectedRows) {
            return response(res, "Money transaction fail", 500);
        }

        // decrease sender balance
        let [result2] = await Db.execute(
            `
            UPDATE accounts
                SET 
                    balance = balance - ?,
                    withdraw = withdraw + ?
             where account_no = ?
         `,
            [amount, amount, authUser.account_no]
        );

        if (!result2.affectedRows) {
            // please revert preview money sending or better use data transaction
            // please revert preview money sending or better use data transaction
            // please revert preview money sending or better use data transaction
            // please revert preview money sending or better use data transaction
            return response(res, "Money transaction fail", 500);
        }

        // create a transaction
        // decrease sender balance
        let [result3] = await Db.execute(
            `
                INSERT INTO transactions (receiver, sender, amount, description, payment_type) VALUES (?, ?, ?, ?, ?)
            `,
            [receiverUser.user_id, authUser.user_id, amount, description, payment_type]
        );

        if (!result3.affectedRows) {
            // please revert preview all step or better use data transaction
            // please revert preview all step or better use data transaction
            // please revert preview all step or better use data transaction
            // please revert preview all step or better use data transaction
            return response(res, "Money transaction fail", 500);
        }

        return response(res, "Money transaction successes", 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAllLoansInfo = async (req, res, next) => {
    try {
        let Db = await Base.Db;

        let [loans] = await Db.query(`select * from loans where user_id = ?`, [req.user.user_id]);
        if (!loans) {
            return next(Error("Internal error. Please try again"));
        }
        return response(res, loans, 200);
    } catch (ex) {
        next(ex);
    }
};

export const createLoan = async (req, res, next) => {
    try {
        const { loanPurpose, nid, amount, loanDuration } = req.body;

        let Db = await Base.Db;

        let [[auth]] = await Db.query(
            `select a.account_no, a.is_loan_eligible from users u join accounts a on a.user_id = u.user_id where u.user_id = ?`,
            [req.user.user_id]
        );
        if (!auth) {
            return next(Error("Internal error. Please try again"));
        }
        if (auth.is_loan_eligible !== 1) {
            return next(Error("You are not Loan Eligible"));
        }

        let newLoan = new Loan({
            user_id: req.user.user_id,
            account_no: auth.account_no,
            loan_purpose: loanPurpose,
            interest_rate: 5,
            nid: nid,
            amount: amount,
            loan_duration: loanDuration,
            expired_at: SQL_Date(), // increase from now
            description: "",
        });

        newLoan = await newLoan.save();

        if (!newLoan) {
            return next(Error("Internal error. Please try again"));
        }

        // increase user account  balance
        let [result] = await Db.execute(
            `
            UPDATE accounts
                SET balance = balance + ?,
                is_loan_eligible =  0
             where account_no = ?
         `,
            [amount, auth.account_no]
        );

        if (!result.affectedRows) {
            return response(res, "Loan request fail, Please try again", 500);
        }

        return response(res, "Loan request successfully", 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAllEmi = async (req, res, next) => {
    try {
        let Db = await Base.Db;

        let [[account]] = await Db.query(`select * from accounts where user_id= ?`, [
            req.user.user_id,
        ]);
        if (!account) {
            return response(res, "Account not found", 404);
        }

        let [emis] = await Db.query(
            `
                select * from emi where loan_id = ? order by created_at desc
            `,
            [account.current_loan_id]
        );

        return response(res, emis, 200);
    } catch (ex) {
        next(ex);
    }
};

export const createEmi = async (req, res, next) => {
    try {
        const { description } = req.body;

        let Db = await Base.Db;

        let [[auth]] = await Db.query(
            `
            select a.account_no, a.current_loan_id, a.is_loan_eligible, l.monthly_emi
            from users u 
                join accounts a on a.user_id = u.user_id
                    join loans l on l.id = a.current_loan_id
            where u.user_id = ?`,
            [req.user.user_id]
        );

        if (!auth) {
            return next(Error("Internal error. Please try again"));
        }

        let [emis] = await Db.query(
            `
                select * from emi where loan_id = ? order by created_at desc
            `,
            [auth.current_loan_id]
        );

        let emi_no = 1;
        let lastEmi;

        if (emis && emis.length > 0) {
            emi_no = emis.length + 1;
            lastEmi = emis[0];
        }

        let month = 1000 * 3600 * 24 * 30;

        let nextMonth;
        if (lastEmi) {
            let date = Date.parse(lastEmi.created_at);
            let d = new Date(date).getTime() + month;
            nextMonth = SQL_Date(d);
        }

        let newEmi = new Emi({
            user_id: req.user.user_id,
            loan_id: auth.current_loan_id,
            amount: auth.monthly_emi,
            emi_no: emi_no,
            description: description,
            created_at: nextMonth,
            updated_at: nextMonth,
        });

        newEmi = await newEmi.save();

        return response(res, "Loan request successfully", 201);
    } catch (ex) {
        next(ex);
    }
};
