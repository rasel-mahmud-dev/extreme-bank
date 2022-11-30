import React, { useEffect, useState } from "react";
import { api } from "../../../axios/api";
import Avatar from "../../../components/Avatar/Avatar";
import date from "../../../utils/date";
import useStore from "../../../context/useStore";

import Table, { Column } from "components/Table/Table";

const Loans = () => {
    const [transactions, setTransactions] = useState([]);

    const [{ auth }] = useStore();

    useEffect(() => {
        api.get("/api/v1/account/loans").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
    }, []);

    function calc(amount: number, loadDuration: number, interestRate: number) {

        let month = Number(loadDuration) * 12;
        let rate = 5;
        let totalPay = (amount * (1 + (interestRate / 100) * loadDuration))

        return {
            // totalPay: totalPay,
            totalPay: totalPay.toFixed(2),
            monthlyPay: (totalPay / month).toFixed(2),
        };
    }

    const columns: Column[] = [
        { dataIndex: "id", title: "Id" },
        // {  dataIndex: "id", title: "Id"  },
        { dataIndex: "created_at", title: "Create At", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => new Date(v).toDateString() },
        { dataIndex: "loan_duration", title: "Duration", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + " year" },
        { dataIndex: "interest_rate", title: "Rate (Annual)", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v+"%"},
        { dataIndex: "amount", title: "Amount", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => "$" + v },
        {
            title: "Monthly Emi",
            dataIndex: "monthly_emi",
            sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
            render: (_, v) => "$" + calc(v.amount, v.loan_duration, v.interest_rate).monthlyPay,
        },
        {
            title: "Total pay",
            sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
            render: (_, v) => "$" + calc(v.amount, v.loan_duration, v.interest_rate).totalPay,
        },
    ];

    return (
        <div>
            <div>
                <h1 className="heading-title !text-start mt-3 mb-4 uppercase">My Loans</h1>

                <h1 className="heading-subtitle  !text-start mt-3">Current loan</h1>
                <div className="grid grid-cols-3 gap-4">
                    <li className="card  !bg-gradient-to-r from-primary-600 to-primary-100">
                        <label className="font-semibold text-dark-10">Principal Amount</label>
                        <h4 className="text-dark-20 font-semibold">${100000}</h4>
                    </li>

                    <li className="card !bg-gradient-to-r from-secondary-200 to-secondary-700">
                        <label className="font-semibold text-dark-10">EMI received</label>
                        <h4 className="text-dark-20 font-semibold">{4}</h4>
                    </li>
                    <li className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                        <label className="font-semibold text-dark-10">EMI received</label>
                        <h4 className="text-dark-20 font-semibold">${4}</h4>
                    </li>

                </div>


                <div className="mt-8">
                    <h1 className="heading-subtitle !text-start mt-3 ">Recent loans</h1>
                    <div className="card !p-0 overflow-hidden rounded-xl text-sm">
                        <Table
                            theadClass={{ th: "!pl-6 bg-primary-50 text-dark-20 dark:text-dark-10 font-semibold" }}
                            tbodyClass={{ td: "!pl-6 dark:text-dark-40", tr: "hover:bg-dark-100/20" }}
                            dataSource={transactions}
                            columns={columns}
                        />
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Loans;
