import React, {useState} from "react";

import Avatar from "../../components/Avatar/Avatar";
import {Link} from "react-router-dom";

const WhyChooseUs = () => {
	const [data, _] = useState([
		{
			_id: 1,
			label: "We’re Fast",
			image: "/fast-time.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "We’re Safe",
			image: "/shield.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "We’re Trustworthy",
			image: "/trust.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
		{
			_id: 1,
			label: "Low Costing",
			image: "/low-prices.png",
			text: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing"
		},
	]);
	
	
	return (
		<section className="section container">
			<h5 className="heading-subtitle">Why Choose Use</h5>
			<h1 className="heading-title">A New Era Of Online Banking Pay</h1>
			<p className="text-center max-w-2xl mx-auto mt-4 text-dark-300">
				Connect your money to your friends & family from anywhere, anytime regardless of any delay.
				your money to your friends & family from anywhere
			</p>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 justify-self-center">
				{data.map((item) => (
					<div className="card  !shadow-light overflow-hidden px-4 pb-6 pt-4 m-4">
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

export default WhyChooseUs;