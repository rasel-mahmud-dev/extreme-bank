import response from "../response";
import Base from "../models/Base";
import {compare, makeHash} from "../bcrypt/bcrypt";
import Account from "../models/Account";
import {ObjectId} from "mongodb";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Notification from "../models/Notification";


export const createBankAccount = async (req, res, next) => {
    try {
        let {account_no, nid, phone} = req.body;

        let account = await Account.findOne({user_id: req.user.user_id});

        if (account) {
            return res.status(404).json({message: "Your Account already exists"});
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
            return res.status(500).json({message: "Bank Account create fail. please try again"});
        }

        response(res, "Account create successfully", 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAccountInfo = async (req, res, next) => {
    try {
        let acc = await Account.findOne({user_id: new ObjectId(req.user.user_id)});
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
        // const {limit = 20} = req.query;
        // let paginate = " ORDER BY created_at desc";
        // if (limit) {
        //     paginate = paginate + " LIMIT " + limit;
        // }

        const transactions = await Transaction.aggregate([
            {
                $match: {
                    $or: [
                        {sender_id: new ObjectId(req.user.user_id)},
                        {receiver_id: new ObjectId(req.user.user_id)}
                    ]
                }
            },
            { $lookup: {
                from: "users",
                    localField: "sender_id",
                    foreignField: "_id",
                    as: "sender"
                } },
            { $unwind: { path: "$sender" }  },
            { $lookup: {
                    from: "users",
                    localField: "receiver_id",
                    foreignField: "_id",
                    as: "receiver"
                } },
            { $unwind: { path: "$receiver" }  }
        ])
        response(res, transactions);

    } catch (ex) {
        next(ex);
    }
};

export const getOtherPeoples = async (req, res, next) => {
    try {
        const {limit} = req.query;

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

export const moneyTransfer = async (req, res, next) => {
    try {
        const {account_no, amount, password, description, payment_type} = req.body;

        // find auth account info such as password, account no
        let user = await User.aggregate([
            {$match: {_id: new ObjectId(req.user.user_id)}},
            {
                $lookup: {
                    from: "accounts",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "account"
                }
            },
            {$unwind: {path: "$account", preserveNullAndEmptyArrays: false}}
        ])
        if (!user || user.length === 0) {
            return response(res, "sorry account not found", 404)
        }
        user = user[0]

        if (account_no === user.account_no) {
            return response(res, "You can't send money to your own account", 422);
        }


        if (!compare(password, user.password)) {
            return response(res, "Please provide valid password", 401);
        }

        if (user.account.balance < amount) {
            return response(res, "Insufficient Balance", 409);
        }

        // find destination account
        let desAccount = await Account.findOne({account_no: account_no})
        if (!desAccount) {
            return response(res, "Account number is wrong", 404);
        }
        // increase destination user balance
        await Account.updateOne({_id: new ObjectId(desAccount._id)}, {
            $inc: {
                balance: amount
            }
        })

        // decrease sender balance
        await Account.updateOne({_id: new ObjectId(user.account._id)}, {
            $inc: {
                balance: -amount
            }
        })


        // if (!result2.affectedRows) {
        //     // please revert preview money sending or better use data transaction
        //     // please revert preview money sending or better use data transaction
        //     // please revert preview money sending or better use data transaction
        //     // please revert preview money sending or better use data transaction
        //     return response(res, "Money transaction fail", 500);
        // }

        // create a transaction
        let newTransaction = new Transaction({
            sender_id: user.user_id,
            receiver_id: desAccount.user_id,
            amount: amount,
            description: description,
            payment_type: payment_type,
        })
        newTransaction = await newTransaction.save();

        let notificationReceiver = await Notification.createNotification({
            user_id: desAccount.user_id,
            label: "You Received $" + amount + "from " + user.username
        });

        let notificationSender = await Notification.createNotification({
            user_id: user.user_id,
            label: "You send $" + amount + " to " + desAccount.account_no
        });

        return response(res, {
            message: "Money transaction successes",
            notification: notificationSender,
            // notification: notificationReceiver,
            transaction: newTransaction,
        }, 201);
    } catch (ex) {
        console.log(ex)
        next(ex);
    }
};
