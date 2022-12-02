import React, { SyntheticEvent, useEffect, useState } from "react";
import { api } from "../../../axios/api";
import useStore from "../../../context/useStore";

import Table, { Column } from "components/Table/Table";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import InputGroup from "../../../components/InputGroup/InputGroup";
import {ACTION_TYPES} from "../../../types";

const Loans = () => {
    const [transactions, setTransactions] = useState([]);
    const [emi, setEmi] = useState([]);

    const [currentLoan, setCurrentLoan] = useState(null);

    const [{ auth, account }, dispatch] = useStore();

    const [openPayCurrentMonthEMIForm, setOpenPayCurrentMonthEMIForm] = useState(false);

    useEffect(() => {
        api.get("/api/v1/loans").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
        api.get("/api/v1/loans/emis").then(({ data, status }) => {
            if (status === 200) {
                setEmi(data);
            }
        });
    }, []);

    useEffect(() => {
        if (account.current_loan_id) {
            api.get("/api/v1/loans/loan/" + account.current_loan_id).then(({ data, status }) => {
                if (status === 200) {
                    setCurrentLoan(data);
                }
            });
        }
    }, [account]);

    function calc(amount: number, loadDuration: number, interestRate: number) {
        let month = Number(loadDuration) * 12;
        let totalPay = amount * (1 + (interestRate / 100) * loadDuration);

        return {
            // totalPay: totalPay,
            totalPay: totalPay.toFixed(2),
            monthlyPay: (totalPay / month).toFixed(2),
        };
    }

    const columns: Column[] = [
        { dataIndex: "_id", title: "Id" },
        // {  dataIndex: "id", title: "Id"  },
        { dataIndex: "created_at", title: "Create At", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => new Date(v).toDateString() },
        { dataIndex: "loan_duration", title: "Duration", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + " year" },
        { dataIndex: "interest_rate", title: "Rate (Annual)", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + "%" },
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

    const emiColumns: Column[] = [
        { dataIndex: "_id", title: "Id" },
        // {  dataIndex: "id", title: "Id"  },
        { dataIndex: "created_at", title: "Emi Month", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => new Date(v).toDateString() },
        // { dataIndex: "interest_rate", title: "Rate (Annual)", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + "%" },
        { dataIndex: "amount", title: "Amount", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => "$" + v },
        // {
        //     title: "Monthly Emi",
        //     dataIndex: "monthly_emi",
        //     sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
        //     render: (_, v) => "$" + calc(v.amount, v.loan_duration, v.interest_rate).monthlyPay,
        // },
        // {
        //     title: "Total pay",
        //     sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
        //     render: (_, v) => "$" + calc(v.amount, v.loan_duration, v.interest_rate).totalPay,
        // },
    ];

    function handlePayEMI(e: SyntheticEvent) {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let description = form.description.value;
        let agree = form.agree.checked;

        if (agree && description) {
            api.post<any>("/api/v1/loans/pay-emi", {
                description: description,
            }).then(({ data, status }) => {
                if(status === 201){
                    dispatch({
                        type: ACTION_TYPES.SET_ACCOUNT,
                        payload: {
                            ...account,
                            ...data.account
                        }
                    })
                    setEmi([data.emi, ...emi])
                    dispatch({
                        type: ACTION_TYPES.SET_NOTIFICATION,
                        payload: data.notification
                    })
                    setOpenPayCurrentMonthEMIForm(false)
                }
            });
        }
    }

    return (
        <div>
            <div>
                <h1 className="heading-title !text-start mt-3 mb-4 uppercase">My Loans</h1>

                <h1 className="heading-subtitle  !text-start mt-3">Current loan</h1>
                {currentLoan && (
                    <div className="grid grid-cols-5 gap-4">
                        <li className="card  !bg-gradient-to-r from-primary-600 to-primary-100">
                            <label className="font-semibold text-dark-10 uppercase">Principal Amount</label>
                            <h4 className="text-dark-20 font-semibold">${currentLoan.amount}</h4>
                        </li>

                        <li className="card !bg-gradient-to-r from-secondary-200 to-secondary-700">
                            <label className="font-semibold text-dark-10 uppercase">Total EMI Paid</label>
                            <h4 className="text-dark-20 font-semibold">{emi.length} of {currentLoan.total_emi}</h4>
                        </li>
                        <li className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                            <label className="font-semibold text-dark-10 uppercase">EMI Amount</label>
                            <h4 className="text-dark-20 font-semibold">${currentLoan.monthly_emi}</h4>
                        </li>

                        <li className="card !bg-gradient-to-br from-pink-400 to-pink-700">
                            <label className="font-semibold text-dark-10 uppercase">Total Payable</label>
                            <h4 className="text-dark-20 font-semibold">
                                ${calc(currentLoan.amount, currentLoan.loan_duration, currentLoan.interest_rate).totalPay}</h4>
                        </li>

                        <li className="card !bg-gradient-to-br from-green-400 to-green-900">
                            <label className="font-semibold text-dark-10 uppercase">Annual Rate</label>
                            <h4 className="text-dark-20 font-semibold">{currentLoan.interest_rate}%</h4>
                        </li>
                    </div>
                )}

                <Button onClick={() => setOpenPayCurrentMonthEMIForm(true)} className="btn-primary mt-10">
                    Pay Current Month EMI
                </Button>
                <Modal className="max-w-md" isOpen={openPayCurrentMonthEMIForm} onClose={() => setOpenPayCurrentMonthEMIForm(false)}>
                    <h1 className="heading-subtitle">Pay current Month EMI ($234)</h1>
                    <p className="text-body text-center">For this EMI we reducer amount from your account balance</p>
                    <form className="mt-4" onSubmit={handlePayEMI}>
                        <InputGroup name="description" type="textarea" placeholder="Enter summary" />

                        <div className="flex items-center gap-x-2 text-body mt-4">
                            <input type="checkbox" id="agree" name="agree" />
                            <label htmlFor="agree">Agree</label>
                        </div>

                        <Button className="btn-primary mt-4" type="submit">
                            Pay
                        </Button>
                    </form>
                </Modal>

                <div className="mt-8">
                    <h1 className="heading-subtitle !text-start mt-3 ">EMI received</h1>
                    <div className="card !p-0 overflow-hidden rounded-xl text-sm">
                        <Table
                            theadClass={{ th: "!pl-6 bg-primary-50 text-dark-20 dark:text-dark-10 font-semibold" }}
                            tbodyClass={{ td: "!pl-6 dark:text-dark-40", tr: "hover:bg-dark-100/20" }}
                            dataSource={emi}
                            columns={emiColumns}
                        />
                    </div>
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
