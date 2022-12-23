import {Link, NavLink, useLocation} from "react-router-dom";

import "./navigation.scss";
import Button from "../Button/Button";
import { BiBell, BsMoon, BsSun, HiBars4 } from "react-icons/all";
import useStore from "../../context/useStore";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";
import { handleLogoutAction } from "../../context/actions/authAction";
import NotificationDropdown from "./NotificationDropdown";

const Navigation = () => {
    const [{ auth, notifications = [] }, dispatch] = useStore();

    const location = useLocation()

    let countNewNotification = notifications.reduce((acc, cur) => {
        if (!cur.isRead) acc++;
        return acc;
    }, 0);

    const [isDark, setDark] = useState(-1);

    const items = [
        { name: "Home", href: "/#hero" },
        { name: "Services", href: "/#services" },
        { name: "Features", href: "/#features" },
        { name: "Money Transfer", to: "/my-account/send-money" },
        { name: "My Account", to: "/my-account" },
        // {name: "About US", to: "/about-us"},
    ];


    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [dropdownMenu, setDropdownMenu] = useState("");
    const [openMobileNav, setOpenMovileNav] = useState(false);

    function handleLogout() {
        handleLogoutAction(dispatch).then((r) => {
            if (r) {
                setDropdownMenu("");
            }
        });
    }

    function handleToggleMobileNav() {
        setOpenMovileNav(!openMobileNav);
    }


    useEffect(() => {
        if (isDark !== -1) {
            if (isDark === 1) {
                document.documentElement.classList.add("dark");
                localStorage.isDark = "1";
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.isDark = "0";
            }
        }
    }, [isDark]);


    useEffect(() => {
        let theme = localStorage.getItem("isDark");
        if (theme === "1") {
            document.documentElement.classList.add("dark");
            setDark(1)
        } else {
            document.documentElement.classList.remove("dark");
            setDark(0)
        }

        window.addEventListener('hashchange', handleHashChange, false);
        return ()=> window.removeEventListener("hashchange", handleHashChange, false)

    }, []);

    function handleHashChange(){
        window.addEventListener('hashchange', () => {
            let hash = window.location.hash;
            let index = items.findIndex((item=> item.href && item.href.slice(1) === hash))
            setActiveNavIndex(index)
        }, false);
    }



    useEffect(() => {
        let hash = window.location.hash;
        if(!hash){
            setActiveNavIndex(-1)
        }
    }, [location.pathname]);



    return (
        <div className="bg-white dark:bg-dark-600 shadow-xl fixed-nav">
            <div className="container flex justify-between items-center">
                <div className="py-5">
                    <Link to="/">
                        <img src="/Group 3.png" className="w-40 sm:w-48 md:w-52" alt="" />
                        {/*<img src="/logo.png" className="w-24" alt="" />*/}
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-x-5 text-dark-800 dark:text-white">
                    <div className={`flex items-center gap-x-6 hidden md:flex ${openMobileNav ? "mobile-expand" : ""}`}>
                        {items.map((item, index) => (
                            <li className="list-none py-5 text-sm font-medium">
                                {item.href ? (
                                    <a className={`${index === activeNavIndex ? "active-nav": ""}`} href={item.href}>
                                        {item.name}
                                    </a>
                                ) : (
                                    <NavLink end={true} to={item.to}>
                                        {item.name}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </div>

                    <div className="flex items-center gap-x-2 md:gap-x-4">
                        <li className="list-none py-5 cursor-pointer">
                            <span className="">
                                {isDark === 1 ? (
                                    <BsSun onClick={() => setDark(0)} className="text-xl" />
                                ) : (
                                    <BsMoon onClick={() => setDark(1)} className="text-xl" />
                                )}
                            </span>
                        </li>

                        {auth && (
                            <li className="list-none py-5 relative ">
                                <div className="relative cursor-pointer" onClick={() => setDropdownMenu("notification")}>
                                    <BiBell className="text-2xl" />
                                    {countNewNotification ? <span className="badge">{countNewNotification}</span> : ""}
                                </div>

                                <NotificationDropdown dropdownMenu={dropdownMenu} setDropdownMenu={setDropdownMenu} />
                            </li>
                        )}
                        <li className="list-none">
                            {auth ? (
                                <div className="relative">
                                    <Avatar
                                        imgClass="w-9 h-9"
                                        src={auth.avatar}
                                        username={auth.username}
                                        onClick={() => setDropdownMenu(dropdownMenu === "auth" ? "" : "auth")}
                                    />
                                    <Dropdown
                                        onClose={() => setDropdownMenu("")}
                                        isOpen={dropdownMenu === "auth"}
                                        className="p-4 right-0 w-60 shadow-card"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">
                                                    Dashboard
                                                </Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account/deposit
                                           ">
                                                    My Deposit
                                                </Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account/loans">
                                                    My Loans
                                                </Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">
                                                    My Transactions
                                                </Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <a className="!text-dark-700 dark:!text-dark-20" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </Button>
                                        </div>
                                    </Dropdown>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <Button className="btn-primary">Login</Button>
                                </Link>
                            )}
                        </li>

                        <li className="list-none py-5">
                            <HiBars4 className="text-2xl block md:hidden" onClick={handleToggleMobileNav} />
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
