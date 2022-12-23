import React, { SyntheticEvent, useEffect, useState } from "react";
import { api } from "../../../axios/api";
import useStore from "../../../context/useStore";

import Table, { Column } from "components/Table/Table";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import WithSidebarButton from "../../../components/WithSidebarButton/WithSidebarButton";
import AddDeposit from "./AddDeposit";
import dateTime from "../../../utils/date";
import {ACTION_TYPES, CurrentLoan, Deposit} from "../../../types";

const MyDeposit = () => {
    const [deposit, setDeposit] = useState<Deposit[]>([]);

    const [{ auth, account }, dispatch] = useStore();

    const [isOpenDepositForm, setOpenAddDepositForm] = useState(false);

    const [totalDepositInterest, setTotalDepositInterest] = useState(0)

    useEffect(() => {
        api.get("/api/v1/account/deposit-money").then(({ data, status }) => {
            if (status === 200) {
                setDeposit(data);
            }
        });
    }, []);


    // calculate deposit interest amount
    useEffect(()=>{
        let totalInterestAmount = deposit?.reduce((acc: any, depositItem: any) => {
            let interestMoney = calcInterest(depositItem.amount, depositItem.created_at, depositItem.interest_rate);
            return acc + interestMoney
        }, 0);
        setTotalDepositInterest(totalInterestAmount)
    }, [deposit])



    function handleSuccessDeposit(data: any){
        if(data) {
            setDeposit([data.deposit as Deposit, ...deposit])
            setOpenAddDepositForm(false)
            dispatch({
                type: ACTION_TYPES.SET_ACCOUNT,
                payload: {
                    ...account,
                    deposit: account.deposit + data.deposit.amount
                }
            })
            dispatch({
                type: ACTION_TYPES.SET_NOTIFICATION,
                payload: data.notification,
            });
        }
    }


    // calculate deposit interest from submit date
    function calcInterest(amount: number = 0, oldDate: string, interestRate: number = 0) {
        let old = new Date(oldDate).getTime()
        let now = new Date().getTime()
        let miliSecond = (now - old)
        let second = miliSecond / 1000
        let hours = ((second / 60) / 60)
        let year = hours / 8760

        let totalInterestAmount = amount * (1 + (interestRate / 100) * year);
        return totalInterestAmount
    }

    const columns: Column[] = [
        { dataIndex: "_id", title: "Deposit ID" },
        { dataIndex: "created_at", title: "Submit Date", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => dateTime(v) },
        { dataIndex: "interest_rate", title: "Rate (Annual)", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => v + "%" },
        { dataIndex: "amount", title: "Amount", sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0), render: (v) => "$" + v }
    ];

    return (
        <div>
            <div>
                <WithSidebarButton className="my-4">
                    <h1 className="heading-title !text-start">My Deposit</h1>
                </WithSidebarButton>
                <h1 className="heading-subtitle  !text-start mt-3">Current loan</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <li className="card  !bg-gradient-to-r from-primary-600 to-primary-100">
                        <label className="font-semibold text-dark-10 uppercase">Deposit Amount</label>
                        <h3 className="text-dark-20 font-semibold">${account?.deposit}</h3>
                    </li>

                    <li className="card !bg-gradient-to-br from-blue-400 to-blue-700">
                        <label className="font-semibold text-dark-10 uppercase">Total Deposit Interest</label>
                        <h3 className="text-dark-20 font-semibold">
                            ${totalDepositInterest.toFixed(2)}
                        </h3>
                    </li>

                    <li className="card !bg-gradient-to-br from-green-400 to-green-900">
                        <label className="font-semibold text-dark-10 uppercase">Interest Annual Rate</label>
                        <h3 className="text-dark-20 font-semibold">5%</h3>
                    </li>

                    {/*<li className="card !bg-gradient-to-r from-secondary-200 to-secondary-700">*/}
                    {/*    <label className="font-semibold text-dark-10 uppercase">EMI Amount</label>*/}
                    {/*    <h3 className="text-dark-20 font-semibold">${currentLoan?.monthly_emi}</h3>*/}
                    {/*</li>*/}

                </div>

                <Button onClick={() => setOpenAddDepositForm(true)} className="btn-primary mt-10">
                    Deposit Money
                </Button>

                <Modal className="max-w-md" isOpen={isOpenDepositForm} onClose={() => setOpenAddDepositForm(false)}>
                    <AddDeposit onSuccess={handleSuccessDeposit} />
                </Modal>

                <div className="mt-8">
                    <h1 className="heading-subtitle !text-start mt-3 ">Recent Deposit</h1>
                    {deposit && deposit.length > 0 ? (
                        <div className="card !p-0 overflow-hidden rounded-xl text-sm">
                            <Table
                                minWidth={200}
                                theadClass={{ th: "!pl-6 bg-primary-50 text-dark-20 dark:text-dark-10 font-semibold" }}
                                tbodyClass={{ td: "!pl-6 dark:text-dark-40", tr: "hover:bg-dark-100/20" }}
                                dataSource={deposit}
                                columns={columns}
                            />
                        </div>
                    ) : (
                        <h1 className="text-body !font-semibold">No Deposit You added Yet</h1>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyDeposit;
