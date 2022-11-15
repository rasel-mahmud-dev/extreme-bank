import * as React from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.scss";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div>
      <Navigation/>
      <Outlet/>
    </div>
    );
};

export default App;
