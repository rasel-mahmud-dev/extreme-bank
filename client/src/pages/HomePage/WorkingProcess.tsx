import React, {useState} from "react";

import Avatar from "../../components/Avatar/Avatar";
import {Link} from "react-router-dom";

const WorkingProcess = () => {
	const [data, _] = useState([
		{
			_id: 1,
			label: "Open Account",
			image: "/expenses.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "Verify Identity",
			image: "/account.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "Connect Your Account",
			image: "/id-card.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "Send Money",
			image: "/send.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
	]);
	
	
	return (
		<section className="section hide-viewport container">
			<h5 className="heading-subtitle">Working Process</h5>
			<h1 className="heading-title">Open An Account In Easy 4 Steps</h1>
			<p className="text-center max-w-2xl mx-auto mt-4 text-dark-300">Connect your money to your friends & family from anywhere, anytime regardless any delay. Lorem ipsum Nullana integer sagittis, eleifend. met, aliquere.</p>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 md:mt-8 justify-self-center">
				{data.map((item) => (
					<div className="card overflow-hidden">
				<div className="r">
					<Avatar username="" className="rounded w-12 mx-auto" imgClass="rounded" src={item.image}/>
				</div>
				<h4 className="text-center text-lg font-semibold ">{item.label}</h4>
		
				<p className="whitespace-pre-line text-center text-dark-200 mt-3">{item.text}</p>
						<button className='text-center block mt-4 text-primary-400 font-bold mx-auto'>
							<Link to="#" className=" text-sm font-bold">View Details</Link>
						</button>
			</div>
				))}
			</div>
			
			

		</section>
	);
};

export default WorkingProcess;