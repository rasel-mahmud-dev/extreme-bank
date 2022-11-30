import React, {useEffect, useState} from 'react';
import {BsGoogle, GrAmazon} from "react-icons/all";
import {api} from "../../../axios/api";
import date from "../../../utils/date";
import Avatar from "../../../components/Avatar/Avatar";
import {Link} from "react-router-dom";

const RecentMoneyTransfer = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        api.get("/api/v1/account/transactions?limit=10").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
    }, []);



    const className = [
		"primary-400",
		"green-500",
		"orange-500",
		"pink-500",
	]
	
	return (
		<div className="">
			
			<div className="flex justify-between items-center">
      		<h3 className='text-lg font-semibold'>Recent Money Transfer</h3>
            <Link to={"/my-account/transactions"} className="text-blue-600 text-xs">View All</Link>
          </div>
			
			<div className="card p-3 mt-3">
				
				
            {transactions.map((transaction, index) => (<div className="border-b border-neutral-500/10 py-4">
              <div className="flex gap-x-2">
                <div className="rounded-4xl">
                  {/*<li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">*/}
					<li className={`list-none w-max text-2xl rounded-2xl text-white shadow-bg-md bg-${className[index]}`}>
                        <Avatar imgClass="w-8 h-8" src={transaction?.receiver_avatar} username={transaction?.receiver_name} />
                  </li>
                </div>
                <div className="flex justify-between flex-1 transactions-center">
                  <div>
                      <h5 className="font-semibold text-md">{transaction?.receiver_name}</h5>
                      <span className="text-sm text-dark-200 font-medium">{date(transaction.created_at)}</span>
                  </div>
                  <div className="justify-end">
                    <h2 className={`font-bold text-lg text-end  text-${className[index]}`}>${transaction.amount}</h2>
					  <p className={`text-neutral-400 text-sm`}>{transaction.payment_type}</p>
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