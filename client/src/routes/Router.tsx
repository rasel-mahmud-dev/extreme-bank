import * as React from 'react';
import {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import MoneyTransfer from "../pages/MyAccount/MoneyTransfer/MoneyTransfer";
import LoanRequest from "../pages/MyAccount/LoanRequest";
import Transactions from "../pages/MyAccount/Transactions/Transactions";
import Loans from "../pages/MyAccount/Loans/Loans";
import Loader from "../components/Loader/Loader";

import DashboardHome from "../pages/MyAccount/DashboardHome";
import GoogleCallback from "../pages/Auth/GoogleCallback";
import Deposit from "../pages/MyAccount/Deposit/Deposit";


const AccountDashboard = lazy(()=>import("../pages/MyAccount/AccountDashboard"));
const Login = lazy(()=>import("../components/Login/Login"));
const Registration = lazy(()=>import("../components/Registration/Registration"))
const Services = lazy(()=>import("../pages/Services/Services"))

const routes = createBrowserRouter([
	{
		path: "/", element: <App />,
		children: [
			{ path: "/", element: <HomePage />},
			{ path: "/login", element: <Login />},
			{ path: "/google-callback", element: <GoogleCallback />},
			{ path: "/registration", element: <Registration />},
			{ path: "/services", element: <Services />},
			{ path: "/my-account", element: <PrivateRoute><AccountDashboard /></PrivateRoute>,
			children: [
				{path: "", element: <DashboardHome />},
				{path: "send-money", element: <MoneyTransfer />},
				{path: "load-request", element: <LoanRequest />},
				{path: "transactions", element: <Transactions />},
				{path: "deposit", element: <Deposit />},
				{path: "loans", element: <Loans />},
			]
			}
		]
	}
])

const Router = () => {
	return <div>
		<Suspense fallback={<Loader  className="page-loader" />}>
			<RouterProvider router={routes} />
		</Suspense>
	</div>
};

export default Router;