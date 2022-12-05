import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="" id="hero">
            <div className="container grid grid-cols-1 md:grid-cols-2">
                <div className="mt-20 md:mt-32 text-center md:text-start row-start-2 md:row-start-auto">
                    <h5 className="heading-subtitle md:!text-start mb-2">Instant Money Transfer</h5>
                    <h1 className="leading-loose text-2xl md:text-3xl lg:text-5xl text-dark-800 dark:text-dark-30 font-bold">Transfer Money Across World In Real Time</h1>
                    <p className="mt-10 text-dark-600 dark:text-dark-100">
                        Dea of denouncing pleasure and praising pain was born and lete system, and expound the ac teachings aitems to sed quia non
                        numquam amet sit dolor. Dea of denouncing pleasure and praising pain was born and lete system, and expound the ac teachings aitems to sed quia non
                        numquam amet sit dolor. Dea of denouncing pleasure and praising pain was born and lete system, and expound the ac teachings aitems to sed quia non
                        numquam amet sit dolor.
                    </p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 mt-10 md:mt-20 justify-center md:justify-start row-start-1 md:row-start-auto">
                        <Button className="btn-primary">Get Started</Button>
                        <Link to={"/my-account/send-money"}>
                            <Button className="btn-secondary">Transfer Money Now</Button>
                        </Link>
                    </div>
                </div>
                <img className="ml-auto mt-20" src="/banner-img.png" alt="" />
            </div>
        </div>
    );
};

export default HeroSection;