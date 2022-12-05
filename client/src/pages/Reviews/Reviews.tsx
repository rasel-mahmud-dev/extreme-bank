import { api } from "../../axios/api";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Avatar from "../../components/Avatar/Avatar";
import Rating from "../../components/Rating/Rating";

const Reviews = () => {
    const [testimonials, setTestimonials] = useState<{
        image: string,
        rate: number,
        text: string,
        name: string
    }[]>([]);

    useEffect(() => {
        api.get("/api/v1/reviews").then(({ status, data }) => {
            setTestimonials(data);
        });
    }, []);

    return (
        <div className="container py-12">
            <h1 className="heading-title uppercase">User reviews</h1>
            <div className="mx-auto my-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                    <div className="card">
                        <div className="flex justify-center flex-col items-center">
                            <Avatar imgClass="w-8 h-8" src={item.image} username={item.name} />

                            <h4 className="text-body text-center mt-2">
                                {item.name}
                            </h4>
                            <Rating rate={Number(item.rate)} />

                        </div>
                        <div className="py-2">
                            <p className="text-body text-center">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Reviews;
