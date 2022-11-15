import {Component} from "solid-js/types/server";
import "./login.scss";
import InputGroup from "../InputGroup/InputGroup";

const data = [
    { label: "Email", placeholder: "Enter email" }
]

const Login: Component = () => {
    return (
        <div class="card">
        <div class="p-4">
          <h1 class="text-center text-3xl text-white font-semibold">Login</h1>
            { data.map((item=>(
                <InputGroup label={item.label} placeholder={item.placeholder} />
            ))) }
        </div>
      </div>
    );
};

export default Login;