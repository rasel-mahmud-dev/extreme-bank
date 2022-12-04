import React from "react";
import { BsFacebook, BsGoogle } from "react-icons/all";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "context/useStore";
import Button from "../Button/Button";
import {  } from "../../context/actions/authAction";
import {backend} from "../../axios/api";
import queryString from  "queryString"

const SocialLogin = () => {
    const [state] = useStore();

    const location = useLocation();
    const navigate = useNavigate();

    async function handleSocialLogin() {
        // try {
        //     let user = await googleSignInAction();
        //     if (user) {
        //         // onCreateLoginSession && onCreateLoginSession()
        //     } else {
        //         // toast.error("Google Login fail");
        //     }
        // } catch (ex) {
        //     // toast.error(catchErrorMessage(ex));
        // }
    }

    let google_client_id = "486215107263-v8lmu33ccc6or3sn06b54kpp51grn8ng.apps.googleusercontent.com"
    let redirectUrl = "http://localhost:1000/api/v1/auth/google/callback"

    const queryParams = queryString.stringify({
        client_id: google_client_id,
        scope: "email",
        redirect_uri: redirectUrl,
        auth_type: "rerequest",
        display: "popup",
        response_type: "code"
    });
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;


    return (
        <div className="mt-10 flex flex-col gap-4">

            <a href={url}>
                LOGIN WITH GOOGLE
            </a>

            <a href={backend + "/api/v1/auth/google/login"}>
                <Button type="button" className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
                    <BsGoogle className="text-sm" />
                    <span>Login With Google</span>
                </Button>
            </a>

            <Button type="button" onClick={handleSocialLogin} className="!bg-blue-600 flex gap-x-1 items-center w-full justify-center">
                <BsFacebook className="text-sm" />
                <span>Login With Facebook</span>
            </Button>
        </div>
    );
};

export default SocialLogin;
