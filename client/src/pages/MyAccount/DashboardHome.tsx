import React from "react";
import RecentActivity from "./RecentActivity/RecentActivity";
import RecentMoneyTransfer from "./RecentMoneyTransfer/RecentMoneyTransfer";
import WithSidebarButton from "../../components/WithSidebarButton/WithSidebarButton";
import useStore from "../../context/useStore";
import dateTime from "../../utils/date";

const DashboardHome = () => {
    const [{ account }, dispatch] = useStore();



    return account ? (
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
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account?.balance}</h1>
                    </div>

                    <div className="card !bg-gradient-to-r from-primary-600 to-primary-100">
                        <label htmlFor="" className="flex items-center gap-x-1">
                            <img className="w-6" src="/atm.png" alt="" />
                            <span className="text-white font-medium text-md uppercase">Deposit</span>
                        </label>
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account?.deposit}</h1>
                    </div>

                    <div className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                        <label htmlFor="" className="flex items-center gap-x-1">
                            <img className="w-6" src="/atm.png" alt="" />
                            <span className="text-white font-medium text-md uppercase">Withdrawal</span>
                        </label>
                        <h1 className="!text-start !text-2xl text-white font-semibold">${account?.withdraw}</h1>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="heading-subtitle !text-start">Account Detail</h3>

                <div className="card rounded-2xl p-3 mt-2 card-label grid grid-cols-1 md:grid-cols-2 gap-2">

                    <div className="flex items-center ">
                        <h2 className="w-24">Name:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.username}</span>
                    </div>

                    <div className="flex items-center">
                        <h2 className="w-24">Email:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.email}</span>
                    </div>

                    <div className="flex items-center">
                        <h2 className="w-24"> Account No:</h2>
                        <span className="text-body font-medium ml-4"> {account.account_no}</span>
                    </div>

                    <div className="flex items-center">
                        <h2 className="w-24">NID:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.NID}</span>
                    </div>

                    <div className="flex items-center">
                        <h2 className="w-24">Country:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.country}</span>
                    </div>
                    <div className="flex items-center">
                        <h2 className="w-24">Division:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.division}</span>
                    </div>
                    <div className="flex items-center">
                        <h2 className="w-24">upazila:</h2>
                        <span className="text-body font-medium ml-4"> {account?.user?.upazila}</span>
                    </div>

                    <div className="flex items-center">
                        <h2 className="w-24">Join on:</h2>
                        <span className="text-body font-medium ml-4"> {dateTime(account?.user?.created_at)}</span>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                <RecentActivity />
                <RecentMoneyTransfer />
            </div>
        </div>
    ) : null;
};

export default DashboardHome;
