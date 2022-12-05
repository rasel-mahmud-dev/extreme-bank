import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import { BiHeart, BsClock, MdMoney } from "react-icons/all";
import InputGroup from "components/InputGroup/InputGroup";
import Button from "components/Button/Button";
import {api} from "../../../axios/api";
import Deposit from "./Deposit";

type Props ={
    onSuccess: (args: any)=> void
}

const AddDeposit: FC<Props> = ({onSuccess}) => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const DepositInterestRate = 5;

    const data = {
        amount: {
            name: "amount",
            placeholder: "Deposit amount",
            onChange: handleChange,
            validate: {
                required: "deposit amount required",
                number: "Should be valid Number",
                min: { value: 200, message: "Deposit amount should be 200 or higher" },
                max: { value: 50000, message: "Deposit amount should be under 50000 " },
            },
            labelIcon: <MdMoney className="text-dark-400 text-lg" />,
        },
    };

    const [userInput, setUserInput] = useState({
        amount: 0,
    });

    const [errors, setErrors] = useState({});

    function handleChange(e: InputEvent, error?: string) {
        const { name, value } = e.target as HTMLInputElement;
        setErrors((prev) => ({ ...prev, [name]: error }));
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));


        setHttpResponse((p) => ({ ...p, loading: true, message: "" }));
        api.post<{data: Deposit, status: number}>("/api/v1/account/deposit-money", {
            amount: userInput.amount,
        })
            .then(({status, data}) => {
                onSuccess(data)
                // setHttpResponse((p) => ({...p, loading: false}));
            })
            .catch((msg) => {
                onSuccess(null)
                // setHttpResponse({loading: false, isSuccess: false, message: msg});
            });
    }

    return (
        <div>
            <div className="">
                <h1 className="heading-title !text-start">Add Deposit</h1>

                <form onSubmit={handleLogin}>
                    {Object.keys(data).map((key, i) => (
                        <InputGroup error={errors[key]} {...data[key]} className="mt-2" />
                    ))}

                    <div className="flex my-4 justify-between items-start">
                        <h6 className="text-sm  font-medium text-dark-300 flex items-center gap-x-2">
                            <input type="checkbox" />I accept the Transfer Terms of Service
                        </h6>
                    </div>

                    <Button className="btn-primary mt-4">Add</Button>
                </form>
            </div>
        </div>
    );
};

export default AddDeposit;
