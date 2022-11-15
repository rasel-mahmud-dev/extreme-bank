import {useState} from "react";
import "./login.scss";
import InputGroup from "../InputGroup/InputGroup";
import Button from "../Button/Button";
import validator from "../../utils/validator";

const Login = () => {
  const data = {
    email: {
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      onChange: handleChange,
      validate: {
        required: "Email Required",
      },
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
  
  function handleLogin(e: SubmitEvent) {
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
      <div className=" page-bg h-screen p-4">
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-3xl text-white font-semibold">Login</h1>
        {Object.keys(data).map((key, i) => (
            <InputGroup error={errors[key]} {...data[key]} className="mt-4"/>
        ))}
        <Button className="mt-4 !bg-white/90 w-full">Login</Button>
      </form>
    </div>
  );
};

// <div>
//
// 		  </div>

export default Login;
