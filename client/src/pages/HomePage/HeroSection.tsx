import React from 'react';
import Button from "../../components/Button/Button";

const HeroSection = () => {
	return (
		<div className="">
			<div className="container grid grid-cols-2  ">
			<div className="mt-32">
				<h5 className="text-primary-500 text-lg">Instant Money Transfer</h5>
				<h1 className="text-5xl font-bold">Transfer Money Across World In Real Time</h1>
				<p className="mt-10">Dea of denouncing pleasure and praising pain was born and lete system, and expound the ac teachings aitems to sed quia non numquam amet sit dolor.</p>
				<div className="flex gap-x-6 mt-20">
					<Button className="btn-primary">Get Started</Button>
					<Button className="btn-secondary">Transfer Money Now</Button>
				</div>
			</div>
			<img className="ml-auto mt-20" src="/banner-img.png" alt=""/>
			</div>
  </div>
	);
};

export default HeroSection;