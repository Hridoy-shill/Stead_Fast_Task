"use client";
import React, { useEffect, useState } from "react";
import falconIcon from "../../../../public/assets/falcon.svg";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Link from "next/link";

const SearchBar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };

    getCartCount();

    window.addEventListener("cart-updated", getCartCount);

    return () => window.removeEventListener("cart-updated", getCartCount);
  }, []);

  return (
    <div className="bg-[#0f172a] text-white px-5 md:px-[50px] py-4 md:py-[20px]">
      {/* Desktop Search Bar (visible on md and up) */}
      <div className="hidden md:flex flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-0">
        <Link href={"/"} className="flex gap-2 items-center flex-shrink-0">
          <Image src={falconIcon} alt="Falcon Icon" width={24} height={24} />
          <div className="text-2xl md:text-[28px] font-semibold text-white">
            FALCON
          </div>
        </Link>

        <div className="flex-grow w-full md:max-w-2xl">
          <div className="flex rounded-md overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search for anything..."
              className="flex-grow px-4 py-3 text-gray-800 focus:outline-none bg-white"
            />
            <button className="bg-teal-500 px-4 flex items-center justify-center">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          <Link href="/cart" className="relative inline-block">
            <MdOutlineShoppingCart className="text-2xl md:text-[30px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#fc3838] text-white font-semibold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div>
            <IoMdPerson className="text-2xl md:text-[30px]" />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Placeholder (visible on small screens) */}
      <div className="block md:hidden text-center py-2">
        <div className="flex justify-between items-center">
          <div>
            <Link href={"/"} className="flex gap-2 items-center flex-shrink-0">
              <Image
                src={falconIcon}
                alt="Falcon Icon"
                width={24}
                height={24}
              />
              <div className="text-2xl md:text-[28px] font-semibold text-white">
                FALCON
              </div>
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <Link href="/cart" className="relative inline-block">
                <MdOutlineShoppingCart className="text-2xl md:text-[30px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#fc3838] text-white font-semibold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div>
                <IoMdPerson className="text-2xl md:text-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex rounded-md overflow-hidden shadow-md mt-[10px] md:hidden">
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-grow px-4 py-3 text-gray-800 focus:outline-none bg-white"
          />
          <button className="bg-teal-500 px-4 flex items-center justify-center">
            <FaSearch className="text-white text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
