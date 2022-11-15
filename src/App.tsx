import type {Component} from "solid-js";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import {Route, Routes} from "@solidjs/router";
import Login from "./components/Login/Login";
import "./App.scss"

const App: Component = () => {
    return (
        <div>
          <Navigation/>
    
          <Routes>
            <Route path="/" component={HomePage}/>
            <Route path="/login" component={Login}/>
          </Routes>
        </div>
    );
};

export default App;
