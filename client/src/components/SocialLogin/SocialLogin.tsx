import React from "react";
import { BsFacebook, BsGoogle } from "react-icons/all";
import Button from "../Button/Button";

import {backend} from "../../axios/api";

const SocialLogin = () => {
    return (
        <div className="mt-10 flex flex-col gap-4">

            <a href={backend + "/api/v1/auth/google/login"}>
                <Button type="button" className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
                    <BsGoogle className="text-sm" />
                    <span>Login With Google</span>
                </Button>
            </a>

            <Button type="button" className="!bg-blue-600 flex gap-x-1 items-center w-full justify-center">
                <BsFacebook className="text-sm" />
                <span>Login With Facebook</span>
            </Button>
        </div>
    );
};

export default SocialLogin;
