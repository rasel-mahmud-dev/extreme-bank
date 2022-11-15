import { Component } from "solid-js/types/server";
import "./style.scss";

import {BiRegularCard, BiSolidBell, BiSolidThermometer, BiSolidUser} from "solid-icons/bi";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineReload,
} from "solid-icons/ai";
import {FaBrandsAmazon, FaSolidG, FaSolidMoneyBill} from "solid-icons/fa";
import {BsFileBarGraph} from "solid-icons/bs";
import {FiHome} from "solid-icons/fi";
import {RiFinanceSecurePaymentFill, RiSystemMenu4Line} from "solid-icons/ri";
import {Link} from "@solidjs/router";

const HomePage: Component = () => {
  return (
    <div>
      
      <div class="home-hero p-3">
        <div class="flex justify-between items-center">
          <div class="text-gray-300 font-medium">
            <p class="text-xs font-bold">Sunday 13 November</p>
            <h3 class="text-gray-50 text-2xl font-bold">Welcome</h3>
          </div>
          <div class="flex items-center gap-x-3">
            <li class="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <BiSolidThermometer />
            </li>
            <li class="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <BiSolidBell />
            </li>
            <li class="list-none w-max p-5 text-white flex items-center justify-center text-xl w-12 h-12  rounded-3xl bg-white/30 icon-shadow">
              <Link href="/login"><BiSolidUser /></Link>
            </li>
          </div>
        </div>

        <div class="box flex items-center justify-center">
          <h1>Slider 1</h1>
        </div>

        <div class="flex items-center justify-between mt-6">
          <div class="flex flex-col justify-center items-center">
            <li class="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
            <div class="w-10 h-10 border-2 text-amber-400 border-amber-400 rounded-full flex items-center justify-center ">
              <AiOutlineArrowUp class="" />
            </div>
          </li>
          <span class="text-center font-medium inline-block text-sm mt-2">Transfer</span>
          </div>
        <div class="flex flex-col justify-center items-center">
            <li class="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
            <div class="w-10 h-10 border-2 text-green-400 border-green-400 rounded-full flex items-center justify-center ">
              <AiOutlineArrowDown class="" />
            </div>
          </li>
          <span class="text-center font-medium inline-block text-sm mt-2">Request</span>
        </div>
          <div class="flex flex-col justify-center items-center">
            <li class="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
            <div class="w-10 h-10 border-2 text-blue-400 border-blue-400 rounded-full flex items-center justify-center ">
              <AiOutlineReload class="" />
            </div>
          </li>
          <span class="text-center font-medium inline-block text-sm mt-2">Exchange</span>
          </div>
          <div class="flex flex-col justify-center items-center">
            <li class="list-none w-max p-5 text-neutral-900 flex items-center justify-center text-xl w-20 h-20  rounded-3xl bg-white icon-shadow">
            <div class="w-10 h-10 border-2 text-neutral-500 border-neutral-500 rounded-full flex items-center justify-center ">
              <FaSolidMoneyBill class="" />
            </div>
          </li>
          <span class="text-center font-medium inline-block text-sm mt-2">Bills</span>
          </div>
        </div>

        <div class="mt-10">
          <div class="flex justify-between items-center">
            <h2 class="text-base font-semibold">Recent Activity</h2>
            <span class="text-blue-600 text-xs">View All</span>
          </div>

          <div class="bg-white rounded-2xl p-3 mt-4">
            <div class="border-b border-neutral-500/10 pb-3">
              <div class="flex gap-x-2">
                <div class="rounded-4xl">
                  <li class="list-none bg-red-400 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-red-500/30  ">
                    <FaSolidG />
                  </li>
                </div>
                <div class="flex justify-between flex-1 items-center">
                  <div>
                    <h5 class="font-semibold text-md">Google Ads</h5>
                    <p class="text-neutral-400 text-sm">Payment </p>
                  </div>
                  <div>
                    <h2 class="text-red-400 font-bold text-lg">-$200</h2>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div class="flex gap-x-2">
                <div class="rounded-4xl">
                  <li class="list-none bg-orange-300 w-max p-5 text-2xl rounded-2xl text-white shadow-lg shadow shadow-orange-400/30  ">
                    <FaBrandsAmazon />
                  </li>
                </div>
                <div class="flex justify-between flex-1 items-center">
                  <div>
                    <h5 class="font-semibold text-md">Amazon</h5>
                    <p class="text-neutral-400 text-sm">Shopping </p>
                  </div>
                  <div>
                    <h2 class="text-red-400 font-bold text-lg">-$900</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="mt-10">
          <div class="flex justify-between items-center">
            <h2 class="text-base font-semibold">Send Money</h2>
            <span class="text-blue-600 text-xs">View All</span>
          </div>

          <div class=" mt-4 flex gap-x-4">
            
           <div class="people">
              <div class="">
            </div>
            <h4 class="text-center font-semibold mt-12 text-neutral-700 text-sm">Julia</h4>
           </div>
            <div class=" people">
              <div class="">
            </div>
            <h4 class="text-center font-semibold mt-12 text-neutral-700 text-sm">Monika</h4>
           </div>
            <div class="people">
              <div class="">
            </div>
            <h4 class="text-center font-semibold mt-12 text-neutral-700 text-sm">Shilpi</h4>
           </div>
            <div class="people">
              <div class="">
            </div>
            <h4 class="text-center font-semibold mt-12 text-neutral-700 text-sm">Shilpi</h4>
           </div>
          </div>
        </div>
        
      <div class="footer-height"></div>
      </div>
      
      
      <div class="footer">
        <li class="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BiRegularCard class="text-2xl " />
          <span class='text-center text-neutral-600'>Cards</span>
        </li>
        <li class="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <BsFileBarGraph class="text-2xl " />
          <span class='text-center text-neutral-600'>Cards</span>
        </li>
        <li class="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <FiHome  class="text-2xl "/>
          <span class='text-center'>Cards</span>
        </li>
        <li class="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <RiFinanceSecurePaymentFill  class="text-2xl "/>
          <span class='text-center text-neutral-600'>Cards</span>
        </li>
        <li class="list-none flex justify-center flex-col items-center text-neutral-500 text-sm">
          <RiSystemMenu4Line  class="text-2xl "/>
          <span class='text-center text-neutral-600'>Cards</span>
        </li>
      </div>
      
    </div>
  );
};

export default HomePage;