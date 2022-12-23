import React, { SyntheticEvent, useEffect, useState } from "react";
import { api } from "../../../axios/api";
import useStore from "../../../context/useStore";

import Table, { Column } from "components/Table/Table";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import InputGroup from "../../../components/InputGroup/InputGroup";
import { ACTION_TYPES } from "../../../types";
import WithSidebarButton from "../../../components/WithSidebarButton/WithSidebarButton";
import ResponseModal from "../../../components/ActionModal/ResponseModal";
import catchErrorMessage from "../../../utils/catchErrorMessage";
import {Link} from "react-router-dom";

type CurrentLoan = {
    amount: number;
    total_emi: string;
    current_loan_id: string;
    created_at: string;
    monthly_emi: string;
    interest_rate: number;
    loan_duration: number;
};

const Loans = () => {
    const [allLoans, setAllLoans] = useState([]);
    const [emi, setEmi] = useState([]);
    const [httpResponse, setHttpResponse] = useState({
        message: "",
        loading: false,
    });
    const [currentLoan, setCurrentLoan] = useState<CurrentLoan>(null as unknown as CurrentLoan);

    const [{ auth, account }, dispatch] = useStore();

    const [openPayCurrentMonthEMIForm, setOpenPayCurrentMonthEMIForm] = useState(false);

    useEffect(() => {
        api.get("/api/v1/loans").then(({ data, status }) => {
            if (status === 200) {
                setAllLoans(data);
            }
        });

    }, []);

    useEffect(() => {
        if (account && account.current_loan_id) {
            api.get("/api/v1/loans/loan/" + account.current_loan_id).then(({ data, status }) => {
                if (status === 200) {
                    setCurrentLoan(data);
                }
            });

            api.get("/api/v1/loans/emis?loan_id="+ account.current_loan_id).then(({ data, status }) => {
                if (status === 200) {
                    setEmi(data);
                }
            });
        }
    }, [account]);

    function calc(amount: number = 0, loadDuration: number = 0, interestRate: number = 0) {
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
        { dataIndex: "is_completed", title: "Status", render: (v) => v ? "PAID" :  "UNPAID" },
    ];

    const emiColumns: Column[] = [
        { dataIndex: "_id", title: "Id" },
        // {  dataIndex: "id", title: "Id"  },
        { dataIndex: "created_at", title: "Emi Month", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => new Date(v).toDateString() },
        // { dataIndex: "interest_rate", title: "Rate (Annual)", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + "%" },
        { dataIndex: "amount", title: "Amount", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => "$" + v },
    ];

    function handlePayEMI(e: SyntheticEvent) {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let description = form.description.value;
        let agree = form.agree.checked;

        if (agree && description) {

            setHttpResponse({message: "", loading: true})

            api.post<any>("/api/v1/loans/pay-emi", {
                description: description,
            }).then(({ data, status }) => {
                setHttpResponse({message: "", loading: false})
                if (status === 201) {
                    dispatch({
                        type: ACTION_TYPES.SET_ACCOUNT,
                        payload: {
                            ...account,
                            ...data.account,
                        },
                    });
                    setEmi([data.emi, ...emi]);
                    dispatch({
                        type: ACTION_TYPES.SET_NOTIFICATION,
                        payload: data.notification,
                    });
                    if(data.message){
                        setTimeout(()=>{
                            setHttpResponse({message: data.message, loading: false})
                        }, 300)
                    }
                }
            }).catch(ex=>{
                setHttpResponse({message: "", loading: false})
                setTimeout(()=>{
                    setHttpResponse({message: catchErrorMessage(ex), loading: false})
                }, 300)
            })
                .finally(()=>{
                    setOpenPayCurrentMonthEMIForm(false);
                })
        }
    }



    return (
        <div>
            <div>
                <WithSidebarButton className="my-4">
                    <h1 className="heading-title !text-start">My Loans</h1>
                </WithSidebarButton>
                <h1 className="heading-subtitle  !text-start mt-3">Current loan</h1>

                <ResponseModal
                    isSuccess={false}
                    loadingTitle="Prepare Your Loan"
                    {...httpResponse}
                    onClose={() => setHttpResponse((p) => ({ ...p, message: "", loading: false }))}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <li className="card  !bg-gradient-to-r from-primary-600 to-primary-100">
                        <label className="font-semibold text-dark-10 uppercase">Principal Amount</label>
                        <h3 className="text-dark-20 font-semibold">${currentLoan?.amount}</h3>
                    </li>

                    <li className="card !bg-gradient-to-r from-secondary-200 to-secondary-700">
                        <label className="font-semibold text-dark-10 uppercase">Total EMI Paid</label>
                        <h3 className="text-dark-20 font-semibold">
                            {emi.length} of {currentLoan?.total_emi}
                        </h3>
                    </li>
                    <li className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                        <label className="font-semibold text-dark-10 uppercase">EMI Amount</label>
                        <h3 className="text-dark-20 font-semibold">${currentLoan?.monthly_emi}</h3>
                    </li>

                    <li className="card !bg-gradient-to-br from-pink-400 to-pink-700">
                        <label className="font-semibold text-dark-10 uppercase">Total Payable</label>
                        <h3 className="text-dark-20 font-semibold">
                            ${calc(currentLoan?.amount, currentLoan?.loan_duration, currentLoan?.interest_rate).totalPay}
                        </h3>
                    </li>

                    <li className="card !bg-gradient-to-br from-green-400 to-green-900">
                        <label className="font-semibold text-dark-10 uppercase">Annual Rate</label>
                        <h3 className="text-dark-20 font-semibold">{currentLoan?.interest_rate}%</h3>
                    </li>
                </div>

                {!currentLoan && <div className="mt-10">
                    <p className="text-body !font-semibold">You haven't take a loan</p>
                    <Link to="/my-account/load-request">
                        <Button className="btn-primary ">
                            Take a Loan
                        </Button>
                    </Link>
                </div> }

                <Button onClick={() => setOpenPayCurrentMonthEMIForm(true)} disabled={!currentLoan} className="btn-primary mt-10">
                    Pay Current Month EMI
                </Button>

                <Modal className="max-w-md" isOpen={openPayCurrentMonthEMIForm} onClose={() => setOpenPayCurrentMonthEMIForm(false)}>
                    <h1 className="heading-subtitle">Pay current Month EMI (${currentLoan?.monthly_emi})</h1>
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
                    {emi && emi.length > 0 ? (
                        <div className="card !p-0 overflow-hidden rounded-xl text-sm">
                            <Table
                                minWidth={200}
                                theadClass={{ th: "!pl-6 bg-primary-50 text-dark-20 dark:text-dark-10 font-semibold" }}
                                tbodyClass={{ td: "!pl-6 dark:text-dark-40", tr: "hover:bg-dark-100/20" }}
                                dataSource={emi}
                                columns={emiColumns}
                            />
                        </div>
                    ) : (
                        <h1 className="text-body !font-semibold">No Data Available</h1>
                    )}
                </div>

                <div className="mt-8">
                    <h1 className="heading-subtitle !text-start mt-3 ">Recent loans</h1>
                    {allLoans && allLoans.length > 0 ? (
                        <div className="card !p-0 overflow-hidden rounded-xl text-sm">
                            <Table
                                theadClass={{ th: "!pl-6 bg-primary-50 text-dark-20 dark:text-dark-10 font-semibold" }}
                                tbodyClass={{ td: "!pl-6 dark:text-dark-40", tr: "hover:bg-dark-100/20" }}
                                dataSource={allLoans}
                                columns={columns}
                                fixed={true}
                                scroll={{ x: 500 }}
                            />
                        </div>
                    ) : (
                        <h1 className="text-body !font-semibold">No Data Available</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loans;
