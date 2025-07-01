"use client";
import { useSingleProduct } from "@/ContextApi/SingleProductContex";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ShopLogo from "../../../../public/assets/Ellipse 2010.svg";
import SellerBadge from "../../../../public/assets/Group 1010108421.svg";
import VerifyBadge from "../../../../public/assets/fi_9918743.svg";
import Swal from 'sweetalert2';

// star rating
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// icons
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { GrShareOption } from "react-icons/gr";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const ProductCard = () => {
  const { singleProduct, SingleLoading } = useSingleProduct();
  console.log(singleProduct);

  // variations State
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    if (!SingleLoading && singleProduct?.variations) {
      setVariations(singleProduct.variations);
    }
  }, [singleProduct, SingleLoading]);

  const [selected, setSelected] = useState({
    variant: null,
    color: null,
  });

  // Get unique variants and colors for specific product
  const variants = [
    ...new Set(
      variations
        .map(
          (v) => v.variation_attributes?.[0]?.attribute_option?.attribute_value
        )
        .filter(Boolean)
    ),
  ];

  const colors = [
    ...new Set(
      variations
        .map(
          (v) => v?.variation_attributes?.[1]?.attribute_option?.attribute_value
        )
        .filter(Boolean)
    ),
  ];

  const handleSelect = (type, value) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  // get specific product functionality for add to cart ------ >

  // Find matched variation whenever selection changes

  // find the matched variation and color matched product
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selected.variant && selected.color) {
      const match = variations.find((v) => {
        const attrs = v.variation_attributes || [];
        const attr1 = attrs[0]?.attribute_option?.attribute_value;
        const attr2 = attrs[1]?.attribute_option?.attribute_value;
        return attr1 === selected.variant && attr2 === selected.color;
      });
      setSelectedProduct(match || null);
    } else {
      setSelectedProduct(null);
    }
  }, [selected, variations]);

  // select quantity functionality for add to cart --------- >
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // image functionality ---------------- >
  const galleryImages = singleProduct?.image
    ? Object.values(singleProduct.image).map((img) => img.url)
    : [];

  const thumbnail = singleProduct?.thumbnail;

  // Combine both thumbnail + gallery images
  const allImages = [thumbnail, ...galleryImages].filter(Boolean);
  const [mainImage, setMainImage] = useState("");

  // Set default main Image
  useEffect(() => {
    if (!mainImage && allImages.length > 0) {
      setMainImage(allImages[0]);
    }
  }, [allImages, mainImage]);

  // Filter out the current main image from thumbnails
  const filteredThumbnails = allImages.filter((img) => img !== mainImage);

  if (SingleLoading) return <p className="p-5">Image Loading...</p>;

  // Add to cart functionality --------- >

const handleAddToCart = () => {
  if (!selectedProduct) {
    alert("Please Select the variant and color");
    return;
  }

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const productId =
    selectedProduct.id || selectedProduct.slug || selectedProduct.name;

  const existingItemIndex = existingCart.findIndex(
    (item) => item.id === productId
  );

  if (existingItemIndex > -1) {
    existingCart[existingItemIndex].quantity = quantity;
  } else {
    existingCart.push({
      ...selectedProduct,
      id: productId,
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  // ✅ Trigger custom cart update event
  window.dispatchEvent(new Event("cart-updated"));

  // ✅ Show success message with SweetAlert
  Swal.fire({
    title: "Product Added Successfully",
    icon: "success",
    confirmButtonText: "OK",
    timer: 1500,
    showConfirmButton: false,
    timerProgressBar: true,
  }).then(() => {
    // ✅ Reload the page after popup closes
    window.location.reload();
  });
};

  return (
    <div className="bg-white px-[50px] py-[15px] lg:flex justify-between gap-[30px]">
      {/* Image Gallery Section */}
      <div className="lg:w-[30%] flex flex-col items-start gap-4">
        {/* Main Image */}
        {mainImage && (
          <div className="relative w-full h-[350px] border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt="Main Product Image"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex gap-2 mt-2 flex-wrap">
          {filteredThumbnails.map((thumbUrl, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(thumbUrl)}
              className={`relative lg:w-[80px] h-[80px] border shadow-md rounded-md cursor-pointer hover:scale-105 transition ${
                mainImage === thumbUrl ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={thumbUrl}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 80px, 80px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Product Section */}
      <div className="lg:w-[43%]">
        <div>
          <h3 className="text-[24px] font-semibold">{singleProduct?.name}</h3>
        </div>

        <div className="flex justify-between items-center gap-[20px] mt-[15px]">
          <div className="w-full flex items-center gap-[15px]">
            <div className="">
              <p className="text-[16px] font-semibold text-[#757575]">
                {singleProduct?.rating_count}
              </p>
            </div>
            <div>
              <Rating
                style={{ maxWidth: 100 }}
                value={singleProduct?.rating_avg}
                readOnly
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <p className="text-[16px] font-semibold text-[#757575]">
                {singleProduct?.total_stock_qty}
              </p>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-[20px] pe-[20px]">
            <div>
              <AiOutlineHeart className="text-[28px] text-[#757575]" />
            </div>
            <div>
              <GrShareOption className="text-[24px] text-[#757575]" />
            </div>
          </div>
        </div>

        <div className="mt-[15px] flex items-start gap-[15px]">
          <div className="flex items-center gap-[1px]">
            <FaBangladeshiTakaSign className="text-[20px] text-[#00c29e]" />
            <p className="text-[20px] font-semibold text-[#00c29e]">
              {selectedProduct?.discount_price ||
                singleProduct?.product_detail?.discount_price}
            </p>
          </div>

          <div className="relative inline-flex items-center text-[#757575]">
            <div className="flex items-center">
              <FaBangladeshiTakaSign className="text-[14px] text-[#757575]" />
              <p className="text-[14px]">
                {selectedProduct?.regular_price ||
                  singleProduct?.product_detail?.regular_price}
              </p>
            </div>
            <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#757575] -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center mt-[15px]">
          <div className="text-[#6b7280] text-sm font-medium">Promotion</div>
          <div className="relative bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold px-3 py-1 ml-2 pr-6">
            Min. spend ৳550
            <div className="absolute right-0 top-0 w-0 h-0 border-t-[16px] border-t-transparent border-r-[10px] border-r-[white] border-b-[16px] border-b-transparent"></div>
          </div>
        </div>

        <div className="mt-[15px]">
          <div className="space-y-[5px]">
            <p className="text-[18px] font-semibold text-[#757575]">
              Variant :
            </p>
            <div className="flex flex-wrap gap-2">
              {variants.map((value, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect("variant", value)}
                  className={`px-2 py-1 text-[15px] font-semibold text-[#000000] rounded 
                ${
                  selected.variant === value
                    ? "border shadow border-[#00a788]"
                    : "border shadow border-[#dfdfdf]"
                }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-[5px] mt-[15px]">
            <p className="text-[18px] font-semibold text-[#757575]">Colors:</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((value, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect("color", value)}
                  className={`px-2 py-1 text-[15px] font-semibold text-[#000000] rounded 
                ${
                  selected.color === value
                    ? "border shadow border-[#00a788]"
                    : "border shadow border-[#dfdfdf]"
                }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[15px]">
          <p className="text-[18px] font-semibold">Quantity : </p>

          <div className="flex justify-around items-center text-center py-[5px] border border-[#b4b4b4] rounded-full w-1/4 px-[5px] mt-[10px]">
            <button
              onClick={decrement}
              className="bg-[#f1f5f9] w-full rounded-full cursor-pointer"
            >
              <p className="text-[18px] font-bold text-[#757575]">-</p>
            </button>
            <div className="w-full">{quantity}</div>
            <button
              onClick={increment}
              className="bg-[#f1f5f9] px-[2px] w-full rounded-full cursor-pointer"
            >
              <p className="text-[18px] font-bold text-[#757575]">+</p>
            </button>
          </div>
        </div>

        <div>
          <button
            className="w-3/4 mt-[20px] text-center bg-[#00a788] text-white py-[5px] rounded-[4px] cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="lg:w-[27%] space-y-[20px]">
        <div className="border border-[#e4e4e4] rounded-[10px] p-[15px]">
          <h3 className="text-[18px] font-semibold text-[#757575]">
            Delivery Option
          </h3>
          <div className="flex gap-[10px] mt-[15px]">
            <BsBoxSeam className="text-[20px] text-[#00a788] font-[8px] mt-[3px]" />
            <div>
              {" "}
              <p className="text-[16px] font-semibold">Regular</p>
              <p className="text-[14px] text-[#757575]">
                Delivery within 2-3 days
              </p>
            </div>
          </div>

          <div className="flex gap-[10px] mt-[15px] opacity-45">
            <FaTruckFast className="text-[20px] text-[#757575] font-[8px] mt-[3px]" />
            <div>
              {" "}
              <p className="text-[16px] font-semibold">
                Express{" "}
                <span className="text-[12px] text-[#f87171] ps-[5px]">
                  Not Available
                </span>
              </p>
              <p className="text-[14px] text-[#757575]">
                Delivery within 24 Hours
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#e4e4e4] rounded-[10px] p-[15px]">
          <h3 className="text-[18px] font-semibold text-[#757575]">Sold by</h3>

          <div className="flex items-center mt-[10px]">
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <Image
                src={ShopLogo}
                alt="Shop Logo"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </div>

            {/* Shop Name + Badges */}
            <div className="flex flex-col">
              <div className="flex items-center gap-[6px]">
                <p className="text-sm font-semibold text-[#64748b] px-[6px] py-[2px] rounded-sm">
                  {singleProduct?.merchant?.shop_name}
                </p>
                <Image
                  src={VerifyBadge}
                  alt="Verified"
                  width={20}
                  height={20}
                />
              </div>
              <div className="mt-[4px]">
                <Image
                  src={SellerBadge}
                  alt="Seller Badge"
                  width={100}
                  height={30}
                />
              </div>
            </div>
          </div>

          <div className="mt-[15px] flex items-center gap-[15px]">
            <div className="flex items-center bg-[#e6f8f4] gap-[5px] px-[15px] py-[5px] rounded-[6px] w-full">
              <IoChatbubbleEllipsesOutline className="text-[#39bba3]" />
              <p className="text-[#39bba3]">Chat Now</p>
            </div>

            <div className="flex items-center bg-[#f1f5f9] gap-[5px] px-[15px] py-[5px] rounded-[6px] w-full">
              <p className="text-[#87919f]">View Shop</p>
            </div>
          </div>

          <div className=" flex justify-around mt-[15px] pt-[10px] border-t-1 border-[#e4e4e4]">
            <div className="text-center">
              <p className="text-[13px] font-semibold text-[#64748b]">
                Ship on Time
              </p>
              <p className="text-[28px] font-semibold text-[#64748b]">100%</p>
            </div>

            <div className="text-center">
              <p className="text-[13px] font-semibold text-[#64748b]">
                Chat Response
              </p>
              <p className="text-[28px] font-semibold text-[#64748b]">90%</p>
            </div>

            <div className="text-center">
              <p className="text-[13px] font-semibold text-[#64748b]">
                Shop Rating
              </p>
              <p className="text-[28px] font-semibold text-[#64748b]">99.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
