import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import Alert from "../Alert/Alert";

const Home = ({ setCartProductId, handleCartAddition, handleCartDeletion }) => {
  return(
    <div>
      <Carousel />
      <Products setCartProductId={setCartProductId} handleCartAddition={handleCartAddition} handleCartDeletion={handleCartDeletion} />
    </div>
  )
};
export default Home;
