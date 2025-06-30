"use clint";

import { useSingleProduct } from "@/ContextApi/SingleProductContex";
import React, { useState } from "react";

// icons 
import { IoIosArrowDown } from "react-icons/io";

const Description = () => {
  const { singleProduct, loading } = useSingleProduct();
  console.log("from line no 8", singleProduct);

  //  see more description functionality ------ >
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Split the description into words
  const fullDescription = singleProduct.description?.split(" ") || [];
  const shortDescription = fullDescription.slice(0, 1).join(" ");
  const loadMore = fullDescription.length > 1;

  return (
    <div className="bg-white p-[15px] rounded-[6px]">
      <h3 className="text-[#252B42] font-semibold text-[20px]">Description</h3>

      <div className="mt-[10px]">
        <p className="text-[#475569] text-[16px] leading-[1.6]">
      {showFullDescription ? singleProduct.description : `${shortDescription}...`}
    </p>

        {loadMore && (
          <button
            className="text-[#252B42] mt-2 text-[15px] font-medium text-center flex gap-[5px] items-center mx-auto"
            onClick={() => setShowFullDescription((prev) => !prev)}
          > 
            {loadMore ? "See Less" : "See More"}
            <IoIosArrowDown className="mt-[4px]"></IoIosArrowDown>
          </button>
        )}
      </div>
    </div>
  );
};

export default Description;