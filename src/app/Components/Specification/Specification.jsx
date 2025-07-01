"use client";

import { useSingleProduct } from "@/ContextApi/SingleProductContex";
import React, { useState } from "react";

// icons
import { IoIosArrowDown } from "react-icons/io";

const Specification = () => {
  const { singleProduct, loading } = useSingleProduct();

  // Group unique attribute values by attribute name
  const specsMap = {};

  if (singleProduct?.variations) {
    singleProduct.variations.forEach(variation => {
      variation.variation_attributes.forEach(attr => {
        const name = attr.attribute.name;
        const value = attr.attribute_option.attribute_value;
        if (!specsMap[name]) specsMap[name] = new Set();
        specsMap[name].add(value);
      });
    });
  }

  // Convert to array for rendering
  const specs = Object.entries(specsMap).map(([name, valuesSet]) => ({
    name,
    values: Array.from(valuesSet),
  }));

  const [showFullSpecification, setShowFullSpecification] = useState(false);

  const initialShowCount = 1;
  const visibleSpecs = showFullSpecification ? specs : specs.slice(0, initialShowCount);

  return (
    <div className="bg-white p-[15px] rounded-[6px]">
      <h3 className="text-[#252B42] font-semibold text-[20px]">Specification</h3>

      <div className="mt-[10px]">
        <ul className="list-disc list-inside text-[#475569] text-[16px] leading-[1.6] space-y-1">
          {visibleSpecs.map(spec => (
            <li key={spec.name}>
              <span className="font-medium">{spec.name}:</span> {spec.values.join(", ")}
            </li>
          ))}
        </ul>

        {specs.length > initialShowCount && (
          <button
            className="text-[#252B42] mt-2 text-[15px] font-medium text-center flex gap-[5px] items-center mx-auto"
            onClick={() => setShowFullSpecification(prev => !prev)}
          >
            {showFullSpecification ? "See Less" : "See More"}
            <IoIosArrowDown className="mt-[4px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Specification;
