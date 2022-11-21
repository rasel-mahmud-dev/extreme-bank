import getCookie from "../utilities/getCookie";
import response from "../response";
import { parseToken } from "../jwt";
import User from "../models/User";
import Base from "../models/Base";
import { compare } from "../bcrypt/bcrypt";

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
        const {limit} = req.query

        let paginate = ""
        if(limit){
            paginate = "LIMIT " + limit
        }

        let sql = `
        Select t.*, ru.username as receiver_name, ru.avatar as receiver_avatar 
            from transactions t left 
            join users ru on ru.user_id = t.receiver 
            where sender = ? ${paginate}`;

        let Db = await Base.Db;
        let [rows, _] = await Db.query(sql, [req.user.user_id]);
        if (rows.length) {
            response(res, rows);
        }
    } catch (ex) {
        next(ex);
    }
};

export const transaction = async (req, res, next) => {
    try {
        const { account_no, amount, password, description } = req.body;
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


        if(account_no === authUser.account_no){
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
                SET balance = balance + ?
             where account_no = ?
         `,
            [amount, receiverUser.account_no]
        );

        if (!result.affectedRows) {
            return response(res, "Money transaction fail", 500);
        }

        // decrease sender balance
        let [result2] = await Db.execute(
            `
            UPDATE accounts
                SET balance = balance - ?
             where account_no = ?
         `,
            [amount, authUser.account_no]
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
            "INSERT INTO transactions (`receiver`, `sender`, `amount`) VALUES (?, ?, ?)",
            [receiverUser.user_id, authUser.user_id, amount]
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
