import React, {SyntheticEvent, useEffect, useState} from "react";
import {api} from "../../../axios/api";


const Transactions = () => {
    const [transactions, setTransations] = useState([]);
    
    useEffect(()=>{
        api.get("/api/v1/transactions").then(({data, status})=>{
            if(status === 200){
                setTransations(data)
            }
        })
    }, [])
    

    return (
        <div>
      <div>
        <h1 className="heading-title !text-start mt-4 mb-8">Money Transfer</h1>
        <div className="rounded p-4 bg-white mt-4 rounded-xl">
            {transactions?.map(transaction=>(
                <div>
                    <h1>{transaction.amount}</h1>
                </div>
            ))}
        </div>
      </div>
    </div>
    );
};

export default Transactions;