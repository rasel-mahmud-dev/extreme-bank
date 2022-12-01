import { ReactElement, SyntheticEvent, useState } from "react";
import validator from "../../utils/validator";
import { FiLock, FiMail, FiUser } from "react-icons/all";
import { Link } from "react-router-dom";

import axios from "axios";
import {api} from "../../axios/api";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";

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


const CreateBankAccount = () => {



    const data: { [key: string]: Field } = {
        firstName: {
            label: "firstName",
            name: "firstName",
            placeholder: "Enter firstName",
            onChange: handleChange,
            validate: {
                required: "firstName Required",
            },
            labelIcon: <FiUser className="text-dark-400 text-lg" />,
        },
        lastName: {
            label: "LastName",
            name: "lastName",
            placeholder: "Enter lastName",
            onChange: handleChange,
            labelIcon: <FiUser className="text-dark-400 text-lg" />,
        },
        email: {
            label: "Email",
            name: "email",
            placeholder: "Enter email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        }
    };


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

        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = { ...errors };
        let formData = new FormData()
        let key: DataKeys;
        for (key in data) {
            if (data[key].validate) {
                let validate = validator(data[key].validate as any, userInput[key]);
                if (validate) {
                    isCompleted = false;
                } else {
                    if(key !== "avatar") {
                        formData.append(key, userInput[key])
                    }
                }
                tempErrors[key] = validate;
            } else {
                if(key !== "avatar") {
                    formData.append(key, userInput[key])
                }
            }
        }


        if (!isCompleted) {
            setErrors(tempErrors);
            setHttpResponse((p) => ({ ...p, loading: false, message: "" }));
            return;
        }

        if(userInput.avatar) {
            formData.append("avatar", userInput.avatar)
        }

        api.post("/api/v1/auth/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(r => {
                console.log(r)
            }).catch(ex=>{
            console.log(ex)
        })

        // setHttpResponse((p) => ({ ...p, loading: true }));
        // setErrors(tempErrors);
    }

    return (
        <div className="container">
            <div className="mt-4 rounded-xl">
                <form onSubmit={handleLogin} className="card">
                    <h1 className="card-title">Create a Bank Account</h1>
                    {Object.keys(data).map((key, i: number) =>
                        <InputGroup error={errors?.[key]} {...data[key]} className="mt-4" />
                    )}
                    <Button className="btn-primary mt-4 w-full">Create Account</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateBankAccount;
