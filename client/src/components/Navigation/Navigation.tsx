import { Link, NavLink } from "react-router-dom";

import "./navigation.scss";
import Button from "../Button/Button";
import { BiBell, BsMoon, BsSun, HiBars4 } from "react-icons/all";
import useStore from "../../context/useStore";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import {useEffect, useState} from "react";
import { handleLogoutAction } from "../../context/actions/authAction";

const Navigation = () => {
    const [{ auth }, dispatch] = useStore();

    const [isDark, setDark] = useState(false);

    const items = [
        { name: "Home", to: "/" },
        { name: "Services", to: "/services" },
        { name: "Features", href: "/#features" },
        { name: "Money Transfer", to: "/my-account/send-money" },
        { name: "My Account", to: "/my-account" },
        // {name: "About US", to: "/about-us"},
    ];
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


    useEffect(()=>{
        let theme = localStorage.getItem("theme")
        if(isDark){
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = ''
        }

    }, [isDark])

    return (
        <div className="bg-white dark:bg-dark-600 shadow-xl fixed-nav">
            <div className="container flex justify-between items-center">
                <div className="py-5">
                    <Link to="/">
                        <img src="/logo.png" className="w-24" alt="" />
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-x-5 text-dark-800 dark:text-white">
                    <div className={`flex items-center gap-x-6 hidden md:flex ${openMobileNav ? "mobile-expand" : ""}`}>
                        {items.map((item) => (
                            <li className="list-none py-5 text-sm font-medium">
                                {item.href ? (
                                    <a className="" href={item.href}>
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

                    <div className="flex items-center gap-x-4">
                        <li className="list-none py-5">
                            <span className="">
                                {isDark ? (
                                    <BsSun onClick={() => setDark(false)} className="text-xl" />
                                ) : (
                                    <BsMoon onClick={() => setDark(true)} className="text-xl" />
                                )}
                            </span>
                        </li>

                        {auth && (
                            <li className="list-none py-5">
                                <BiBell className="text-2xl" />
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
                                        className="p-4 right-0 w-60 shadow-md"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">Dashboard</Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">Dashboard</Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">Dashboard</Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <Link className="!text-dark-700 dark:!text-dark-20" to="/my-account">Dashboard</Link>
                                            </Button>
                                            <Button variant="list" className="bg-transparent">
                                                <a className="!text-dark-700 dark:!text-dark-20" onClick={handleLogout}>Logout</a>
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
