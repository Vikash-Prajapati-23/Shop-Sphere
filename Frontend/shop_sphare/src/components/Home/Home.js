import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";

export const Home = () => {
  
  return(
    <div>
      <Carousel />
      <Products />
    </div>
  )
};
export default Home;
