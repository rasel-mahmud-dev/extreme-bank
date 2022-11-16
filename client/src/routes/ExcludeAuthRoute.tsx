import React, { useContext } from "react";

import { Navigate} from "react-router-dom";

import useStore from "../context/useStore";
import Loader from "../components/Loader/Loader";

/***** logged user not access these   */
const ExcludeAuthRoute = (props) => {
	
	const [state]  = useStore()
	
	if (!state.isAuthLoaded) {
		return <Loader />;
	}
	
	if (state.auth) {
		return <Navigate to={`/`}/>;
	}
	
	return props.children;
};

export default ExcludeAuthRoute;
