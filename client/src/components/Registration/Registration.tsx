import { ReactElement, SyntheticEvent, useEffect, useState } from "react";

import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";
import { FiLock, FiMail, FiUser } from "react-icons/all";
import { Link } from "react-router-dom";
import ImagePicker from "../ImagePicker/ImagePicker";
import { api } from "../../axios/api";
import ResponseModal from "../ActionModal/ResponseModal";
import * as React from "react";
import catchErrorMessage from "../../utils/catchErrorMessage";

interface Field {
    label?: string;
    name: string;
    type?: any;
    placeholder: string;
    imagePreviewClass?: string;
    onChange: Function;
    validate?: object;
    labelIcon?: ReactElement;
}

const Registration = () => {
    const [infoData, setInfoData] = useState({
        country: null,
        divisions: null,
    });

    const data = {
        firstName: {
            name: "firstName",
            placeholder: "Enter firstName",
            onChange: handleChange,
            validate: {
                required: "firstName Required",
            },
            labelIcon: <FiUser className="text-dark-400 text-lg" />,
        },
        lastName: {
            name: "lastName",
            placeholder: "Enter lastName",
            onChange: handleChange,
            labelIcon: <FiUser className="text-dark-400 text-lg" />,
        },

        email: {
            name: "email",
            placeholder: "Enter email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        },

        // country: {
        //     name: "country",
        //     type: "select",
        //     placeholder: "Choose Country",
        //     onChange: handleChange,
        //     validate: {
        //         required: "Email Required",
        //     },
        //     dataKey: { title: "name", id: "_id" },
        //     onClick: handleLoadCountry,
        //     options: infoData.country,
        //     labelIcon: <FiMail className="text-dark-400 text-lg" />,
        // },
        // division: {
        //     name: "division",
        //     type: "select",
        //     placeholder: "Choose division",
        //     onChange: handleChange,
        //     validate: {
        //         required: "division Required",
        //     },
        //     dataKey: { title: "name", id: "id" },
        //     onClick: handleLoadDivision,
        //     options: infoData.divisions,
        //     labelIcon: <FiMail className="text-dark-400 text-lg" />,
        // },

        password: {
            name: "password",
            type: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: { value: 6, message: "Password should be min 6 character" },
            },
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
        avatar: {
            imagePreviewClass: "w-32",
            name: "avatar",
            placeholder: "Choose avatar",
            onChange: handleChange,
            validate: {
                required: "Avatar required",
                maxFileSize: { value: 200, message: "Avatar image size should be max 200kb" },
            },
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
    };

    function handleLoadCountry() {
        if (!infoData.country) {
            fetch("/countries.json")
                .then((d) => d.json())
                .then((jsonData: any) => {
                    setInfoData((p) => ({ ...p, country: jsonData }));
                });
        }
    }

    function handleLoadDivision() {
        if (!infoData.divisions) {
            fetch("/divisions.json")
                .then((d) => d.json())
                .then((jsonData: any) => {
                    setInfoData((p) => ({ ...p, divisions: jsonData }));
                });
        }
    }

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    type DataKeys = keyof typeof data;

    const [userInput, setUserInput] = useState<{ [key in DataKeys]?: object }>({});
    const [errors, setErrors] = useState<{ [key in DataKeys]?: string }>();

    function handleChange(e: any, error: string) {
        const { name, value }: { name: DataKeys; value: any; error: string; file: any } = e.target;
        setUserInput((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: error }));
    }

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();

        setHttpResponse((p) => ({ ...p, loading: false }));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = { ...errors };
        let formData = new FormData();
        let key: DataKeys;
        for (key in data) {
            if (data[key].validate) {
                let validate = validator(data[key].validate as any, userInput[key]);
                if (validate) {
                    isCompleted = false;
                } else {
                    if (key !== "avatar") {
                        formData.append(key, userInput[key]);
                    }
                }
                tempErrors[key] = validate;
            } else {
                if (key !== "avatar") {
                    formData.append(key, userInput[key]);
                }
            }
        }

        if (!isCompleted) {
            setErrors(tempErrors);
            setHttpResponse((p) => ({ ...p, loading: false, message: "" }));
            return;
        }

        if (userInput.avatar) {
            formData.append("avatar", userInput.avatar);
        }

        setHttpResponse((p) => ({ ...p, loading: true }));

        api.post("/api/v1/auth/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((r) => {
                setHttpResponse({ ...httpResponse, loading: false, isSuccess: false });
                setTimeout(()=>{
                    setHttpResponse(p=>({ ...p, message: r.data.message}));
                }, 500)
            })
            .catch((ex) => {
                setHttpResponse({ ...httpResponse, loading: false, isSuccess: false });
                setTimeout(()=>{
                    setHttpResponse(p=>({ ...p, message: catchErrorMessage(ex) }));
                }, 500)
            });

        // setHttpResponse((p) => ({ ...p, loading: true }));
        // setErrors(tempErrors);
    }

    return (
        <div className="container">
            <div className="max-w-lg mx-auto m-3 mt-4 rounded-xl">
                <form onSubmit={handleLogin} className="card">
                    <h1 className="card-title">Registration</h1>

                    <ResponseModal
                        loadingTitle="Registration Processing"
                        {...httpResponse}
                        onClose={() => setHttpResponse((p) => ({ ...p, message: "", loading: false }))}
                    />

                    {Object.keys(data).map((key, i: number) =>
                        key === "avatar" ? (
                            <ImagePicker error={errors?.avatar} {...data[key]} />
                        ) : (
                            <InputGroup value={userInput[key]} error={errors?.[key]} {...data[key]} className="mt-4" />
                        )
                    )}

                    <h6 className="mt-5 text-dark-100 text-sm font-normal">Remember this account</h6>

                    <Button className="btn-primary mt-4 w-full">Registration</Button>

                    <div className="flex justify-center mt-5 gap-x-2 text-dark-100 text-sm font-normal">
                        <h6>Already have an account ?</h6>
                        <Link to="/login">
                            <h6>Login</h6>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
