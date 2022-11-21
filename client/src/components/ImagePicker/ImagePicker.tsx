import React, { FC, HTMLAttributes, ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import validator from "../../utils/validator.js";

interface Props extends HTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    name?: string;
    defaultValue?: string;
    className?: string;
    inputClass?: string;
    onChange: ({}, error?: string) => void;
    type?: "text" | "number";
    error?: any;
    validate: any;
    labelIcon?: ReactNode;
    options?: { name: string; value: string | number }[];
    imagePreviewClass?: string;
}

const ImagePicker: FC<Props> = ({ name, validate, labelIcon, defaultValue, error, label, imagePreviewClass, onChange, placeholder }) => {
    const [state, setState] = useState<any>({
        value: "",
        base64: "",
    });

    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setState({
            base64: "",
            value: defaultValue,
        });
    }, []);

    function handleChange(e: SyntheticEvent) {
        let file = (e.target as any).files[0];
        let error = "";
        if (validate) {
            error = validator(validate, file);
        }

        let reader = new FileReader();
        reader.onload = (evt: any) => {
            setState((p: any) => ({
                ...p,
                base64: evt.target.result,
            }));
        };
        reader.readAsDataURL(file);

        setState((p: any) => ({
            ...p,
            value: file,
        }));
        onChange({ target: { name, value: file} }, error);
    }

    function chooseImage() {
        (input.current as HTMLInputElement).click();
    }

    return (
        <div className="flex flex-col mt-6">
            {label && (
                <label className="cursor-pointer font-medium text-dark-500 " htmlFor={name}>
                    {label}
                </label>
            )}

            <div onClick={chooseImage} className="input-group">
                <div className="flex w-full items-center gap-x-2 mb-2">
                    {labelIcon}

                    <span className="bg-transparent text-dark-200 px-0">{placeholder}</span>
                </div>

                <input
                    ref={input}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    hidden={true}
                    className="input"
                    placeholder={placeholder}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                />
            </div>

            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}

            <div className={imagePreviewClass}>
                {state.base64 ? (
                    <img src={state.base64} className="w-full mt-2" alt="" />
                ) : (
                    defaultValue && <img src={defaultValue} className="w-full mt-2" alt="" />
                )}
            </div>
        </div>
    );
};

export default ImagePicker;
