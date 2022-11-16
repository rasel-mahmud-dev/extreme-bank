import React from 'react';
import {BiCard, HiOutlineLibrary, MdPayment} from "react-icons/all";
import {BsFileBarGraph} from "react-icons/bs";
import {FiHome} from "react-icons/fi";

const MobileBottomNav = () => {
	return (
		<div>
			<div className="footer">
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BiCard className="text-2xl "/>
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BsFileBarGraph className="text-2xl "/>
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <FiHome className="text-2xl "/>
          <span className="text-center">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <MdPayment className="text-2xl "/>
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <HiOutlineLibrary className="text-2xl "/>
          <span className="text-center text-neutral-600">Cards</span>
        </li>
      </div>
  </div>
	);
};

export default MobileBottomNav;