import {Link, NavLink} from "react-router-dom";

import "./navigation.scss"
import Button from "../Button/Button";
import {HiBars4} from "react-icons/all";
import useStore from "../../context/useStore";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import {useState} from "react";
import { handleLogoutAction} from "../../context/actions/authAction";

const Navigation = () => {
	
	const [{auth}, dispatch] = useStore()
	
	
	const items = [
		{name: "Home", to: "/"},
		{name: "Services", to: "/services"},
		{name: "Features", href: "/#features"},
		{name: "Money Transfer", to: "/money-transfer"},
		{name: "My Account", to: "/my-account"},
		{name: "About US", to: "/about-us"},
	]
	const [dropdownMenu, setDropdownMenu] = useState("")
	
	function handleLogout(){
		handleLogoutAction(dispatch).then(r => {
			if(r) {
				setDropdownMenu("")
			}
		});
	}
	
	
	return (
		<div className="bg-white shadow-xl">
			<div className="container flex justify-between items-center">
				<div className="py-5">
					<img src="https://templates.envytheme.com/bitr/default/assets/images/logo.png" className="w-24"
						 alt=""/>
				</div>
				<div className="flex items-center gap-x-6 hidden md:flex">
					{items.map((item => (
						<li className="list-none py-5">
							{item.href ? (
								<a className="text-dark-600 font-semibold" href={item.href}>{item.name}</a>
							) : (
								<NavLink className="text-dark-600 font-semibold" to={item.to}>{item.name}</NavLink>
							
							)}
						</li>
					)))}
					<div>
						{auth ? (
							<div className="relative">
								<Avatar className="w-9" src={auth.avatar} username={auth.username} onClick={()=>setDropdownMenu(dropdownMenu === "auth" ? "": "auth")}/>
								<Dropdown isOpen={dropdownMenu === "auth"} className="bg-white p-4 right-0 w-36 shadow-md rounded-md" >
									<div>
										<h1>Hello</h1>
										<h1>Hello</h1>
										<h1>Hello</h1>
										<li className="list-none py-5">
											<Button onClick={handleLogout}>Logout</Button>
										</li>
									</div>
								</Dropdown>
							</div>
						) : (
							<Link to="/login"><Button className="btn-primary">Login</Button></Link>
						)}
					</div>
				</div>
				
				<HiBars4 className="text-2xl block md:hidden"/>
				
			</div>
  </div>
	);
};

export default Navigation;