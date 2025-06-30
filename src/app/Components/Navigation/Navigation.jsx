"use client";
import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname(); // /add-to-cart
  const current =
    pathname.split("/").filter(Boolean).pop() || "Product Details";
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Home Appliances" },
    { id: 3, name: "Mother & Baby" },
    { id: 4, name: "Automotive" },
    { id: 5, name: "Sports Gear" },
  ];

  return (
    <div>
      {/* Navigation Bar */}

      <div className="flex items-center w-full gap-[10px] bg-[#fff] shadow-md py-[10px] px-[50px]">
        <div className="border-e-[1.5px] py-[2px] border-[#dbdbdb] w-[15%] flex items-center gap-[5px]">
          <div className="text-[24px]">
            <HiOutlineBars3 className="text-[#00A788] pt-[1px]" />
          </div>
          <div>
            <p className="text-[20px] font-medium">Categories</p>
          </div>
        </div>
        <div className="w-[55%] ps-[10px] pe-[50px]">
          <ul className="flex justify-between">
            {categories.map((category) => (
              <li key={category.id} className="py-1 text-gray-700">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[35%] flex justify-evenly gap-[20px]">
          <div className="flex items-center gap-[8px]">
            <BsBoxSeam className="text-[#00A788] text-[18px]"></BsBoxSeam>
            <p className="text-[15px]">TRACK ORDER</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <MdOutlineHeadsetMic className="text-[#00A788] text-[18px]"></MdOutlineHeadsetMic>
            <p className="text-[15px]">HELP CENTER</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <BsShop className="text-[#00A788] text-[18px]"></BsShop>
            <p className="text-[15px]">SELL WITH US</p>
          </div>
        </div>
      </div>

      {/* Path indicator */}

      <div className="px-[50px] py-[10px] flex items-center gap-[5px]">
        <p>Home</p>
        <span className="pt-[3px]">
          <IoIosArrowForward></IoIosArrowForward>
        </span>
        <p className="capitalize">{current.replace(/-/g, " ")}</p>
      </div>
    </div>
  );
};

export default Navigation;
