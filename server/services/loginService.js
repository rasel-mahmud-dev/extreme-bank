import User from "../models/User";
import bcryptjs from "bcryptjs";
import {createToken} from "../jwt";

import Notification from "../models/Notification";

function loginService(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({email});

            if (!user) {
                let error = new Error("Your are not registered")
                error.status = 404
                reject(error)
            }

            let match = await bcryptjs.compare(password, user.password);
            if (!match) {
                let error = new Error("Password not match")
                error.status = 409
                reject(error)
            }

            let token = await createToken(user._id, user.email, user.roles);
            let {password: s, ...other} = user;

            Notification.createNotification({
                user_id: user._id,
                label: "Login completed"
            }).then().catch()

            resolve({
                userData: other,
                token: token
            })

        } catch (ex) {
            reject(ex)
        }
    })
}

export default loginService