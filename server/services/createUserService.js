import User from "../models/User";
import Account from "../models/Account";
import uuid from "../utilities/uuid";
import {ObjectId} from "mongodb";


function createUserService({
       first_name,
       last_name,
       email,
       hash,
       googleId = null,
       avatarUrl,
       country,
       upazila,
       NID,
       address,
       zipCode,
       division,
    }) {

    return new Promise(async (resolve, reject) => {
        let user = new User({
            first_name,
            last_name,
            googleId,
            username: first_name + " " + last_name,
            roles: ["CUSTOMER"],
            email: email,
            password: hash,
            avatar: avatarUrl,
            country: country,
            upazila: upazila,
            NID: NID,
            address: address,
            zipCode: zipCode,
            division: division
        });

        user = await user.save();
        if (!user) {
            let error = new Error("Registration fail. please try again")
            return reject(error)
        }

        let acc = new Account({
            account_no: uuid(16),
            user_id: new ObjectId(user._id),
            balance: 0,
            withdraw: 0,
            deposit: 0,
            current_loan_id: new ObjectId("000000000000000000000000"),
        })

        acc = await acc.save()
        if (!acc) {
            await User.deleteOne({_id: user._id})
            let error = new Error("Registration fail. please try again")
            return reject(error)
        }
        resolve({acc, user})
    })
}

export default createUserService