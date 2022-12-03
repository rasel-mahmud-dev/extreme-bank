import React, {useState} from 'react';
import {BsGoogle, GrAmazon} from "react-icons/all";

const RecentActivity = () => {
	
	const [data, setData] = useState([
		{className: "primary-400", label: "Google Ads", type: "Payment", amount: "200", icon: <BsGoogle/>},
		{className: "green-500", label: "Amazon", type: "Shopping", amount: "400", icon: <GrAmazon/>},
		{className: "orange-500", label: "Google Ads", type: "Payment", amount: "200", icon: <BsGoogle/>},
		{className: "pink-500", label: "Amazon", type: "Shopping", amount: "400", icon: <GrAmazon/>},
		{className: "blue-400", label: "Google Ads", type: "Payment", amount: "200", icon: <BsGoogle/>},
	])
	
	return (
		<div className="">
			
			<div className="flex justify-between items-center">
      		<h3 className='heading-subtitle'>Recent Activity</h3>
            <span className="text-blue-600 text-xs">View All</span>
          </div>
			
			<div className="card rounded-2xl p-3 mt-2">
				
				
            {data.map((item) => (<div className="border-b border-neutral-500/10 py-4">
              <div className="flex gap-x-2">
                <div className="rounded-4xl">
                  {/*<li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">*/}
                  <li className={`list-none w-max p-5 text-2xl rounded-2xl text-white shadow-bg-md bg-${item.className}`}>
                    {item.icon}
                  </li>
                </div>
                <div className="flex justify-between flex-1 items-center">
                  <div>
                    <h5 className="card-label">{item.label}</h5>
					  <span className="text-sm text-dark-200 font-medium">12th March 2022</span>
                  </div>
                  <div className="justify-end">
                    <h2 className={`font-bold card-label !text-lg text-end  text-${item.className}`}>${item.amount}</h2>
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

export default RecentActivity;