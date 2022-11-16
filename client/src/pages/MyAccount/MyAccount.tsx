import React from 'react';
import RecentActivity from "./RecentActivity/RecentActivity";
import RecentMoneyTransfer from "./RecentMoneyTransfer/RecentMoneyTransfer";

const MyAccount = () => {
	return (
		<div className="container">
			<h1 className="heading-title !text-start mt-4 mb-8">My Account</h1>
			
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			
			<div className="card ">
				<label htmlFor="" className="flex items-center gap-x-1">
					<img className="w-6" src="/money.png" alt=""/>
					<span className="font-semibold text-dark-500 text-md">Balance</span>
				</label>
				<h1 className="text-2xl font-bold text-dark-500">$34,345,344</h1>
			</div>
			<div className="card">
				<label htmlFor="" className="flex items-center gap-x-1">
					<img className="w-6" src="/atm.png" alt=""/>
					<span className="font-semibold text-dark-500 text-md">Withdrawal</span>
				</label>
				<h1 className="text-2xl font-bold text-dark-500">$345,344</h1>
			</div>
				<div className="card">
				<label htmlFor="" className="flex items-center gap-x-1">
					<img className="w-6" src="/atm.png" alt=""/>
					<span className="font-semibold text-dark-500 text-md">Income</span>
				</label>
				<h1 className="text-2xl font-bold text-dark-500">$345,344</h1>
			</div>
			</div>
			
	
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
				<RecentActivity/>
				<RecentMoneyTransfer/>
			</div>

			
  		</div>
	);
};

export default MyAccount;