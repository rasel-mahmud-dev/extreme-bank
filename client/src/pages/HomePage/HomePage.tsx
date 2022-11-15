import "./style.scss";
import * as React from "react"


import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineReload,
} from "react-icons/ai";

import {BsFileBarGraph, BsGoogle} from "react-icons/bs";
import { FiHome } from "react-icons/fi";


import { Link } from "react-router-dom";
import {BiBell, BiCard, BiMeteor, BiMoney, BiUser, GrAmazon, HiOutlineLibrary, MdPayment} from "react-icons/all";

const HomePage = () => {
  return (
    <div>
      <div className="home-hero p-3">
        <div className="flex justify-between items-center">
          <div className="text-gray-300 font-medium">
            <p className="text-xs font-bold">Sunday 13 November</p>
            <h3 className="text-gray-50 text-2xl font-bold">Welcome</h3>
          </div>
          <div className="flex items-center gap-x-3">
            <li className="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <BiMeteor />
            </li>
            <li className="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <BiBell />
            </li>
            <li className="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <Link to="/login">
                <BiUser />
              </Link>
            </li>
          </div>
        </div>

        <div className="box flex items-center justify-center">
          <h1>Slider 1</h1>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col justify-center items-center">
            <li className="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
              <div className="w-10 h-10 border-2 text-amber-400 border-amber-400 rounded-full flex items-center justify-center ">
                <AiOutlineArrowUp className="" />
              </div>
            </li>
            <span className="text-center font-medium inline-block text-sm mt-2">
              Transfer
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <li className="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
              <div className="w-10 h-10 border-2 text-green-400 border-green-400 rounded-full flex items-center justify-center ">
                <AiOutlineArrowDown className="" />
              </div>
            </li>
            <span className="text-center font-medium inline-block text-sm mt-2">
              Request
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <li className="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
              <div className="w-10 h-10 border-2 text-blue-400 border-blue-400 rounded-full flex items-center justify-center ">
                <AiOutlineReload className="" />
              </div>
            </li>
            <span className="text-center font-medium inline-block text-sm mt-2">
              Exchange
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <li className="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
              <div className="w-10 h-10 border-2 text-neutral-500 border-neutral-500 rounded-full flex items-center justify-center ">
                <BiMoney className="" />
              </div>
            </li>
            <span className="text-center font-medium inline-block text-sm mt-2">
              Bills
            </span>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <span className="text-blue-600 text-xs">View All</span>
          </div>

          <div className="bg-white rounded-2xl p-3 mt-4">
            <div className="border-b border-neutral-500/10 pb-3">
              <div className="flex gap-x-2">
                <div className="rounded-4xl">
                  <li className="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">
                    <BsGoogle />
                  </li>
                </div>
                <div className="flex justify-between flex-1 items-center">
                  <div>
                    <h5 className="font-semibold text-md">Google Ads</h5>
                    <p className="text-neutral-400 text-sm">Payment </p>
                  </div>
                  <div>
                    <h2 className="text-red-400 font-bold text-lg">-$200</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex gap-x-2">
                <div className="rounded-4xl">
                  <li className="list-none bg-orange-300 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-orange-400/30  ">
                    <GrAmazon />
                  </li>
                </div>
                <div className="flex justify-between flex-1 items-center">
                  <div>
                    <h5 className="font-semibold text-md">Amazon</h5>
                    <p className="text-neutral-400 text-sm">Shopping </p>
                  </div>
                  <div>
                    <h2 className="text-red-400 font-bold text-lg">-$900</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Send Money</h2>
            <span className="text-blue-600 text-xs">View All</span>
          </div>

          <div className=" mt-4 flex gap-x-4">
            <div className="people">
              <div className=""></div>
              <h4 className="text-center font-semibold mt-12 text-neutral-700 text-sm">
                Julia
              </h4>
            </div>
            <div className=" people">
              <div className=""></div>
              <h4 className="text-center font-semibold mt-12 text-neutral-700 text-sm">
                Monika
              </h4>
            </div>
            <div className="people">
              <div className=""></div>
              <h4 className="text-center font-semibold mt-12 text-neutral-700 text-sm">
                Shilpi
              </h4>
            </div>
            <div className="people">
              <div className=""></div>
              <h4 className="text-center font-semibold mt-12 text-neutral-700 text-sm">
                Shilpi
              </h4>
            </div>
          </div>
        </div>

        <div className="footer-height"></div>
      </div>

      <div className="footer">
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BiCard className="text-2xl " />
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BsFileBarGraph className="text-2xl " />
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <FiHome className="text-2xl " />
          <span className="text-center">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <MdPayment className="text-2xl " />
          <span className="text-center text-neutral-600">Cards</span>
        </li>
        <li className="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <HiOutlineLibrary className="text-2xl " />
          <span className="text-center text-neutral-600">Cards</span>
        </li>
      </div>
    </div>
  );
};

export default HomePage;