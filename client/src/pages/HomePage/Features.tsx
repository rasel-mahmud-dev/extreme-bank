import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";

const Features = () => {
    const [data, _] = useState([
        {
            _id: 1,
            label: "Send Money",
            image: "/coin.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        // {
        //     _id: 1,
        //     label: "Interest Money",
        //     image: "/tax.png",
        //     rate: "5",
        //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        // },
        {
            _id: 1,
            label: "Bank Transfer",
            image: "/money-transfer.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        {
            _id: 1,
            label: "Invest Money",
            image: "/investment.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        {
            _id: 1,
            label: "Loan Money",
            image: "/loan.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
    ]);

    return (
        <section className="section hide-viewport container" id="services">
            <h5 className="heading-subtitle">Key Features</h5>
            <h1 className="heading-title">How We Support You</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 md:mt-8">
                {data.map((item) => (
                    <div className="card overflow-hidden">
                        <div className="w-16 mx-auto">
                            <Avatar username="" className="rounded" imgClass="rounded" src={item.image} />
                        </div>
                        <h4 className="text-center text-lg font-semibold ">{item.label}</h4>

                        <p className="whitespace-pre-line text-center text-dark-200 mt-3">{item.text}</p>
                        <button className="text-center block mt-4 text-primary-400 font-bold mx-auto">
                            <Link to="#" className=" text-sm font-bold">
                                View Details
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
            <Button className="text-center block mt-4 btn-primary font-bold mx-auto">
                <Link to="/services" className=" text-sm font-bold">
                    View All
                </Link>
            </Button>
        </section>
    );
};

export default Features;