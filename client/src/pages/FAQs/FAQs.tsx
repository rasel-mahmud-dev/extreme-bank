import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const FaQs = () => {
    const questions = [
        {
            id: 1,
            question: "Who can Open Account in Extreme Bank ?",
            answer: `
			Any customer of Extreme Bank can enroll in IFIC Digital Banking. Customer who has only a credit card but no account
            can also enroll in this service.
			`,
        },
        {
            id: 112,
            question: "Do I have to pay for using this service ?",
            answer: `
			No. Extreme Bank is a service provided to all Extreme Bank customers for free.
			`,
        },
        {
            id: 4,
            question: "How much give deposit annual rate this bank ?",
            answer: `
				Currently Extreme Bank provide 5% annual rate for money deposit
			`,
        },
        {
            id: 5,
            question: "How can I Login my account ?",
            answer: `
				After Open this website, entering login page. Then you’ll put your email and password and hit login button. 
				We will implement PIN number and phone OTP Code to login system.
			`,
        },
    ];

    const [expandItems, setExpandItems] = useState<Number[]>([]);

    function handleToggle(id: number) {
        if (expandItems.includes(id)) {
            setExpandItems(expandItems.filter((a) => a !== id));
        } else {
            setExpandItems([...expandItems, id]);
        }
    }

    return (
        <div className="container py-12">
            <h1 className="heading-title uppercase">frequently asked questions</h1>
            <div className="max-w-2xl mx-auto my-10">
                {questions.map((item) => (
                    <div className="card mt-4">
                        <div className="flex justify-between items-start" onClick={() => handleToggle(item.id)}>
                            <h1 className="card-label !text-lg">{item.question}</h1>
                            {!expandItems.includes(item.id) ? <FaAngleDown className="card-label" /> : <FaAngleUp className="card-label" />}
                        </div>

                        {expandItems.includes(item.id) && (
                            <div className="py-2">
                                <p className="text-body">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaQs;
