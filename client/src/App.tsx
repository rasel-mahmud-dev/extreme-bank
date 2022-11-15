import * as React from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.scss";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {authFetchingAction} from "./context/actions/authAction";
import useStore from "./hooks/useStore";

const App = () => {
    
    const [state, dispatch] = useStore()
    
    useEffect(()=>{
        authFetchingAction(dispatch)
    }, [])
    
    console.log(state)
    
    return (
        <div>
      <Navigation/>
      <Outlet/>
    </div>
    );
};

export default App;
