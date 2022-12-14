import React, { SyntheticEvent, useEffect, useState } from "react";
import { BiHeart,  BsClock,  MdMoney } from "react-icons/all";
import validator from "../../utils/validator";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";
import { api } from "../../axios/api";
import ResponseModal from "../../components/ActionModal/ResponseModal";
import catchErrorMessage from "../../utils/catchErrorMessage";
import {ACTION_TYPES} from "../../types";
import useStore from "../../context/useStore";
import WithSidebarButton from "../../components/WithSidebarButton/WithSidebarButton";
import {useNavigate} from "react-router-dom";

const LoanRequest = () => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    const [_, dispatch] = useStore()
    const navigate = useNavigate();

    const InterestRate = 12;

    const data = {
        amount: {
            name: "amount",
            placeholder: "AMOUNT OF MONEY ($)",
            onChange: handleChange,
            validate: {
                required: "amount required",
                number: "Should be valid Number",
                min: { value: 200, message: "min 200" },
                max: { value: 50000, message: "max amount should be under 50000 " },
            },
            labelIcon: <MdMoney className="text-dark-400 text-lg" />,
        },
        loanPurpose: {
            name: "loanPurpose",
            type: "select",
            placeholder: "Purpose of Loan",
            onChange: handleChange,
            validate: {
                required: "loanPurpose required",
            },
            dataKey: {title: "name", id: "value"},
            options: [
                { name: "Business", value: "business" },
                { name: "Education", value: "education" },
                { name: "Other", value: "other" },
            ],
            labelIcon: <BsClock className="text-dark-400 text-lg" />,
        },
        nid: {
            name: "nid",
            placeholder: "Your Govt. NID ID",
            onChange: handleChange,
            validate: {
                required: "Govt. NID ID required",
                length: { value: 16, message: "NID Id should be 16 digit" },
            },
            labelIcon: <BiHeart className="text-dark-400 text-lg" />,
        },
        loanDuration: {
            name: "loanDuration",
            placeholder: "Loan Duration",
            onChange: handleChange,
            validate: {
                required: "loanDuration required",
            },
            dataKey: {title: "name", id: "value"},
            type: "select",
            options: [
                { name: "1 Year", value: 1 },
                { name: "2 Year", value: 2 },
                { name: "3 Year", value: 3 },
            ],
            labelIcon: <BsClock className="text-dark-400 text-lg" />,
        },
    };

    const [userInput, setUserInput] = useState({
        loanPurpose: "",
        nid: "",
        amount: 0,
        loanDuration: 0,
        monthlyPay: 0,
        totalPay: 0,
    });
    const [errors, setErrors] = useState({});

    function handleChange(e: InputEvent, error?: string) {
        const { name, value } = e.target as HTMLInputElement;
        setErrors((prev) => ({ ...prev, [name]: error }));
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if (userInput.amount && userInput.loanDuration) {
            let interest = (InterestRate / 100) * Number(userInput.amount);

            let month = Number(userInput.loanDuration) * 12;
            let totalPay = Number((Number(userInput.amount) + interest).toFixed(2) || 0)

            setUserInput((prevState: any) => ({
                ...prevState,
                totalPay: totalPay,
                monthlyPay: (totalPay / month).toFixed(2),
            }));
        }
    }, [userInput.amount, userInput.loanDuration]);

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors: any = { ...errors };
        let key: any
        for (key in data) {
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
        setHttpResponse((p) => ({ ...p, loading: true, message: "" }));
        api.post("/api/v1/loans/loan-money", {
            loanPurpose: userInput.loanPurpose,
            nid: userInput.nid,
            amount: userInput.amount,
            loanDuration: userInput.loanDuration
        })
            .then((r) => {
                setHttpResponse((p) => ({...p, loading: false}));
                if(r.data.message) {
                    setTimeout(() => {
                        setHttpResponse({loading: false, message: r.data.message, isSuccess: false});
                        navigate("/my-account/loans")
                    }, 300)
                }
                dispatch({
                    type: ACTION_TYPES.SET_NOTIFICATION,
                    payload: r.data.notification,
                });
            })
            .catch((msg) => {
                setHttpResponse({loading: false, message: "", isSuccess: false});
                setTimeout(()=>{
                setHttpResponse({loading: false, message: catchErrorMessage(msg), isSuccess: false});

                }, 300)
            })

    }

    return (
        <div>
            <div className="">
                <WithSidebarButton className="mt-4 mb-8">
                    <h1 className="heading-title !text-start ">Loan Request</h1>
                </WithSidebarButton>
                <div className="card">
                    <form onSubmit={handleLogin}>

                        <ResponseModal
                            loadingTitle="Preparing Your Loan" {...httpResponse}
                            onClose={()=>setHttpResponse(p=>({...p, message: "", loading: false}))}
                        />


                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-4" />
                        ))}

                        <div className="flex my-4 justify-between items-start">
                            <h6 className="text-sm  font-medium text-dark-300 flex items-center gap-x-2">
                                <input type="checkbox" />I accept the Transfer Terms of Service
                            </h6>

                            <div className="text-sm  font-medium text-dark-300">
                                <h4 className="flex justify-between gap-x-10">
                                    Our Interest rate <span className="font-semibold">{InterestRate}%</span>
                                </h4>
                                <h4 className="flex justify-between gap-x-10">
                                    Total Pay <span className="font-semibold">${userInput.totalPay}</span>
                                </h4>
                                <h4 className="flex justify-between gap-x-10">
                                    Monthly Pay <span className="font-semibold">${userInput.monthlyPay}</span>
                                </h4>
                            </div>
                        </div>

                        <Button className="btn-primary mt-4">Request for Load</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoanRequest;
