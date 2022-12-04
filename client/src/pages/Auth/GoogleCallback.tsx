import React, {useEffect} from 'react';
import {authFetchingAction} from "../../context/actions/authAction";
import useStore from "../../context/useStore";
import {Navigate} from "react-router-dom";

const GoogleCallback = () => {

    const [{}, dispatch]  = useStore()

    useEffect(()=>{
        authFetchingAction(dispatch)
    }, [])

    return <Navigate to="/" />
};

export default GoogleCallback;