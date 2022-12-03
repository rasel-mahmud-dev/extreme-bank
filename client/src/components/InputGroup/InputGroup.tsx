import "./input-group.scss";
import validator from "../../utils/validator";
import { FC, HTMLAttributes, HTMLInputTypeAttribute, ReactNode, useMemo } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    name?: string;
    defaultValue?: string | number;
    className?: string;
    inputClass?: string;
    onChange?: Function;
    onClick?: any;
    type?: "text" | "number" | "textarea" | "select";
    error?: any;
    validate?: any;
    labelIcon?: ReactNode;
    value?: string;
    options?: { name: string; value: string | number }[];
    dataKey?: { title: string; id: string };
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
        dataKey,
        error,
        value,
        labelIcon,
        options = null,
        onClick,
    } = props;

    // const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e: any) {
        const target = e.target;
        let result = "";
        if (validate) {
            result = validator(validate, target.value);
        }
        onChange && onChange(e, result);
    }

    return useMemo(() => {
        return (
            <div>
                <div className={`input-group ${className}`}>
                    {/*<label htmlFor={name}>{label}</label>*/}

                    <div className="flex w-full items-center gap-x-2">
                        {labelIcon}
                        {type === "select" ? (
                            <select
                                onClick={onClick}
                                onChange={handleChange}
                                name={name}
                                id={name}
                                className={`input ${inputClass} `}
                                placeholder={placeholder}
                            >
                                <option value={value}>{placeholder}</option>
                                {options?.map((opt, index) => (
                                    <option key={index} value={opt[dataKey.id]}>{opt[dataKey.title]}</option>
                                ))}
                            </select>
                        ) : type === "textarea" ? (
                            <textarea onChange={handleChange} name={name} id={name} className={`input ${inputClass} `} placeholder={placeholder} />
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
    }, [error, props?.defaultValue, options, onClick]);
};

export default InputGroup;
