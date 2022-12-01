import response from "../response";
import Base from "../models/Base";
import { compare, makeHash } from "../bcrypt/bcrypt";
import Loan from "../models/Loan";
import Emi from "../models/Emi";
import Account from "../models/Account";
import { ObjectId } from "mongodb";
import date from "../utilities/date";

export const createBankAccount = async (req, res, next) => {
    try {
        let { account_no, nid, phone } = req.body;

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
            is_loan_eligible: true,
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
        let acc = await Account.findOne({ user_id: new ObjectId(req.user.user_id) });
        if (!acc) {
            response(res, "Please create an account", 404);
        }
        response(res, acc, 200);
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
        let loans = await Loan.find();
        return response(res, loans, 200);
    } catch (ex) {
        next(ex);
    }
};

export const createLoan = async (req, res, next) => {
    try {
        const { loanPurpose, nid, amount, loanDuration, description } = req.body;

        let acc = await Account.findOne({ user_id: new ObjectId(req.user.user_id) });
        if (!acc) {
            return next(Error("Internal error. Please try again"));
        }
        if (!acc.is_loan_eligible) {
            return next(Error("You are not Loan Eligible"));
        }

        let newLoan = new Loan({
            user_id: req.user.user_id,
            account_no: acc.account_no,
            loan_purpose: loanPurpose,
            interest_rate: 10,
            nid: nid,
            amount: amount,
            loan_duration: loanDuration,
            isCompleted: true,
            description: description,
        });

        newLoan = await newLoan.save();
        if (!newLoan) {
            return next(Error("Internal error. Please try again"));
        }

        // increase user account  balance
        let doc = await Account.updateOne(
            { account_no: acc.account_no },
            {
                $set: {
                    is_loan_eligible: false,
                },
                $inc: { balance: Number(amount) },
            }
        );

        if (!doc.modifiedCount) {
            return response(res, "Loan request fail, Please try again", 500);
        }

        return response(res, "Loan request successfully", 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAllEmi = async (req, res, next) => {
    try {
        let emis = await Emi.find({ user_id: new ObjectId(req.user.user_id) });
        return response(res, emis, 200);
    } catch (ex) {
        next(ex);
    }
};

export const createEmi = async (req, res, next) => {
    try {
        const { description } = req.body;

        let account = await Account.aggregate([
            {
                $match: {
                    user_id: new ObjectId(req.user.user_id),
                },
            },
            {
                $lookup: {
                    from: "loans",
                    localField: "current_loan_id",
                    foreignField: "_id",
                    as: "current_loan",
                },
            },
            { $unwind: { path: "$current_loan", preserveNullAndEmptyArrays: true } },
        ]);

        if (account.length === 0) {
            return response(res, "Account not found", 404);
        }

        account = account[0];

        let lastEMi = await (
            await Emi.collection
        )
            .find({ loan_id: new ObjectId(account.current_loan_id) })
            .limit(1)
            .sort({ created_at: 1 })
            .toArray();

        let month = 1000 * 3600 * 24 * 30;
        let nextMonth = new Date();
        if (lastEMi.length !== 0) {
            lastEMi = lastEMi[0];
            let da = Date.parse(lastEMi.created_at);
            let d = new Date(da).getTime() + month;
            nextMonth = date(d);
        }

        let newEMi = new Emi({
            user_id: req.user.user_id,
            loan_id: account.current_loan_id,
            amount: account.current_loan.monthly_emi,
            emi_no: lastEMi.length === 0 ? 1 : lastEMi.emi_no + 1,
            description,
            created_at: nextMonth,
            updated_at: nextMonth,
        });

        newEMi = newEMi.save();
        if (!newEMi) {
            return next(Error("Internal error. Please try again"));
        }

        let doc = await Account.updateOne(
            {
                user_id: new ObjectId(req.user.user_id),
            },
            {
                $inc: {
                    balance: - Number(account.current_loan.monthly_emi),
                },
            }
        );

        if (doc.modifiedCount) {
            return response(res, "Emi received successfully", 201);
        } else {
            return next(Error("Emi received fail"), 500);
        }
    } catch (ex) {
        next(ex);
    }
};
