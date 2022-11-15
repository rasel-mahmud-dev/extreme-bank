import "./input-group.scss";
import validator from "../../utils/validator";
import { FC, useEffect, useMemo, useState } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string | number;
  className?: string;
  inputClass?: string;
  onChange: Function;
  error?: any;
  validate: any;
}

const InputGroup: FC<Props> = (props) => {
  const {
    label,
    onChange,
    placeholder,
    name,
    inputClass,
    validate,
    className,
    defaultValue,
    error,
  } = props;

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: any) {
    const target = e.target;
    let result = validator(validate, target.value);
    setErrorMessage(result);
    onChange(e);
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);
  
  
  return useMemo(() => {
    return (
      <div className={`input-group ${className}`}>
        <label htmlFor={name}>
          {label} {Date.now()}
        </label>
        <input
          onChange={handleChange}
          type="text"
          name={name}
          id={name}
          className={`input ${inputClass} `}
          placeholder={placeholder}
        />
        <span className="text-red-500">{errorMessage ? errorMessage : ""}</span>
      </div>
    );
  }, [errorMessage, props?.defaultValue]);
};

export default InputGroup;