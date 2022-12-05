import React, { useEffect, useState } from "react";
import { api } from "../../../axios/api";
import Avatar from "../../../components/Avatar/Avatar";
import date from "../../../utils/date";
import useStore from "../../../context/useStore";
import {TransactionType} from "../../../types";


const Transactions = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    const [{ auth }] = useStore();

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
                <div className="card mt-4 rounded-xl">
                    {transactions &&
                        transactions.map((transaction) => (
                            <div className="border-b border-neutral-500/10 py-4 last:border-none">
                                <div className="flex gap-x-2 items-center">
                                    <div className="rounded-4xl">
                                        {/*<li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">*/}
                                        <li className={`list-none w-max text-2xl rounded-2xl text-white shadow-bg-md bg-`}>
                                            <Avatar
                                                imgClass="w-8 h-8"
                                                src={transaction.receiver_id === auth._id ? transaction?.receiver.avatar : transaction?.sender.avatar}
                                                username={transaction?.receiver.username}
                                            />
                                        </li>
                                    </div>
                                    <div className="flex justify-between flex-1 items-center">
                                        <div>
                                            <h5 className="card-label">
                                                {transaction.receiver_id === auth._id ? transaction?.receiver.username : transaction?.sender.username}
                                            </h5>
                                            <span className="text-sm text-dark-200 font-medium">{date(transaction.created_at)}</span>
                                            <span className="text-primary-400 bg-primary-400/10 rounded-md text-xs ml-4 px-3 py-px">
                                                {auth._id === transaction.sender_id ? "Send Money" : "Received Money"}
                                            </span>
                                        </div>
                                        <div className="justify-end text-end">
                                            {auth._id === transaction.sender_id
                                                ? transaction.receiver && (
                                                      <div className="flex items-center text-sm text-dark-300">
                                                          <Avatar
                                                              imgClass="w-6 h-6 text-xs ml-2 bg-dark-20"
                                                              src={transaction.receiver.avatar}
                                                              username={transaction.receiver.username}
                                                          />
                                                          <span className="ml-1">{transaction.receiver.username}</span>
                                                      </div>
                                                  )
                                                : transaction.sender && (
                                                      <div className="flex items-center text-sm text-dark-300">
                                                          <Avatar
                                                              imgClass="w-6 h-6 text-xs ml-2 bg-dark-20"
                                                              src={transaction.sender.avatar}
                                                              username={transaction.sender.username}
                                                          />
                                                          <span className="ml-1">{transaction.sender.username}</span>
                                                      </div>
                                                  )}

                                            <h2 className={`card-label`}>${transaction.amount}</h2>
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
