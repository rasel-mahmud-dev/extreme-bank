import React, { useEffect, useState } from "react";
import { api } from "../../../axios/api";
import Avatar from "../../../components/Avatar/Avatar";
import date from "../../../utils/date";
import useStore from "../../../context/useStore";

import Table, {Column} from "components/Table/Table"

const Loans = () => {
    const [transactions, setTransactions] = useState([]);

    const [{auth} ] = useStore()


    useEffect(() => {
        api.get("/api/v1/account/loans").then(({ data, status }) => {
            if (status === 200) {
                setTransactions(data);
            }
        });
    }, []);


    const columns: Column[] = [
        {  dataIndex: "id", title: "Id", className: ""  },
        {  dataIndex: "id", title: "Id", className: ""  },
        {  dataIndex: "created_at", title: "Create at", className: "", render: (v)=> new Date(v).toDateString() },
        {  dataIndex: "load_duration", title: "Duration", className: "", render: (v)=> v + " year"  },
        {  dataIndex: "amount", title: "Amount", className: "", render: (v)=> "$"+v },
    ]


    return (
        <div>
            <div>
                <h1 className="heading-title !text-start mt-3 mb-4">My Loans</h1>
                <div className="rounded bg-white overflow-hidden rounded-xl text-sm">
                    <Table theadClass={{th: "bg-primary-50 text-dark-20 font-semibold" }} tbodyClass={{tr: "hover:bg-dark-100/20"}} dataSource={transactions} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default Loans;
