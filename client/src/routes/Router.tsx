import * as React from 'react';
import {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import MoneyTransfer from "../pages/MyAccount/moneyTransfer/MoneyTransfer";
import AccountDashboard from "../pages/MyAccount/AccountDashboard";
import LoanRequest from "../pages/MyAccount/LoanRequest";
import Transactions from "../pages/MyAccount/Transactions/Transactions";
import Loans from "../pages/MyAccount/Loans/Loans";
import Loader from "../components/Loader/Loader";


const MyAccount = lazy(()=>import("../pages/MyAccount/MyAccount"));
const Login = lazy(()=>import("../components/Login/Login"));
const Registration = lazy(()=>import("../components/Registration/Registration"))
const Services = lazy(()=>import("../pages/Services/Services"))

const routes = createBrowserRouter([
	{
		path: "/", element: <App />,
		children: [
			{ path: "/", element: <HomePage />},
			{ path: "/login", element: <Login />},
			{ path: "/registration", element: <Registration />},
			{ path: "/services", element: <Services />},
			{ path: "/my-account", element: <PrivateRoute><MyAccount /></PrivateRoute>,
			children: [
				{path: "", element: <AccountDashboard></AccountDashboard>},
				{path: "send-money", element: <MoneyTransfer />},
				{path: "load-request", element: <LoanRequest />},
				{path: "transactions", element: <Transactions />},
				{path: "loans", element: <Loans />},
			]
			}
		]
	}
])

const Router = () => {
	return <div>
		<Suspense fallback={<Loader  className="fixed card top-1/3 left-1/2 transform -translate-x-1/2" />}>
			<RouterProvider router={routes} />
		</Suspense>
	</div>
};

export default Router;