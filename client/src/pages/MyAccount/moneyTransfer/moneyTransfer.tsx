import React, {SyntheticEvent, useState} from "react";
import HttpResponse from "../../../components/HttpResponse/HttpResponse";
import InputGroup from "../../../components/InputGroup/InputGroup";
import Button from "../../../components/Button/Button";
import {Link} from "react-router-dom";
import {BiLock, BiMoney, FiLock, FiMail, MdMoney, MdNoAccounts} from "react-icons/all";
import validator from "../../../utils/validator";

const MoneyTransfer = () => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    
    const data = {
        accountNo: {
            name: "accountNo",
            placeholder: "Account No",
            onChange: handleChange,
            validate: {
                required: "accountNo Required",
            },
            labelIcon: <MdNoAccounts className="text-dark-400 text-lg"/>,
        },
    
        amount: {
            name: "amount",
            placeholder: "Enter Amount",
            onChange: handleChange,
            validate: {
                required: "amount required",
            },
            labelIcon: <MdMoney className="text-dark-400 text-lg"/>,
        },
        password: {
            name: "password",
            placeholder: "Enter Your Password",
            onChange: handleChange,
            validate: {
                required: "password required",
            },
            labelIcon: <BiLock className="text-dark-400 text-lg"/>,
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
        <h1 className="heading-title !text-start mt-4 mb-8">Money Transfer</h1>
        <div className="rounded p-4 bg-white mt-4 rounded-xl">
          <form onSubmit={handleLogin}>
            <HttpResponse state={httpResponse}/>
              {Object.keys(data).map((key, i) => (
                  <InputGroup error={errors[key]} {...data[key]} className="mt-4"/>
              ))}
    
              
              <h6 className="text-sm my-4 font-medium text-dark-300">
                  I accept the Transfer Terms of Service
              </h6>
              
            <Button className="btn-primary mt-4">Send Money</Button>

           
          </form>
        </div>
      </div>
    </div>
    );
};

export default MoneyTransfer;