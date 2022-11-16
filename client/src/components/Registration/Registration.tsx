import {SyntheticEvent, useState} from "react";

import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";
import {FiLock, FiMail, FiUser} from "react-icons/all";
import {Link} from "react-router-dom";

const Registration = () => {
	const data = {
		firstName: {
			label: "firstName",
			name: "firstName",
			placeholder: "Enter firstName",
			onChange: handleChange,
			validate: {
				required: "firstName Required",
			},
			labelIcon: <FiUser className="text-dark-400 text-lg"/>,
		},
		lastName: {
			label: "Email",
			name: "lastName",
			placeholder: "Enter lastName",
			onChange: handleChange,
			labelIcon: <FiUser className="text-dark-400 text-lg"/>,
		},
		
		email: {
			label: "Email",
			name: "email",
			placeholder: "Enter email",
			onChange: handleChange,
			validate: {
				required: "Email Required",
			},
			labelIcon: <FiMail className="text-dark-400 text-lg"/>,
		},
		
		password: {
			label: "Password",
			name: "password",
			placeholder: "Enter password",
			onChange: handleChange,
			validate: {
				required: "Password required",
				minLength: {value: 6, message: "Password should be min 6 character"},
			},
			labelIcon: <FiLock className="text-dark-400 text-lg"/>,
		},
	};
	
	const [userInput, setUserInput] = useState({email: "", password: ""});
	const [errors, setErrors] = useState({});
	
	function handleChange(e: InputEvent) {
		const {name, value} = e.target as HTMLInputElement;
		let updateState = {...userInput};
		updateState[name] = value;
		setUserInput(updateState);
	}
	
	function handleLogin(e: SyntheticEvent) {
		e.preventDefault();
		
		// check validation before submit form
		let tempErrors: any = {...errors};
		for (let key in data) {
			if (data[key]?.validate) {
				let validate = validator(data[key]?.validate, userInput[key].value);
				tempErrors[key] = validate;
			}
		}
		setErrors(tempErrors);
	}
	
	return (
		<div className="max-w-lg mx-auto rounded p-4 bg-white m-3 mt-4 rounded-xl">
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-3xl text-dark-900 font-semibold">
          Registration
        </h1>
		  {Object.keys(data).map((key, i) => (
			  <InputGroup error={errors[key]} {...data[key]} className="mt-4"/>
		  ))}
	
		  <h6 className="mt-5 text-dark-100 text-sm font-normal">
          Remember this account
        </h6>

        <Button className="btn-primary mt-4 w-full">Login</Button>

        <div className="flex justify-between mt-5 text-dark-100 text-sm font-normal">
          <h6>Forgot Password</h6>
          <Link to="/login"><h6>Create Account</h6></Link>
        </div>
      </form>
    </div>
	);
};

// <div>
//
// 		  </div>

export default Registration;
