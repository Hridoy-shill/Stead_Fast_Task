"use client";
import React, { useEffect, useState } from "react";

// icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import Image from "next/image";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.discount_price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    Swal.fire({
      title: "Thank You So Much For Review The Project",
      icon: "success",
      confirmButtonText: "OK",
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="bg-[#f1f5f9] md:flex gap-[20px]">

      {/* cart items Section */}
      <div className="md:w-[70%] w-full bg-white p-[20px] rounded-[6px]">
        <div className="md:flex justify-between border-b-[1.5px] border-[#dedede] md:pb-[20px] pb-[10px] pe-[5px]">
          <h1 className="text-2xl font-bold text-[#0F172A]">
            My Cart ({cartItems.length})
          </h1>
          <div className="flex items-center gap-[25px] md:mt-[0px] mt-[10px]">
            <div className="flex items-center gap-[5px]">
              <MdCheckBoxOutlineBlank className="text-[#a3aab4] text-[22px]"></MdCheckBoxOutlineBlank>
              <p className="text-[#707070]">Select All</p>
            </div>
            <div>
              <p className="text-[#707070]">clear All</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg mt-[15px]">
          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="bg-[#f1f5f9] mt-[10px] px-[10px] py-[5px] flex items-center gap-[15px] mb-[10px]">
                <MdCheckBoxOutlineBlank className="text-[#707070] text-[22px]"></MdCheckBoxOutlineBlank>
                <div className="flex items-center gap-[3px]">
                  <AiOutlineShop className="text-[#707070] text-[20px]"></AiOutlineShop>
                  <p className="text-[#707070]">BD FASHION HOUSE</p>
                  <IoIosArrowForward className="text-[#707070] text-[12px] mt-[3px]"></IoIosArrowForward>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <div>
                  <MdCheckBoxOutlineBlank className="text-[#707070] text-[22px]"></MdCheckBoxOutlineBlank>
                </div>
                <Image
                  src={item.image}
                  alt="product"
                  width={96}
                  height={96}
                  className="rounded border border-black object-cover"
                />
                <div className="flex-1">
                  <div className="md:flex items-center">
                    <div>
                      <h2 className="font-semibold text-lg">
                        Bestway Brand Air Inflatable 5 In 1 semi Double Sofa
                      </h2>
                      <p className="text-gray-600 text-[16px] my-[5px]">
                        {item.variation_attributes
                          .map(
                            (attr) =>
                              `${attr.attribute.name.toLowerCase()}: ${
                                attr.attribute_option.attribute_value
                              }`
                          )
                          .join(", ")}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-bold text-lg text-black flex gap-[2px] items-center">
                        <FaBangladeshiTakaSign className="text-[16px]" />{" "}
                        {item.discount_price}
                      </p>
                      <p className="line-through text-sm text-gray-400 flex gap-[2px] items-center">
                        <FaBangladeshiTakaSign className="text-[12px]" />{" "}
                        {item.regular_price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px] mt-2">
                    <div className="flex justify-around items-center text-center py-[5px] border border-[#b4b4b4] rounded-full md:w-1/4 w-3/5 px-[5px]">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="bg-[#f1f5f9] w-full rounded-full cursor-pointer"
                      >
                        <p className="text-[18px] font-bold text-[#757575]">
                          -
                        </p>
                      </button>
                      <div className="w-full text-center font-bold">
                        {item.quantity}
                      </div> 
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="bg-[#f1f5f9] w-full rounded-full cursor-pointer"
                      >
                        <p className="text-[18px] font-bold text-[#757575]">
                          +
                        </p>
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-gray-400 md:ml-4 hover:text-red-500 mt-[5px]"
                    >
                      <RiDeleteBin5Line className="text-[20px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* order summary Section */}
      <div className="md:w-[30%] w-full md:px-0 px-[10px] md:mt-0 mt-[10px]">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Order summary</h2>
          <div className="flex justify-between mb-2">
            <p>Price ({cartItems.length} items)</p>
            <p className="text-[18px] font-semibold flex gap-[2px] items-center">
              {" "}
              <FaBangladeshiTakaSign className="text-[16px]"></FaBangladeshiTakaSign>{" "}
              {subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping fee</span>
            <span className="text-blue-500 cursor-pointer text-sm">
              To be added
            </span>
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Store / Falcon coupon"
              className="border border-r-0 border-[#d8d8d8] px-3 py-2 rounded-l text-sm flex-grow focus:outline-none"
            />
            <button className="bg-[#00B795] text-white px-4 py-2 rounded-r">
              Apply
            </button>
          </div>

          <div className="flex justify-between font-bold mb-4">
            <span>Sub Total</span>
            <p className="flex gap-[2px] items-center">
              <FaBangladeshiTakaSign className="text-[16px]"></FaBangladeshiTakaSign>
              {subtotal.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#00B795] text-white py-2 rounded font-semibold cursor-pointer"
          >
            Proceed to Checkout
          </button>

          <div className="mt-4 text-sm text-gray-500">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-[5px]"
              />

              <span>
                I have read and agree to the Terms and Conditions, Privacy
                Policy and Refund and Return Policy
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
