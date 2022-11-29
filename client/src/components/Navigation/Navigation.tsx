import { Link, NavLink } from "react-router-dom";

import "./navigation.scss";
import Button from "../Button/Button";
import { BiBell, HiBars4 } from "react-icons/all";
import useStore from "../../context/useStore";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import { handleLogoutAction } from "../../context/actions/authAction";

const Navigation = () => {
    const [{ auth }, dispatch] = useStore();

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

    return (
        <div className="bg-white shadow-xl fixed-nav">
            <div className="container flex justify-between items-center">
                <div className="py-5">
                    <Link to="/">
                        <img src="/logo.png" className="w-24" alt="" />
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-x-5">
                    <div className={`flex items-center gap-x-6 hidden md:flex ${openMobileNav ? "mobile-expand" : ""}`}>
                        {items.map((item) => (
                            <li className="list-none py-5 text-sm font-medium">
                                {item.href ? (
                                    <a className="text-dark-600 " href={item.href}>
                                        {item.name}
                                    </a>
                                ) : (
                                    <NavLink end={true} className="text-dark-600" to={item.to}>
                                        {item.name}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </div>

                    <div className="flex items-center gap-x-4">
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
                                    <Dropdown onClose={()=>setDropdownMenu("")}
                                              isOpen={dropdownMenu === "auth"}
                                              className="bg-whit p-4 right-0 w-36 shadow-md ">
                                        <div>
                                            <h1>Hello</h1>
                                            <h1>Hello</h1>
                                            <h1>Hello</h1>
                                            <li className="list-none">
                                                <a onClick={handleLogout}>Logout</a>
                                            </li>
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