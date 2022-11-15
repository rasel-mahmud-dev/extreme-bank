import * as React from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.scss";
import {Outlet} from "react-router-dom";
import { useEffect} from "react";
// import {authFetchingAction} from "./context/actions/authAction";

import useStore from "./context/useStore";
import {authFetchingAction} from "./context/actions/authAction";

const App = () => {
    
    const [state, dispatch]= useStore()
    
    useEffect(()=>{
        authFetchingAction(dispatch)
    }, [])
    
    
    return (
        <div>
      <Navigation/>
      <Outlet/>
    </div>
    );
};

export default App;
