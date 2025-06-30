import React from "react";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import SearchBar from "../Components/SearchBar/SearchBar";
import MyCart from "./CartPageComponents/MyCart";

const AddToCartPage = () => {
  return (
    <div>
      <div>
        <SearchBar></SearchBar>
      </div>
      <div>
        <Navigation></Navigation>
      </div>
      <div className="px-[50px] py-[15px]">
        <MyCart></MyCart>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AddToCartPage;
