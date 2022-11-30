import { ReactElement, SyntheticEvent, useState } from "react";

import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";
import { FiLock, FiMail, FiUser } from "react-icons/all";
import { Link } from "react-router-dom";
import ImagePicker from "../ImagePicker/ImagePicker";

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
        },

        password: {
            label: "Password",
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
            label: "",
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

        let key: DataKeys;
        for (key in data) {
            if (data[key].validate) {
                let validate = validator(data[key].validate as any, userInput[key]);
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

        // setHttpResponse((p) => ({ ...p, loading: true }));
        // setErrors(tempErrors);
    }

    return (
        <div className="max-w-lg mx-auto card m-3 mt-4 rounded-xl">
            <form onSubmit={handleLogin}>
                <h1 className="text-center text-3xl text-dark-900 font-semibold">Registration</h1>
                {Object.keys(data).map((key, i: number) =>
                    key === "avatar" ? (
                        <ImagePicker error={errors?.avatar} {...data[key]} />
                    ) : (
                        <InputGroup error={errors?.[key]} {...data[key]} className="mt-4" />
                    )
                )}

                <h6 className="mt-5 text-dark-100 text-sm font-normal">Remember this account</h6>

                <Button className="btn-primary mt-4 w-full">Registration</Button>

                <div className="flex justify-between mt-5 text-dark-100 text-sm font-normal">
                    <h6>Forgot Password</h6>
                    <Link to="/login">
                        <h6>Create Account</h6>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;
