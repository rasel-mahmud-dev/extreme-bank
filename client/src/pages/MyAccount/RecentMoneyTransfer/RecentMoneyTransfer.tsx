import React, { useEffect, useState } from "react";
import { BsGoogle, GrAmazon } from "react-icons/all";
import { api } from "../../../axios/api";
import date from "../../../utils/date";
import Avatar from "../../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import { TransactionType } from "../../../types";
import useStore from "../../../context/useStore";

const RecentMoneyTransfer = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [{ auth }] = useStore();
    useEffect(() => {
        api.get("/api/v1/account/transactions?limit=10").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
    }, []);

    const className = ["primary-400", "green-500", "orange-500", "pink-500"];

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h3 className="heading-subtitle">Recent Money Transfer</h3>
                <Link to={"/my-account/transactions"} className="text-blue-600 text-xs">
                    View All
                </Link>
            </div>

            <div className="card mt-2 !pt-0 rounded-xl">
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
    );
};

export default RecentMoneyTransfer;