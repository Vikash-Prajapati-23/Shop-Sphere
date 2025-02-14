import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import Alert from "../Alert/Alert";

const Home = ({ setCartProductId, handleCartAddition }) => {
  return(
    <div>
      <Alert />
      <Carousel />
      <Products setCartProductId={setCartProductId} handleCartAddition={handleCartAddition} />
    </div>
  )
};
export default Home;
