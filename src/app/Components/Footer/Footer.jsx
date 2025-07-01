import Image from "next/image";
import React from "react";
import falconIcon from "../../../../public/assets/falcon.svg";
import paymentIcons from "../../../../public/assets/Frame 1618874028.svg";
import downloadApp from "../../../../public/assets/Frame 5859.svg";
import helpline from "../../../../public/assets/Frame 1618874029.svg";

// icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#ffff] py-8">
      <div className="">
        <div className="md:px-[50px] px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex gap-[10px] items-center">
                <div>
                  <Image
                    src={falconIcon}
                    alt="Falcon Icon"
                    width={24}
                    height={24}
                    className="pt-[2px]"
                  />
                </div>
                <div className="text-[28px] font-semibold text-[#ffff]">
                  FALCON
                </div>
              </div>
              <p className="text-sm">
                Experience our new platform & Enjoy
                <br />
                exiting deals and offers on your day to
                <br />
                day.
              </p>

              <div className="text-sm space-y-3">
                <div className="flex items-center gap-[8px]">
                  <FaLocationDot className="bg-[#ffff] text-[#0F172A] w-[40px] h-[30px] p-[5px] rounded-full"></FaLocationDot>
                  <p>House #64, Road 13, ASA Center, Uttam, Dhaka-1402</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoIosCall className="bg-[#ffff] text-[#0F172A] w-[30px] h-[30px] p-[5px] rounded-full"></IoIosCall>
                  <p>01729-1487201</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <MdEmail className="bg-[#ffff] text-[#0F172A] w-[30px] h-[30px] p-[5px] rounded-full"></MdEmail>
                  <p>falcon@gmail.com</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="font-bold mb-4">ABOUT</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cancellation & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold mb-4">HELP</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Payments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    My Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Download App */}
            <div className="flex flex-col md:items-end md:text-right">
              <h4 className="font-bold mb-4">Need Support?</h4>

              <div className="space-y-4">
                <Image
                  src={helpline}
                  alt="Falcon Icon"
                  width={150}
                  height={150}
                  className="pt-[2px]"
                />
              </div>

              <div className="mt-6">
                <h5 className="font-medium mb-2">DOWNLOAD APP</h5>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Image
                    src={downloadApp}
                    alt="Falcon Icon"
                    width={150}
                    height={150}
                    className="pt-[2px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex justify-between items-center space-x-4 pt-[15px]">
            <div className="md:flex items-center gap-[10px]">
              <span className="font-medium">Follow us on</span>
              <div className="flex space-x-3 pt-[4px]">
                <a href="#" className="hover:text-blue-600">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-pink-600">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-blue-700">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="md:flex items-center md:gap-[15px]">
              <span className="font-medium text-[16px] text-[#94A3B8]">
                PAYMENTS ACCEPTED
              </span>
              <div className="flex md:space-x-3">
                <Image
                  src={paymentIcons}
                  alt="Falcon Icon"
                  width={300}
                  height={300}
                  className="pt-[2px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 md:mt-8 pt-6 text-sm text-center">
          <p>Falcon @2025. Design by yqr</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
