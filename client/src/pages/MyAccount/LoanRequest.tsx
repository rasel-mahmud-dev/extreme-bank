import React, {SyntheticEvent, useState} from "react";
import {BiLock, BiMoney, BsClock, CgClose, FiLock, FiMail, MdMoney, MdNoAccounts} from "react-icons/all";
import validator from "../../utils/validator";
import InputGroup from "../../components/InputGroup/InputGroup";
import HttpResponse from "../../components/HttpResponse/HttpResponse";
import Button from "../../components/Button/Button";


const LoanRequest = () => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    
    const data = {
        
        amount: {
            name: "amount",
            placeholder: "AMOUNT OF MONEY ($)",
            onChange: handleChange,
            validate: {
                required: "amount required",
                min: {value: 200, message: "min 200"}
            },
            labelIcon: <MdMoney className="text-dark-400 text-lg"/>,
        },
    
        loanPurpose: {
            name: "loanPurpose",
            placeholder: "Purpose of Loan",
            onChange: handleChange,
            validate: {
                required: "loanPurpose required",
            },
            options: [
                { name: "Business", value: "business" },
                { name: "Education", value: "education" },
                { name: "Other", value: "other" },
            ],
            labelIcon: <BsClock className="text-dark-400 text-lg"/>,
        },
        loadDuration: {
            name: "loadDuration",
            placeholder: "Loan Duration",
            onChange: handleChange,
            validate: {
                required: "loadDuration required",
            },
            options: [
                { name: "1 Year", value: 1 },
                { name: "2 Year", value: 2 },
                { name: "3 Year", value: 3 },
            ],
            labelIcon: <BsClock className="text-dark-400 text-lg"/>,
        },
        
    };
    
    const [userInput, setUserInput] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});
    
    function handleChange(e: InputEvent, error?: string) {
        const {name, value} = e.target as HTMLInputElement;
        setErrors((prev) => ({...prev, [name]: error}));
        setUserInput((prev) => ({...prev, [name]: value}));
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
        // handleLoginAction(userInput, dispatch)
        // .then((r) => {
        //     setHttpResponse((p) => ({...p, loading: false}));
        // })
        // .catch((msg) => {
        //     setHttpResponse({loading: false, isSuccess: false, message: msg});
        // });
    }
    
    return (
        <div>
      <div>
        <h1 className="heading-title !text-start mt-4 mb-8">Loan Request</h1>
        <div className="rounded px-4 pb-4 pt-1 bg-white rounded-xl">
          <form onSubmit={handleLogin}>
            <HttpResponse state={httpResponse}/>
              {Object.keys(data).map((key, i) => (
                  <InputGroup error={errors[key]} {...data[key]} className="mt-4"/>
              ))}
    
    
              <h6 className="text-sm my-4 font-medium text-dark-300">
                  I accept the Transfer Terms of Service
              </h6>
              
            <Button className="btn-primary mt-4">Request for Load</Button>

           
          </form>
        </div>
      </div>
    </div>
    );
};

export default LoanRequest;