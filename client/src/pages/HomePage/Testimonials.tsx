import Loader from "components/Loader/Loader";
import Rating from "components/Rating/Rating";
import React, {useState} from "react";
import {Autoplay, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from "swiper/react";
import Avatar from "../../components/Avatar/Avatar";

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState([
		{_id: 1, name: "alex", image: "https://ruxa-vue.hibootstrap.com/img/client-4.19537ca9.jpg", rate: "5", text: "werewrewr"},
		{_id: 1, name: "alex", image: "https://ruxa-vue.hibootstrap.com/img/client-4.19537ca9.jpg", rate: "5", text: "werewrewr"},
		{_id: 1, name: "alex", image: "https://ruxa-vue.hibootstrap.com/img/client-4.19537ca9.jpg", rate: "5", text: "werewrewr"},
		{_id: 1, name: "alex", image: "https://ruxa-vue.hibootstrap.com/img/client-4.19537ca9.jpg", rate: "5", text: "werewrewr"},
		{_id: 1, name: "alex", image: "https://ruxa-vue.hibootstrap.com/img/client-4.19537ca9.jpg", rate: "5", text: "werewrewr"},
	]);
	
	
	return (
		<section className="section hide-viewport container">
			<h5 className="heading-subtitle">Our Testimonials</h5>
			<h1 className="heading-title">What Our Client Says</h1>
			
			{testimonials && (
				<div className="">
					<Swiper
						slidesPerView={1}
						centeredSlides={false}
						breakpoints={{
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							1068: {
								slidesPerView: 3,
							},
						}}
						autoplay={{
							delay: 1500,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
						}}
						modules={[Autoplay, Pagination]}
					>
						{testimonials.map((item) => (
							<SwiperSlide key={item._id} className="pb-8 px-2">
								<div className="card !shadow-light overflow-hidden pb-6 pt-4 ">
									<div className="w-16 mx-auto">
										<Avatar username="" className="w-20" src={item.image} />
									</div>
									<h4 className="text-center text-sm font-semibold mt-2 mb-1 ">{item.name}</h4>
									<Rating className="justify-center" rate={item.rate} label={false}/>
									<p className="whitespace-pre-line text-center text-dark-300 mt-3">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											 quod recusandae	llo inventore necessitatibus quod recusandae?
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
			
			{!testimonials && (
				<div>
					<Loader title="Testimonials are fetching" className="flex justify-center my-10"/>
				</div>
			)}
		</section>
	);
};

export default Testimonials;