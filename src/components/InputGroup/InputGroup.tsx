import {Component} from "solid-js/types/server";
import "./input-group.scss"

interface Props{
    label?: string,
    placeholder?: string
}

const InputGroup:Component<Props> = ({label, placeholder}) => {
    return (
      <div class="input-group">
        <label htmlFor="">{label}</label>
        <input type="text" class="input" placeholder={placeholder} />
      </div>
    );
};

export default InputGroup;