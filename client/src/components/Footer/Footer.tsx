import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import Button from "../Button/Button";
import InputGroup from "../InputGroup/InputGroup";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <>
            <footer className="dark:bg-primary-9 pb-10 py-14">
                <div className="container grid grid-cols-1 md:grid-cols-8  gap-0 md:gap-10">
                    <div className="col-auto md:col-span-3 lg:col-span-2">
                        <img className="w-24" src="/logo.png" />
                        <p className="text-dark-300 font-medium text-sm pt-4">
                            Extreme Bank is the trusted market leader in talent transformation. We change lives,
                            businesses, and nations through digital money transferring, developing the edge you need to conquer
                            what’s next
                        </p>
                        <ul className="flex gap-4 mt-4">
                            <a
                                className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-neutral/30  rounded-box"
                                href="https://www.facebook.com/rasel-mahmud-dev"
                            >
                                <FaFacebookF className="text-2xl md:text-lg" />
                            </a>
                            <a
                                className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-neutral/30  rounded-box"
                                href="https://github.com/rasel-mahmud-dev"
                                target="_blank"
                            >
                                <FaGithub className="text-2xl md:text-lg" />
                            </a>{" "}
                            <a
                                className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-neutral/30  rounded-box"
                                href="/"
                            >
                                <FaYoutube className="text-xl md:text-lg" />
                            </a>
                            <a
                                className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border border-neutral/30  rounded-box"
                                href="https://www.instagram.com/raselmraju"
                                target="_blank"
                            >
                                <FaInstagram className="text-2xl md:text-lg" />
                            </a>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between col-span-5 lg:col-span-6 w-full mt-4 md:mt-0">
                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold text-neutral-focus">Featured Programs</h3>
                            <ul className="mt-4">
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    Money Transfer
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">Money Loan</li>
                                <li className="text-dark-300 font-medium text-sm pt-1">Data Engineer</li>
                                <li className="text-dark-300 font-medium text-sm pt-1">Data Analyst</li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    Intro to Programming
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    Digital Marketing
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    Self Driving Car Engineer
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold text-neutral-focus">Support</h3>
                            <ul className="mt-4">
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <a href="#" className="hover:text-primary-500">
                                        Contact Us
                                    </a>
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <a href="#" className="hover:text-primary-500">
                                        Help and FAQ
                                    </a>
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <a href="#" className="hover:text-primary-500">
                                        Service Status
                                    </a>
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <a href="#" className="hover:text-primary-500">
                                        Tech Requirements
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold text-neutral-focus">Quick Links</h3>
                            <ul className="mt-4">
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <Link to="/my-account" className="hover:text-primary-500">
                                        My Account
                                    </Link>
                                </li>
                                <li className="text-dark-300 font-medium text-sm pt-1">
                                    <Link to="/my-account" className="hover:text-primary-500">
                                        Transfer Money
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold text-neutral-focus">GET IN TOUCH!</h3>
                            <p className="text-dark-300 font-medium text-sm">
                                Every Single Updates and Notifications
                            </p>
                            <ul className="mt-4">
                                <InputGroup
                                    placeholder="Your Email"
                                    className="input bg-transparent input-bordered w-full max-w-xs"
                                 onChange={()=>{}} validate={{}}/>
                                <Button className="btn-primary mt-4 ">Subscribe</Button>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="bg-primary-400 py-4">
                <div className="container flex flex-col md:flex-row text-center md:text-start gap-4 md:gap-4 justify-between text-white">
                    <h1>Rasel Mahmud.</h1>
                    <h1>Copyright © {new Date().getFullYear()}  All Rights Reserved.</h1>
                </div>
            </footer>
        </>
    );
};

export default Footer;
