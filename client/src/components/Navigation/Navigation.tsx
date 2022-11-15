import {Link, NavLink} from "react-router-dom";

import "./navigation.scss"
import Button from "../Button/Button";

const Navigation = () => {
	
	
	const items = [
		{name: "Home", to: "/"},
		{name: "Services", to: "/services"},
		{name: "Features", to: "/features"},
		{name: "Money Transfer", to: "/money-transfer"},
		{name: "My Account", to: "/my-account"},
		{name: "About US", to: "/about-us"},
	]
	
	return (
		<div className="bg-white shadow-xl">
			<div className="container flex justify-between items-center">
				<div>
					<img src="https://templates.envytheme.com/bitr/default/assets/images/logo.png" className="w-24" alt=""/>
				
				</div>
				<div className="flex items-center gap-x-6">
					{ items.map((item=>(
						<li className="list-none py-5">
							<NavLink className="text-dark-600 font-semibold" to={item.to}>{item.name}</NavLink>
						</li>
					))) }
					<div>
						<Button className="btn-primary">Login</Button>
					</div>
				</div>
			</div>
  </div>
	);
};

export default Navigation;