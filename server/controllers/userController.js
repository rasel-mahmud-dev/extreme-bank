import User from "../models/User";

const bcryptjs = require("bcryptjs");
const formidable = require("formidable");
import { createToken, parseToken } from "../jwt";
import response from "../response";
import getCookie from "../utilities/getCookie";
import { makeHash } from "../bcrypt/bcrypt";
import {cp} from "fs/promises";
import imageUpload from "../services/imageUpload";
import {ObjectId} from "mongodb";
import Notification from "../models/Notification";
import setCookie from "../utilities/setCookie";

export const createNewUser = (req, res, next) => {
    // parse a file upload
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) return response(res, "Can't read form data", 500);

        try {
            const { email, firstName, lastName, password } = fields;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(404).json({ message: "Your are already registered" });
            }

            let newPath  = files.avatar.filepath.replace(files.avatar.newFilename, files.avatar.originalFilename)
            await cp(files.avatar.filepath, newPath)

            let avatarUrl = "";

            try{
                let uploadInfo = await imageUpload(newPath, "extreme-bank")
                if(uploadInfo){
                    avatarUrl = uploadInfo.secure_url
                }
            } catch (ex){

            }


            let hash = makeHash(password);

            user = new User({
                first_name: firstName,
                last_name: lastName,
                username: firstName + " " + lastName,
                roles: ["CUSTOMER"],
                email: email,
                password: hash,
                avatar: avatarUrl,
            });

            user = await user.save();
            if (!user) {
                return res.status(500).json({ message: "Registration fail. please try again" });
            }

            let token = await createToken(user._id, user.email, user.roles);
            let { password: s, ...other } = user;

            // send cookie in header to set client browser
            setCookie(res, token)

            Notification.createNotification({user_id:user._id, label: "Welcome Mr. "+user.username}).then().catch()

            res.status(201).json({ ...other });

        } catch (ex) {
            if (ex.type === "VALIDATION_ERROR") {
                response(res, 422, ex.errors);
            } else if (ex.type === "ER_DUP_ENTRY") {
                response(res, 409, "user already exists");
            } else {
                next(ex);
            }
        }
    });
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Your are not registered" });
        }

        let match = await bcryptjs.compare(password, user.password);
        if (!match) return res.status(409).json({ message: "Password not match" });

        let token = await createToken(user._id, user.email, user.roles);
        let { password: s, ...other } = user;

        // send cookie in header to set client browser

        setCookie(res, token)


        Notification.createNotification({user_id:user._id, label: "Login completed"}).then().catch()


        res.status(201).json({ ...other });
    } catch (ex) {
        next(ex);
    }
};

export const loginViaToken = async (req, res, next) => {
    try {
        let token = getCookie("token", req);
        if (!token) return response(res, "token not found", 404);
        let { user_id, email, roles } = await parseToken(token);
        let user = await User.findOne({ _id: new ObjectId(user_id) });
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
