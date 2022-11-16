import React, {useState} from 'react';
import {BsGoogle, GrAmazon} from "react-icons/all";

const RecentMoneyTransfer = () => {
	
	const [data, setData] = useState([
		{className: "primary-400", label: "Jane Doe", type: "Received", amount: "200", icon: "https://www.enableds.com/products/payapp/v13/images/pictures/6s.jpg"},
		{className: "green-500", label: "Amazon", type: "Received", amount: "400", icon: "https://www.enableds.com/products/payapp/v13/images/pictures/6s.jpg"},
		{className: "orange-500", label: "Alex", type: "Send", amount: "200", icon: "https://www.enableds.com/products/payapp/v13/images/pictures/6s.jpg"},
		{className: "pink-500", label: "Withdrawal", type: "Withdraw", amount: "400", icon: "https://www.enableds.com/products/payapp/v13/images/pictures/6s.jpg"}
	])
	
	return (
		<div className="">
			
			<div className="flex justify-between items-center">
      		<h3 className='text-lg font-semibold'>Recent Money Transfer</h3>
            <span className="text-blue-600 text-xs">View All</span>
          </div>
			
			<div className="bg-white rounded-2xl p-3 mt-4">
				
				
            {data.map((item) => (<div className="border-b border-neutral-500/10 py-4">
              <div className="flex gap-x-2">
                <div className="rounded-4xl">
                  {/*<li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">*/}
					<li className={`list-none w-max text-2xl rounded-2xl text-white shadow-bg-md bg-${item.className}`}>
                    <img src={item.icon} className="w-14 rounded-xl" alt=""/>
                  </li>
                </div>
                <div className="flex justify-between flex-1 items-center">
                  <div>
                    <h5 className="font-semibold text-md">{item.label}</h5>
					  <span className="text-sm text-dark-200 font-medium">12th March 2022</span>
                  </div>
                  <div className="justify-end">
                    <h2 className={`font-bold text-lg text-end  text-${item.className}`}>${item.amount}</h2>
					  <p className={`text-neutral-400 text-sm`}>{item.type}</p>
                  </div>
                </div>
              </div>
            </div>
			))}
          </div>
  </div>
	);
};

export default RecentMoneyTransfer;