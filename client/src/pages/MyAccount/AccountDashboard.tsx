import React, { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { getAccountInfoAction } from "../../context/actions/accountAction";
import useStore from "../../context/useStore";

const AccountDashboard = () => {
    const [{ account }, dispatch] = useStore();

    useEffect(() => {

        getAccountInfoAction(dispatch);
        return () => {};

    }, []);


    return (
        <div className="container px-4 lg:!px-0 page-g">
            <div className="flex">
                <Sidebar hasAccount={!!account} />

                <div className="content">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;

