import Loan from "../models/Loan";
import response from "../response";
import Account from "../models/Account";
import {ObjectId} from "mongodb";
import Emi from "../models/Emi";
import date from "../utilities/date";

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

        let newEMi = new Emi({
            user_id: req.user.user_id,
            loan_id: account.current_loan_id,
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
            return response(res, {
                account: account,
                emi: newEMi,
                message: "Emi received successfully"
            }, 201);
        } else {
            return next(Error("Emi received fail"), 500);
        }
    } catch (ex) {
        next(ex);
    }
};