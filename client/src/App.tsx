import * as React from "react";
import { useEffect } from "react";
import Navigation from "components/Navigation/Navigation";
import "./App.scss";
import { Outlet } from "react-router-dom";
// import {authFetchingAction} from "./context/actions/authAction";
import useStore from "./context/useStore";
import {authFetchingAction, fetchNotificationsAction} from "./context/actions/authAction";
import Footer from "./components/Footer/Footer";


// initialize firebase on our project
// import "./firebase"

const App = () => {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const [{auth}, dispatch] = useStore();

  useEffect(() => {
    authFetchingAction(dispatch);
  }, []);


  useEffect(()=>{
      if(auth){
          fetchNotificationsAction(auth._id, dispatch)
      }
  }, [auth])


  return (
    <div className="App">
     <div className="app-content">
        <Navigation />
      <Outlet />
     </div>

      <Footer />
    </div>
  );
};

export default App;
