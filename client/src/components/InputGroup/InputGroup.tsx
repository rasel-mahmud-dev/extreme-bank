import "./input-group.scss";
import validator from "../../utils/validator";
import {FC, HTMLAttributes, HTMLInputTypeAttribute, ReactNode, useMemo} from "react";

interface Props extends HTMLAttributes<HTMLInputElement>{
    label?: string;
    placeholder?: string;
    name?: string;
    defaultValue?: string | number;
    className?: string;
    inputClass?: string;
    onChange: Function;
    type?: "text" | "number"
    error?: any;
    validate: any;
    labelIcon?: ReactNode;
    options?: { name: string, value: string | number }[];
}

const InputGroup: FC<Props> = (props) => {
    const {
        label,
        onChange,
        placeholder,
        name,
        inputClass,
        validate,
        type = "text",
        className,
        defaultValue,
        error,
        labelIcon,
        options = null,
    } = props;

    // const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e: any) {
        const target = e.target;
        let result = validator(validate, target.value);
        onChange(e, result);
    }

    return useMemo(() => {
        return (
            <div>
                <div className={`input-group ${className}`}>
                    {/*<label htmlFor={name}>{label}</label>*/}

                    <div className="flex w-full items-center gap-x-2">
                        {labelIcon}
                        {options ? (
                            <select onChange={handleChange} name={name} id={name} className={`input ${inputClass} `} placeholder={placeholder}>
                                <option value="">{placeholder}</option>
                                {options?.map((opt) => (
                                    <option value={opt.value}>{opt.name}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                onChange={handleChange}
                                type={type}
                                name={name}
                                id={name}
                                className={`input ${inputClass} `}
                                placeholder={placeholder}
                            />
                        )}
                    </div>
                </div>
                <span className="text-red-500 font-medium text-xs">{error ? error : ""}</span>
            </div>
        );
    }, [error, props?.defaultValue]);
};

export default InputGroup;