import User from "../models/User";
const formidable = require("formidable");

import {createToken, parseToken} from "../jwt";
import response from "../response";
import getCookie from "../utilities/getCookie";
import {makeHash} from "../bcrypt/bcrypt";
import {cp} from "fs/promises";
import imageUpload from "../services/imageUpload";
import {ObjectId} from "mongodb";
import Notification from "../models/Notification";
import setCookie from "../utilities/setCookie";
import loginService from "../services/loginService";
import createUserService from "../services/createUserService";


export const loginWithGoogle = async (req, res, next) => {
    try {

        // Successful authentication, redirect home.
        if (!req.user) {
            return
        }

        const {username, id, email, photo} = req.user

        let user = await User.findOne({email: email});

        if (!user) {
            let name = username.split(" ")
            let {acc, user: authUser} = await createUserService({
                first_name: name[0],
                last_name: name[1] ? name[1] : "",
                avatarUrl: photo,
                address: "",
                googleId: id,
                zipCode: "",
                division: "",
                country: "",
                upazila: "",
                NID: "",
                email: email,
                hash: ""
            })
            user = authUser
        }

        let token = await createToken(user._id, user.email, user.roles);
        // send cookie in header to set client browser
        setCookie(res, token)

        Notification.createNotification({
            user_id: user._id,
            label: "Welcome Mr. " + user.username
        }).then().catch()

        res.redirect(process.env.FRONTEND + "/google-callback");


    } catch (ex) {

    }
}

export const createNewUser = (req, res, next) => {
    // parse a file upload
    const form = formidable({multiples: false});

    form.parse(req, async (err, fields, files) => {
        if (err) return response(res, "Can't read form data", 500);

        try {
            const {
                firstName,
                lastName,
                email,
                password,
                country,
                upazila,
                NID,
                address,
                zipCode,
                division
            } = fields;

            let user = await User.findOne({email});
            if (user) {
                return res.status(404).json({message: "Your are already registered"});
            }

            let newPath = files.avatar.filepath.replace(files.avatar.newFilename, files.avatar.originalFilename)
            await cp(files.avatar.filepath, newPath)

            let avatarUrl = "";

            try {
                let uploadInfo = await imageUpload(newPath, "extreme-bank")
                if (uploadInfo) {
                    avatarUrl = uploadInfo.secure_url
                }
            } catch (ex) {

            }


            let hash = makeHash(password);


            let {acc, user: authUser} = await createUserService({
                first_name: firstName,
                last_name: lastName,
                avatarUrl,
                address,
                zipCode,
                division,
                country,
                upazila,
                NID,
                email,
                hash
            })

            let {password: s, ...other} = authUser;


            let token = await createToken(authUser._id, authUser.email, authUser.roles);

            // send cookie in header to set client browser
            setCookie(res, token)

            Notification.createNotification({
                user_id: user._id,
                label: "Welcome Mr. " + user.username
            }).then().catch()

            res.status(201).json({...other});

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
        const {email, password} = req.body;

        let {token, userData} = await loginService(email, password)

        // send cookie in header to set client browser
        setCookie(res, token)

        res.status(201).json({...userData});
    } catch (ex) {
        console.log(ex)
        next(ex);
    }
};

export const loginViaToken = async (req, res, next) => {
    try {
        let token = getCookie("token", req);
        if (!token) return response(res, "token not found", 404);
        let {user_id, email, roles} = await parseToken(token);
        let user = await User.findOne({_id: new ObjectId(user_id)});
        let {password, ...other} = user;

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
