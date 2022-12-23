import response from "../response";
import Base from "../models/Base";
import {compare, makeHash} from "../bcrypt/bcrypt";
import Account from "../models/Account";
import {ObjectId} from "mongodb";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Notification from "../models/Notification";
import Deposit from "../models/Deposit";


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
        let acc = await Account.aggregate([
            {$match: {
                user_id: new ObjectId(req.user.user_id)
            }},
            { $lookup: {
                from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }  },
            {$unwind: {path: "$user"}}
        ]);

        if (!acc || acc.length === 0) {
            response(res, "Please create an account", 404);
        }
        response(res, acc[0], 200);
    } catch (ex) {
        next(ex);
    }
};

export const getAllTransaction = async (req, res, next) => {
    try {
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
            { $unwind: { path: "$receiver" }  },
            { $sort: { created_at: -1} }
        ])
        response(res, transactions);

    } catch (ex) {
        next(ex);
    }
};

export const getOtherPeoples = async (req, res, next) => {
    try {
        const {limit} = req.query;

        let users = await User.aggregate([
            { $match: { _id : { $nin: [new ObjectId(req.user.user_id)] }} },
            { $lookup: {
                    from: "accounts",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "account"
                }
            },
            {$unwind: { path: "$account" }},
            {
            $project: {
                email: "$email",
                username: "$username",
                avatar: "$avatar",
                account_no: "$account.account_no"
            }
            }
        ])

        response(res, users, 200)

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

        if (account_no === user.account.account_no) {
            return response(res, "You can't send money to your own account", 422);
        }


        if(!user.googleId) {
            if (!compare(password, user.password)) {
                return response(res, "Please provide valid password", 401);
            }
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

        // create a transaction
        let newTransaction = new Transaction({
            sender_id: user._id,
            receiver_id: desAccount.user_id,
            amount: amount,
            description: description,
            payment_type: payment_type,
        })
        newTransaction = await newTransaction.save();

        let notificationReceiver = await Notification.createNotification({
            user_id: desAccount.user_id,
            label: "You Received $" + amount + " from " + user.username
        });

        let notificationSender = await Notification.createNotification({
            user_id: user._id,
            label: "You send $" + amount + " to " + desAccount.account_no
        });

        return response(res, {
            message: "Money transfer successes",
            notification: notificationSender,
            // notification: notificationReceiver,
            transaction: newTransaction,
        }, 201);
    } catch (ex) {
        next(ex);
    }
};


export const getAllDeposit = async (req, res, next) => {
    try {
        const deposit = await Deposit.find({user_id: new ObjectId(req.user.user_id)})
        return response(res, deposit, 200);

    } catch (ex) {
        next(ex);
    }
};

export const addDeposit = async (req, res, next) => {
    try {
        const { amount } = req.body;

        const account = await Account.findOne({user_id: new ObjectId(req.user.user_id)})
        if(!account){
            return response(res, "Account not found", 404);
        }

        // create a transaction
        let newDeposit = new Deposit({
            account_no: account.account_no,
            user_id: req.user.user_id,
            amount: amount,
            interest_rate: 5

        })
        newDeposit = await newDeposit.save();

        if(!newDeposit){
            return response(res, "Money Deposit fail", 500)
        }

        let  doc = await Account.updateOne(
            {_id: new ObjectId(account._id)},
            {$inc: { deposit: Number(amount) }}
        )

        if(doc.modifiedCount === 0){
            return response(res, "Money Deposit fail", 500)
        }

        let notification = await Notification.createNotification({
            user_id: req.user.user_id,
            label: "You Deposit $" + amount
        });

        return response(res, {
            message: "Money Deposit successes",
            notification: notification,
            deposit: newDeposit,
        }, 201);

    } catch (ex) {
        next(ex);
    }
};
