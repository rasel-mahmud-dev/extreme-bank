import React, {SyntheticEvent, useEffect, useState} from "react";
import HttpResponse from "../../../components/HttpResponse/HttpResponse";
import InputGroup from "../../../components/InputGroup/InputGroup";
import Button from "../../../components/Button/Button";
import { BiLock, MdMoney, MdNoAccounts } from "react-icons/all";
import validator from "../../../utils/validator";
import { api } from "../../../axios/api";
import catchErrorMessage from "../../../utils/catchErrorMessage";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar/Avatar";
import ResponseModal from "../../../components/ActionModal/ResponseModal";

const MoneyTransfer = () => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const [otherPeoples, setOtherPeoples] = useState([])

    useEffect(()=>{
        api.get("/api/v1/account/peoples").then(({data, status})=>{
            if(status === 200) {
                setOtherPeoples(data)
            }
        })
    }, [])

    const data = {
        account_no: {
            name: "account_no",
            placeholder: "Account No",
            onChange: handleChange,
            validate: {
                required: "accountNo Required",
                number: "Account number must be a number",
                length: { value: 16, message: "account no should be 16 digit" },
            },
            labelIcon: <MdNoAccounts className="text-dark-400 text-lg" />,
        },

        amount: {
            name: "amount",
            type: "number",
            placeholder: "Enter Amount",
            onChange: handleChange,
            validate: {
                required: "amount required",
                min: { value: 10, message: "Amount must be 10 or greater" },
                max: { value: 10000, message: "Amount can max 10000 or lower" },
            },
            labelIcon: <MdMoney className="text-dark-400 text-lg" />,
        },
        password: {
            name: "password",
            type: "password",
            placeholder: "Enter Your Password",
            onChange: handleChange,
            validate: {
                required: "password required",
                minLength: { value: 5, message: "Password must be 5 or greater" },
            },
            labelIcon: <BiLock className="text-dark-400 text-lg" />,
        },
        description: {
            name: "description",
            type: "textarea",
            placeholder: "Description",
            onChange: handleChange,
            validate: {
                required: "Description required",
                minLength: { value: 10, message: "Description must be 10 or greater" },
            },
            labelIcon: <BiLock className="text-dark-400 text-lg" />,
        },
    };

    type DataKey = keyof typeof data;

    const [userInput, setUserInput] = useState<{ [key in DataKey]?: string }>({});
    const [errors, setErrors] = useState({});

    function handleChange(e: InputEvent, error?: string) {
        const { name, value } = e.target as HTMLInputElement;
        setErrors((prev) => ({ ...prev, [name]: error }));
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setHttpResponse((p) => ({...p, loading: false, message: ""}));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = {...errors};
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
            // setHttpResponse((p) => ({...p, loading: false, message: ""}));
            return;
        }
        setHttpResponse((p) => ({...p, loading: true}));
        api.post("/api/v1/account/money-transfer", {
            // ...userInput
            account_no: Number(userInput.account_no),
            amount: Number(userInput.amount),
            password: userInput.password,
            description: userInput.description,
            payment_type: "Bank"
        })
            .then(({status, data}) => {
                if (status === 201) {
                    setHttpResponse({isSuccess: true, loading: false, message: ""});
                    setTimeout(() => {
                        setHttpResponse((p) => ({...p, loading: false, message: data.message}));
                    }, 300);
                }
            })
            .catch((msg) => {
                setHttpResponse({isSuccess: true, loading: false, message: ""});
                setTimeout(() => {
                    setHttpResponse({loading: false, isSuccess: false, message: catchErrorMessage(msg)});
                }, 300);
            })
    }

    return (
        <div>
            <div>
                <h1 className="heading-title !text-start mt-3 mb-4">Money Transfer</h1>



                <div className="card mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <ResponseModal
                            loadingTitle="Money Transfer Processing"
                            {...httpResponse}
                            onClose={() => setHttpResponse((p) => ({ ...p, message: "", loading: false }))}
                        />

                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-4" />
                        ))}

                        <div className="flex items-center gap-x-2">
                            <input type="checkbox" id="accept-terms" className="checkbox checkbox-sm" />
                            <label htmlFor="accept-terms" className="text-sm my-4 font-medium text-dark-300">
                                I accept the Transfer Terms of Service
                            </label>
                        </div>

                        <Button className="btn-primary mt-4">Send Money</Button>
                    </form>
                </div>

                <div>
                    <div className="mt-10 ">
                        <div className="flex justify-between items-center">
                            <h3 className="heading-subtitle !text-start">Transfer with Other Peoples</h3>
                        </div>

                        <div className="card p-3 mt-3 flex gap-6">
                            {otherPeoples.map(people=>(
                                <div className="flex flex-col justify-center items-center cursor-pointer">
                                    <Avatar imgClass="w-14 h-14" src={people.avatar} username={people.username} />
                                    <h4 className="card-label mt-2">{people.username}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoneyTransfer;
