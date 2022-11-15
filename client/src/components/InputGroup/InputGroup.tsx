import "./input-group.scss";
import validator from "../../utils/validator";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";

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
  labelIcon?: ReactNode;
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
    labelIcon,
  } = props;

  // const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: any) {
    const target = e.target;
    let result = validator(validate, target.value);
    onChange(e, result);
  }

  // useEffect(() => {
  //   if (error) {
  //     setErrorMessage(error);
  //   }
  // }, [error]);

  return useMemo(() => {
    return (
      <div>
        <div className={`input-group ${className}`}>
          {/*<label htmlFor={name}>{label}</label>*/}

          <div className="flex items-center gap-x-2">
            {labelIcon}

            <input
              onChange={handleChange}
              type="text"
              name={name}
              id={name}
              className={`input ${inputClass} `}
              placeholder={placeholder}
            />
          </div>
        </div>
        <span className="text-red-500 font-medium text-xs">
          {error ? error : ""}
        </span>
      </div>
    );
  }, [error, props?.defaultValue]);
};

export default InputGroup;