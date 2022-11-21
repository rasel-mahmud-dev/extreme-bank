import React, {SyntheticEvent, useState} from "react";
import HttpResponse from "../../../components/HttpResponse/HttpResponse";
import InputGroup from "../../../components/InputGroup/InputGroup";
import Button from "../../../components/Button/Button";
import {BiLock, MdMoney, MdNoAccounts} from "react-icons/all";
import validator from "../../../utils/validator";
import {api} from "../../../axios/api";

const MoneyTransfer = () => {
    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });
    
    const data = {
        account_no: {
            name: "account_no",
            placeholder: "Account No",
            onChange: handleChange,
            validate: {
                required: "accountNo Required",
                minLength: { value: 5, message: "account no  should be 5 digit" },
                maxLength: { value: 5, message: "account no  should be 5 digit" }
            },
            labelIcon: <MdNoAccounts className="text-dark-400 text-lg"/>,
        },
        
        amount: {
            name: "amount",
            type: "number",
            placeholder: "Enter Amount",
            onChange: handleChange,
            validate: {
                required: "amount required",
                min: {value: 10, message: "Amount must be 10 or greater"},
                max:  {value: 10000, message: "Amount can max 10000 or lower"},
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
    
    const [userInput, setUserInput] = useState({account_no:"", amount: "", password: ""});
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
        api.post("/api/v1/account/send-money", {
            // ...userInput
            account_no: Number(userInput.account_no),
            amount: Number(userInput.amount),
            password: userInput.password
        })
        .then((r) => {
            console.log(r)
            // setHttpResponse((p) => ({...p, loading: false}));
        })
        .catch((msg) => {
            // setHttpResponse({loading: false, isSuccess: false, message: msg});
        }).finally(()=>{
            setHttpResponse({loading: false, isSuccess: false, message: ""});
        })
        
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
    
              <div className="flex items-center gap-x-2">
              
                <input type="checkbox" id="accept-terms"  className="checkbox checkbox-sm" />
                  <label htmlFor="accept-terms" className="text-sm my-4 font-medium text-dark-300">
                  I accept the Transfer Terms of Service
                </label>
              </div>

            <Button className="btn-primary mt-4">Send Money</Button>
          </form>
        </div>
      </div>
    </div>
    );
};

export default MoneyTransfer;