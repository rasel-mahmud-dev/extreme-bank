import * as React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage";
import App from "../App";
import Login from "../components/Login/Login";

const routes = createBrowserRouter([
	{ path: "/", element: <App />,
	children: [
		{ path: "/", element: <HomePage />},
		{ path: "/login", element: <Login />}
	]
	}
])

const Router = () => {
	return <div>
		<RouterProvider router={routes} />
	</div>
};

export default Router;