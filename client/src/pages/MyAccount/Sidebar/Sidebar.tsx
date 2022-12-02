import React, { useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import useStore from "context/useStore";
import Backdrop from "../../../components/Backdrop/Backdrop";
import { ACTION_TYPES } from "../../../types";

const Sidebar = ({hasAccount = true}: { hasAccount: boolean}) => {
    const data = [
        { icon: "/account.png", label: "My Account", to: "/my-account" },
        { icon: "/send.png", label: "Send Money", to: "/my-account/send-money", hasAccount: true },
        { icon: "/loan.png", label: "Request Loan", to: "/my-account/load-request", hasAccount: true },
        { icon: "/exchange.png", label: "My Transactions", to: "/my-account/transactions", hasAccount: true },
        { icon: "/exchange.png", label: "My Loans", to: "/my-account/loans", hasAccount: true },
        { icon: "/account.png", label: "My Account", to: "/my-account/load-request", hasAccount: true },
    ];

    const [{ isSidebarExpand }, dispatch] = useStore();

    return (
        <>
            <Backdrop
                isOpen={isSidebarExpand}
                className="sidebar2-backdrop"
                onClose={() => {
                    dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR });
                }}
            />
            <div className={`sidebar2 ${isSidebarExpand ? "expand" : ""}`}>
                <div className="p-4 flex flex-col gap-y-3">
                    {data.map((item) => !hasAccount ?  (
                        !item.hasAccount && <Link className="" to={item.to}>
                            <Button variant="list" className="!py-3">
                                <img className="w-5" src={item.icon} alt="" />
                                <h5 className="text-sm font-semibold text-dark-400 dark:text-dark-100">{item.label}</h5>
                            </Button>
                        </Link>
                    ) : (
                        <Link className="" to={item.to}>
                            <Button variant="list" className="!py-3">
                                <img className="w-5" src={item.icon} alt="" />
                                <h5 className="text-sm font-semibold text-dark-400 dark:text-dark-100">{item.label}</h5>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
