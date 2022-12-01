import React, { useEffect, useState } from "react";
import useStore from "../../context/useStore";
import { getAccountInfoAction } from "../../context/actions/accountAction";
import CreateBackAccount from "../CreateBankAccount/CreateBankAccount";
import DashboardHome from "./DashboardHome";

const AccountDashboard = () => {
    const [{ account }, dispatch] = useStore();

    React.useEffect(() => {
        getAccountInfoAction(dispatch)
        return () => {};
    }, []);



    return (
        <div>

            <DashboardHome account={account} />



        </div>
    );
};

export default AccountDashboard;
