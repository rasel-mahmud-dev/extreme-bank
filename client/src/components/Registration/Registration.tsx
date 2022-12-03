import { ReactElement, SyntheticEvent, useEffect, useState } from "react";

import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";
import { BiFlag, FiLock, FiMail, FiUser, GoLocation, SiCounterstrike } from "react-icons/all";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImagePicker from "../ImagePicker/ImagePicker";

import ResponseModal from "../ActionModal/ResponseModal";
import * as React from "react";
import { handleRegistrationAction } from "../../context/actions/authAction";
import useStore from "context/useStore";

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
    const [{}, dispatch] = useStore();

    const location = useLocation();
    const navigate = useNavigate();

    const [infoData, setInfoData] = useState({
        country: null,
        divisions: null,
        upazilas: null,
    });

    const validateField = {
        firstName: {
            required: "firstName Required",
        },
        email: {
            required: "Email Required",
        },
        password: {
            required: "Password required",
            minLength: { value: 6, message: "Password should be min 6 character" },
        },
        avatar: {
            required: "Avatar required",
            maxFileSize: { value: 200, message: "Avatar image size should be max 200kb" },
        },
        country: {
            required: "country required",
        },
        division: {
            required: "division required",
        },
        upazila: {
            required: "upazila required",
        },
        NID: {
            required: "NID required",
        },
        lastName: {},
        address: {
            required: "address required",
        },
        zipCode: {
            required: "zipCode required",
            length: { value: 4, message: "Zip code must be 4 digit"}
        }
    };

    const data = {
        firstName: {
            name: "firstName",
            placeholder: "Enter firstName",
            onChange: handleChange,
            validate: validateField.firstName,
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
            validate: validateField.email,
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        },
        password: {
            name: "password",
            type: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: validateField.password,
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
        avatar: {
            imagePreviewClass: "w-32",
            name: "avatar",
            placeholder: "Choose avatar",
            onChange: handleChange,
            validate: validateField.avatar,
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
    };

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    type DataKeys = keyof typeof validateField

    const [userInput, setUserInput] = useState<{ [key in DataKeys]?: object }>({});
    const [errors, setErrors] = useState<{ [key in DataKeys]?: string }>();

    function handleChange(e: any, error: string) {
        const { name, value }: { name: DataKeys; value: any; error: string; file: any } = e.target;
        setUserInput((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: error }));
    }

    function handleRegistration(e: SyntheticEvent) {
        e.preventDefault();

        setHttpResponse((p) => ({ ...p, loading: false }));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = { ...errors };
        let formData = new FormData();
        let key: DataKeys;

        for (key in validateField) {
            let validate = validator(validateField[key] as any, userInput[key]);
            if (validate) {
                isCompleted = false;
            } else {
                formData.append(key, userInput[key]);
            }
            tempErrors[key] = validate;
        }

        if (!isCompleted) {
            setErrors(tempErrors);
            setHttpResponse((p) => ({ ...p, loading: false, message: "" }));
            return;
        }
        
        let division = infoData?.divisions?.find((div: any)=>div.id === userInput.division)
        if(division){
            formData.delete("division")
            formData.append("division", division.name)
        }

        if (userInput.avatar) {
            formData.append("avatar", userInput.avatar);
        }

        setHttpResponse((p) => ({ ...p, loading: true }));

        handleRegistrationAction(formData, dispatch)
            .then((r) => {
                setHttpResponse({ ...httpResponse, loading: false, isSuccess: false });
                setTimeout(() => {
                    setHttpResponse((p) => ({ ...p, message: "Registration completed." }));
                    navigate(location.state?.from || "/");
                }, 200);
            })
            .catch((ex) => {
                setHttpResponse({ ...httpResponse, loading: false, isSuccess: false });
                setTimeout(() => {
                    setHttpResponse((p) => ({ ...p, message: ex }));
                }, 200);
            });

        // setHttpResponse((p) => ({ ...p, loading: true }));
        // setErrors(tempErrors);
    }

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
        if (userInput.country) {
            if (userInput.country === "Bangladesh") {
                if (!infoData.divisions) {
                    fetch("/divisions.json")
                        .then((d) => d.json())
                        .then((jsonData: any) => {
                            setInfoData((p) => ({ ...p, divisions: jsonData }));
                        });
                }
            } else {
                setInfoData((p) => ({ ...p, divisions: null }));
            }
        }
    }

    function handleLoadUpazilas() {
        if (userInput.division) {
            fetch("/upazilas.json")
                .then((d) => d.json())
                .then((jsonData: any) => {
                    let upzila = jsonData.filter((data) => data.district_id === userInput.division);
                    setInfoData((p) => ({ ...p, upazilas: upzila }));
                });
        }
    }

    return (
        <div className="container">
            <div className="max-w-3xl mx-auto m-3 mt-4 rounded-xl">
                <h1 className="card-title">Registration</h1>

                <ResponseModal
                    loadingTitle="Registration Processing"
                    {...httpResponse}
                    onClose={() => setHttpResponse((p) => ({ ...p, message: "", loading: false }))}
                />

                <form onSubmit={handleRegistration}>
                    <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="card">
                            {Object.keys(data).map((key, i: number) => (
                                <div key={key}>
                                    {key === "avatar" ? (
                                        <ImagePicker error={errors?.avatar} {...data[key]} />
                                    ) : (
                                        <InputGroup value={userInput[key]} error={errors?.[key]} {...data[key]} className="mt-4" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <InputGroup
                                name="NID"
                                placeholder="Enter NID"
                                error={errors?.["NID"]}
                                onChange={handleChange}
                                validate={validateField.NID}
                                labelIcon={<GoLocation className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />

                            <InputGroup
                                name="country"
                                type="select"
                                onClick={handleLoadCountry}
                                options={infoData.country}
                                dataKey={{ title: "name", id: "name" }}
                                placeholder="Select country Name"
                                error={errors?.["country"]}
                                onChange={handleChange}
                                validate={validateField.country}
                                labelIcon={<BiFlag className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />

                            <InputGroup
                                name="division"
                                type="select"
                                onClick={handleLoadDivision}
                                options={infoData.divisions}
                                dataKey={{ title: "name", id: "id" }}
                                placeholder="Select division"
                                error={errors?.["division"]}
                                onChange={handleChange}
                                validate={validateField.division}
                                labelIcon={<FiMail className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />

                            <InputGroup
                                name="upazila"
                                type="select"
                                onClick={handleLoadUpazilas}
                                options={infoData.upazilas}
                                dataKey={{ title: "name", id: "name" }}
                                placeholder="Select upazila"
                                error={errors?.["upazila"]}
                                onChange={handleChange}
                                validate={validateField.upazila}
                                labelIcon={<FiMail className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />

                            <InputGroup
                                name="address"
                                placeholder="Enter Address"
                                error={errors?.["address"]}
                                onChange={handleChange}
                                validate={validateField.address}
                                labelIcon={<GoLocation className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />


                            <InputGroup
                                name="zipCode"
                                placeholder="Zip code"
                                error={errors?.["zipCode"]}
                                onChange={handleChange}
                                validate={validateField.zipCode}
                                labelIcon={<GoLocation className="text-dark-400 text-lg" />}
                                className="mt-4"
                            />



                        </div>
                    </div>

                    <Button className="btn-primary mt-4 flex justify-center mx-auto">Registration</Button>

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
