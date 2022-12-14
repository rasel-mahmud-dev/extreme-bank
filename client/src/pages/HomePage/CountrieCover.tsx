import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router-dom";

const CountryCover = () => {
    const [data, _] = useState([
        {
            _id: 1,
            label: "British Pound",
            image: "https://templates.envytheme.com/bitr/default/assets/images/flag/flag-3.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        {
            _id: 1,
            label: "German Mark",
            image: "https://templates.envytheme.com/bitr/default/assets/images/flag/flag-6.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        {
            _id: 1,
            label: "SRI Lanka",
            image: "https://templates.envytheme.com/bitr/default/assets/images/flag/flag-7.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
        {
            _id: 1,
            label: "Turkish Lira",
            image: "https://templates.envytheme.com/bitr/default/assets/images/flag/flag-9.png",
            rate: "5",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing",
        },
    ]);

    return (
        <section className="section container">
            <h5 className="heading-subtitle">Countries We Cover</h5>
            <h1 className="heading-title">Send Money To Over 130 Countries Worldwide</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4 md:mt-8">
                {data.map((item) => (
                    <div className="card !shadow-light overflow-hidden pb-6 pt-4">
                        <div className=" flex items-center gap-x-4 justify-center">
                            <Avatar username="" className="rounded w-12" imgClass="rounded" src={item.image} />
                            <h4 className="text-center text-lg font-semibold ">{item.label}</h4>
                        </div>

                        <p className="whitespace-pre-line text-center text-dark-200 mt-3">{item.text}</p>
                        <button className="text-center block mt-4 text-primary-400 font-bold mx-auto">
                            <Link to="#" className=" text-sm font-bold">
                                View Details
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
            <p className="text-center text-body max-w-xl mx-auto mt-3">
                Bitr opens your business up to the world. Lorem ipsummet, aliquer dolor sit amet.
                <button className="text-primary-400 font-bold text-center block mx-auto">
                    <Link to="#" className=" text-sm font-bold">
                        View All Countries
                    </Link>
                </button>
            </p>
        </section>
    );
};

export default CountryCover;