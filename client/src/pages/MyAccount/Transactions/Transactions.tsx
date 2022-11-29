import React, { useEffect, useState } from "react";
import { api } from "../../../axios/api";
import Avatar from "../../../components/Avatar/Avatar";
import date from "../../../utils/date";
import useStore from "../../../context/useStore";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    const [{auth} ] = useStore()


    useEffect(() => {
        api.get("/api/v1/account/transactions").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
    }, []);


    return (
        <div>
            <div>
                <h1 className="heading-title !text-start mt-3 mb-4">Transactions</h1>
                <div className="rounded p-4 bg-white mt-4 rounded-xl">
                    {transactions &&
                        transactions.map((transaction) => (
                            <div className="border-b border-neutral-500/10 py-4">
                                <div className="flex gap-x-2">
                                    <div className="rounded-4xl">
                                        {/*<li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">*/}
                                        <li className={`list-none w-max text-2xl rounded-2xl text-white shadow-bg-md bg-`}>
                                            <Avatar imgClass="w-8 h-8" src={transaction?.receiver_avatar} username={transaction?.receiver_name} />
                                        </li>
                                    </div>
                                    <div className="flex justify-between flex-1 items-center">
                                        <div>
                                            <h5 className="font-semibold text-md">{transaction?.receiver_name}</h5>
                                            <span className="text-sm text-dark-200 font-medium">{date(transaction.created_at)}</span>
                                            <span className="text-primary-400 bg-primary-400/10 rounded-md text-xs ml-4 px-3 py-px">
                                                {auth.user_id === transaction.sender ? "Send Money": "Received Money" }
                                            </span>

                                        </div>
                                        <div className="justify-end">
                                            <h2 className={`font-bold text-lg text-end  text`}>${transaction.amount}</h2>
                                            <p className={`text-neutral-400 text-sm`}>{transaction.payment_type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
