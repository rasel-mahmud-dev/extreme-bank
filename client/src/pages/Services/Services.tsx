import Loader from "components/Loader/Loader";
import Rating from "components/Rating/Rating";
import React, {useState} from "react";
import {Autoplay, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from "swiper/react";
import Avatar from "../../components/Avatar/Avatar";
import {Link} from "react-router-dom";

const Services = () => {
	const [data, _] = useState([
		{_id: 1, label: "Send Money", image: "/coin.png", rate: "5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing"},
		{_id: 1, label: "Interest Money", image: "/tax.png", rate: "5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing"},
		{_id: 1, label: "Bank Transfer", image: "/money-transfer.png", rate: "5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing"},
		{_id: 1, label: "Invest Money", image: "/investment.png", rate: "5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing"},
		{_id: 1, label: "Loan Money", image: "/loan.png", rate: "5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullana integer sagittis, eleifend consectetur adipiscing"},
	]);
	
	
	return (
		<section className="section container">
			<h5 className="heading-subtitle">Key Features</h5>
			<h1 className="heading-title">Services</h1>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{ data.map((item)=>(
					<div className="card  !shadow-light overflow-hidden px-4 pb-6 pt-4 m-4">
				<div className="w-16 mx-auto">
					<Avatar username="" className="rounded" imgClass="rounded" src={item.image} />
				</div>
				<h4 className="text-center text-lg font-semibold ">{item.label}</h4>
		
				<p className="whitespace-pre-line text-center text-dark-200 mt-3">{item.text}</p>
						<button className='text-center block mt-4 text-primary-400 font-bold mx-auto'>
							<Link to="#" className=" text-sm font-bold">View Details</Link>
						</button>
			</div>
				)) }
			</div>
			
			

		</section>
	);
};

export default Services;