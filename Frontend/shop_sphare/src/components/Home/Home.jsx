import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import Alert from "../Alert/Alert";

const Home = () => {
  return(
    <div>
      <Alert />
      <Carousel />
      <Products />
    </div>
  )
};
export default Home;
