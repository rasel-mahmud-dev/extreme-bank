import * as React from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.scss";
import {Outlet} from "react-router-dom";
import { useEffect} from "react";
// import {authFetchingAction} from "./context/actions/authAction";

import useStore from "./context/useStore";
import {authFetchingAction} from "./context/actions/authAction";
import Footer from "./components/Footer/Footer";

const App = () => {
    
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    
    const [state, dispatch]= useStore()
    
    useEffect(()=>{
        authFetchingAction(dispatch)
    }, [])
    
    
    return (
        <div>
            {/*<button onClick={toggleFullScreen}>asd</button>*/}
      <Navigation/>
      <Outlet/>
            
            <Footer />
            
    </div>
    );
};

export default App;
