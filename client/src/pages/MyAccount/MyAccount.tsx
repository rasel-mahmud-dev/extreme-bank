import React from "react";
import RecentActivity from "./RecentActivity/RecentActivity";
import RecentMoneyTransfer from "./RecentMoneyTransfer/RecentMoneyTransfer";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <div className="container page-g">
      <div className="flex">
        <Sidebar />

        <div className="content">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;