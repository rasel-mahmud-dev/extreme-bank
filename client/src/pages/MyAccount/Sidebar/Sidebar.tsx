import React from "react";
import "./sidebar.scss";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
      <div className="p-4 flex flex-col gap-y-3">
        
        <li className="bg-dark-10/40 hover:bg-primary-500/30 cursor-pointer transition transition-colors w-full list-none py-2 px-4 rounded-md">
          <Link className="flex gap-x-1 items-center" to="/my-account">
            <img className="w-4" src="/account.png" alt=""/>
            <h5 className="text-sm font-medium text-dark-400">My Account</h5>
          </Link>
        </li>

        
        <li className="bg-dark-10/40 hover:bg-primary-500/30 cursor-pointer transition transition-colors w-full list-none py-2 px-4 rounded-md">
          <Link className="flex gap-x-1 items-center" to="/my-account/send-money">
            <img className="w-4" src="/send.png" alt=""/>
            <h5 className="text-sm font-medium text-dark-400">Send Money</h5>
          </Link>
        </li>

        <li className="bg-dark-10/40 hover:bg-primary-500/30 cursor-pointer transition transition-colors w-full list-none py-2 px-4 rounded-md">
          <Link className="flex gap-x-1 items-center" to="/my-account/load-request">
            <img className="w-4" src="/loan.png" alt=""/>
            <h5 className="text-sm font-medium text-dark-400">Request Loan </h5>
          </Link>
        </li>

        <li className="bg-dark-10/40 hover:bg-primary-500/30 cursor-pointer transition transition-colors w-full list-none py-2 px-4 rounded-md">
          <Link className="flex gap-x-1 items-center" to="/my-account/transactions">
            <img className="w-4" src="/loan.png" alt=""/>
            <h5 className="text-sm font-medium text-dark-400">Transactions </h5>
          </Link>
        </li>

        <li className="bg-dark-10/40 hover:bg-primary-500/30 cursor-pointer transition transition-colors w-full list-none py-2 px-4 rounded-md">
          <Link className="flex gap-x-1 items-center" to="/send-money">
            <img className="w-4" src="/loan.png" alt=""/>
            <h5 className="text-sm font-medium text-dark-400">Request Loan </h5>
          </Link>
        </li>
      </div>
    </div>
    );
};

export default Sidebar;