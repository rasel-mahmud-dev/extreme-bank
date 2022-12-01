import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useStore from "../context/useStore";


const PrivateRoute = (props) => {
    const location = useLocation();
    const [state]  = useStore()

    if (!state.isAuthLoaded) {
        return <Loader className="page-loader" />;
    }

    if (!state.auth) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return props.children;
};

export default PrivateRoute;
