import React, { useEffect, useState } from "react";
import useStore from "../../context/useStore";
import { getAccountInfoAction } from "../../context/actions/accountAction";
import RecentActivity from "./RecentActivity/RecentActivity";
import RecentMoneyTransfer from "./RecentMoneyTransfer/RecentMoneyTransfer";
import WithSidebarButton from "../../components/WithSidebarButton/WithSidebarButton";

const DashboardHome = ({account}) => {

    return (
        <div>

            <div>
                <WithSidebarButton className="my-4">
                    <h1 className="heading-title">My Account</h1>
                </WithSidebarButton>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    <div className="card !bg-gradient-to-r from-secondary-200 to-secondary-700">
                        <label htmlFor="" className="flex items-center gap-x-1">
                            <img className="w-6" src="/money.png" alt="" />
                            <span className="text-white font-medium text-md uppercase">Balance</span>
                        </label>
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account.balance}</h1>
                    </div>

                    <div className="card !bg-gradient-to-r from-primary-600 to-primary-100">
                        <label htmlFor="" className="flex items-center gap-x-1">
                            <img className="w-6" src="/atm.png" alt="" />
                            <span className="text-white font-medium text-md uppercase">Deposit</span>
                        </label>
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account.income}</h1>
                    </div>

                    <div className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                        <label htmlFor="" className="flex items-center gap-x-1">
                            <img className="w-6" src="/atm.png" alt="" />
                            <span className="text-white font-medium text-md uppercase">Withdrawal</span>
                        </label>
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account.withdraw}</h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                <RecentActivity />
                <RecentMoneyTransfer />
            </div>
        </div>
    );
};

export default DashboardHome;
