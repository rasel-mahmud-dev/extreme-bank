// import dbConnect from "../database/dbConnect"

import User from "../models/User";
// import {createToken, parseToken} from "../jwt";
const bcryptjs = require("bcryptjs");

// import response from "../response";

// import SQL_Date from "../utilities/SQL_Date";
import errorConsole from "../logger/errorConsole";
import { createToken, parseToken } from "../jwt";
import response from "../response";
import getCookie from "../utilities/getCookie";

// export const getPeoples = async (req, res)=>{
//   try {
//
//     let users = await User.find(`SELECT u.avatar, u.username FROM users u`)
//     res.send(users)
//
//   } catch (ex){
//     errorConsole(ex)
//   }
// }

// export const createNewUser = async (req, res, next)=>{
//   try {
//     let date = SQL_Date()
//     let {first_name, last_name, email, password } = req.body
//     let user = await User.findOne({email})
//     if(user) return res.send("user already registered")
//
//     let salt = await bcryptjs.genSalt(10);
//     let hashedPass = await bcryptjs.hash(password, salt)
//     user = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedPass,
//       avatar: "",
//       username: first_name + " " + last_name,
//       created_at: date,
//       updated_at: date
//     })
//     user = await user.save()
//     if(user){
//       let token = await createToken(user.id, user.email)
//       res.json({
//         token: token,
//         ...user
//       })
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//     if(ex.type === "VALIDATION_ERROR"){
//       response(res, 422, ex.errors)
//     } else if(ex.type === "ER_DUP_ENTRY"){
//       response(res, 409, "user already exists")
//     } else {
//       next(ex)
//     }
//   }
// }

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Your are not registered" });
        }

        let match = await bcryptjs.compare(password, user.password);
        if (!match) return res.json({ message: "Password not match" });

        let token = await createToken(user.id, user.email, user.roles);
        let { password: s, ...other } = user;

        // send cookie in header to set client browser
        res.cookie("token", token, {
            domain: process.env.CLIENT,
            path: "/",
            secure: true,
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });
        res.status(201).json({ ...other });
    } catch (ex) {
        next(ex);
    }
};

export const loginViaToken = async (req, res, next) => {
    try {
        let token = getCookie("token", req);
        if (!token) return response(res, "token not found", 404);
        let { id, email, roles } = await parseToken(token);
        let user = await User.findOne({ id });
        let { password, ...other } = user;
        response(res, other, 200);
    } catch (ex) {
        next(ex);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie("token", "", {
            domain: process.env.CLIENT,
            path: "/",
            secure: true,
            expires: 0,
            httpOnly: true,
        });
        response(res, "You are logout", 200);
    } catch (ex) {
        next(ex);
    }
};
