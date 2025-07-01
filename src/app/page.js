"use client";
import React from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import Navigation from "./Components/Navigation/Navigation";
import ProductCard from "./Components/ProductCard/ProductCard";
import { useProducts } from "@/ContextApi/AllProductsContext";
import Description from "./Components/Description/Description";
import Specification from "./Components/Specification/Specification";
import Footer from "./Components/Footer/Footer";
import RelevantProducts from "./Components/RelevantProducts/RelevantProducts";

const ProductPage = () => {
  const { allProducts, loading } = useProducts([]);

  return (
    <div className="">
      <div>
        <SearchBar></SearchBar>
      </div>

      <div>
        <Navigation></Navigation>
      </div>

      <div>
        <ProductCard></ProductCard>
      </div>

      <div className="mt-[20px] md:px-[50px] px-[20px]">
        <Description></Description>
      </div>

      <div className="mt-[20px] md:px-[50px] px-[20px] mb-[80px]">
        <Specification></Specification>
      </div>

      <div className="mt-[20px] md:px-[50px] px-[20px] mb-[20px]">
        <RelevantProducts></RelevantProducts>
      </div>

      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ProductPage;