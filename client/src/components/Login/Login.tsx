import * as React from "react";
import { SyntheticEvent, useState } from "react";
import "./login.scss";
import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";
import { FiLock, FiMail } from "react-icons/all";
import { Link } from "react-router-dom";
import useStore from "../../context/useStore";
import { handleLoginAction } from "../../context/actions/authAction";
import HttpResponse from "../HttpResponse/HttpResponse";
import ActionModal from "../ActionModal/ActionModal";
import Loader from "../Loader/Loader";
import ResponseModal from "../ActionModal/ResponseModal";

const Login = () => {
    const [state, dispatch] = useStore();

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const data = {
        email: {
            label: "Email",
            name: "email",
            placeholder: "Enter email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        },

        password: {
            label: "Password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: { value: 5, message: "Password should be min 5 character" },
            },
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
    };

    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    function handleChange(e: InputEvent, error?: string) {
        const { name, value } = e.target as HTMLInputElement;
        setErrors((prev) => ({ ...prev, [name]: error }));
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = { ...errors };
        for (let key in data) {
            if (data[key]?.validate) {
                let validate = validator(data[key]?.validate, userInput[key]);
                if (validate) {
                    isCompleted = false;
                }
                tempErrors[key] = validate;
            }
        }

        if (!isCompleted) {
            setErrors(tempErrors);
            setHttpResponse((p) => ({ ...p, loading: false, message: "" }));
            return;
        }
        setHttpResponse((p) => ({ ...p, loading: true }));
        handleLoginAction(userInput, dispatch)
            .then((r) => {
                setHttpResponse((p) => ({ ...p, loading: false }));
            })
            .catch((msg) => {
                setHttpResponse({ ...httpResponse, loading: false, isSuccess: false });
                setTimeout(()=>{
                    setHttpResponse(p=>({ ...p, message: msg }));
                }, 500)
            });
    }

    return (
        <div className="container">

            <div>

                <ResponseModal
                    loadingTitle="Login Processing" {...httpResponse}
                    onClose={()=>setHttpResponse(p=>({...p, message: "", loading: false}))}
                />


                <div className="max-w-lg mx-auto rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">Login</h1>

                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-4" />
                        ))}

                        <h6 className="mt-5 text-dark-100 text-sm font-normal">Remember this account</h6>

                        <Button className="btn-primary mt-4 w-full">Login</Button>

                        <div className="flex justify-between mt-5 text-dark-100 text-sm font-normal">
                            <Link to="/forgot-password">
                                <h6>Forgot Password</h6>
                            </Link>
                            <Link to="/registration">
                                <h6>Create Account</h6>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
