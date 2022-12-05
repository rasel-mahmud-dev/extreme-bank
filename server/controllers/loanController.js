import Loan from "../models/Loan";
import response from "../response";
import Notification from "../models/Notification";
import Account from "../models/Account";
import {ObjectId} from "mongodb";
import Emi from "../models/Emi";
import calcEmi from "../utilities/calcEmi";


export const getCurrentLoan = async (req, res, next) => {
    try {
        let loan = await Loan.findOne({_id: new ObjectId(req.params.loanId)});
        return response(res, loan, 200);
    } catch (ex) {
        next(ex);
    }
};
export const getAllLoansInfo = async (req, res, next) => {
    try {
        let loans =  await (await Loan.collection).find({user_id: new ObjectId(req.user.user_id)}).sort({created_at: -1}).toArray();
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
            return next(Error("You are not eligible for Loan, You need to paid all EMI to get new Loan"));
        }

        let { totalPay, monthlyPay, totalEmiNumber } = calcEmi(Number(amount), Number(loanDuration), 10)

        let newLoan = new Loan({
            user_id: req.user.user_id,
            account_no: acc.account_no,
            loan_purpose: loanPurpose,
            total_pay: totalPay,
            monthly_emi: monthlyPay,
            total_emi: totalEmiNumber,
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
                    current_loan_id: newLoan._id,
                    is_loan_eligible: false,
                },
                $inc: { balance: Number(amount) },
            }
        );

        if (!doc.modifiedCount) {
            return response(res, "Loan request fail, Please try again", 500);
        }

        let notification = await Notification.createNotification({
            user_id: req.user.user_id,
            label: `Loan given Amount: ${amount}`,
            message: ""
        })

        return response(res, {notification, message: "Your requested loan has been granted."}, 201);
    } catch (ex) {
        next(ex);
    }
};

export const getAllEmi = async (req, res, next) => {
    try {
        let emis = await (await Emi.collection).find({ user_id: new ObjectId(req.user.user_id), loan_id: new ObjectId(req.query.loan_id) })
            .sort({created_at: -1}).toArray()
        return response(res, emis, 200);
    } catch (ex) {
        next(ex);
    }
};


export const payEmi = async (req, res, next) => {
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

        if(!account.current_loan){
            return response(res, "Currently you no purchases any loan", 404);
        }

        let lastEMi = await (
            await Emi.collection
        )
            .find({ loan_id: new ObjectId(account.current_loan_id) })
            .limit(1)
            .sort({ created_at: -1 })
            .toArray();


        let nextMonth = new Date();
        if (lastEMi.length !== 0) {
            lastEMi = lastEMi[0];
            let da = Date.parse(lastEMi.created_at);
            let futureDate = new Date(da)
            let futureMonth = futureDate.getMonth() + 1
            futureDate.setMonth(futureMonth);
            nextMonth = futureDate
        }


        if(lastEMi.emi_no >= account.current_loan.total_emi){
            await Account.updateOne(
                {user_id: new ObjectId(req.user.user_id)},
                { $set: {
                        current_loan_id: new ObjectId("000000000000000000000000")
                    } }
            )
            await Loan.updateOne(
                {_id: new ObjectId(account.current_loan_id)},
                { $set: {
                        is_completed: true
                    } }
            )
            return response(res, {
                message: "Your Current Loan has paid"
            }, 409);
        }

        let newEMi = new Emi({
            user_id: req.user.user_id,
            loan_id: new ObjectId(account.current_loan_id),
            amount: account.current_loan.monthly_emi,
            emi_no: lastEMi.length === 0 ? 1 : lastEMi.emi_no + 1,
            description,
            created_at: nextMonth,
            updated_at: nextMonth,
        });

        newEMi = await newEMi.save();
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
            let account = await Account.findOne({user_id: new ObjectId(req.user.user_id)})

            let notification = await Notification.createNotification({
                user_id: req.user.user_id,
                label: "Emi Received. EMi No: "+ newEMi.emi_no,
                message: `Amount: ${newEMi.amount}  EMI ID: ${newEMi._id}`
            })

            return response(res, {
                account: account,
                emi: newEMi,
                notification,
                message: "Emi received successfully"
            }, 201);
        } else {
            return next(Error("Emi received fail"), 500);
        }
    } catch (ex) {
        next(ex);
    }
};
