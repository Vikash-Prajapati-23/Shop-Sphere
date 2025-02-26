import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";

const Home = ({ setCartProductId, handleCartAddition, handleCartDeletion,  handleWishList, query }) => {
  return(
    <div>
      <Carousel />
      <Products setCartProductId={setCartProductId} handleCartAddition={handleCartAddition} handleCartDeletion={handleCartDeletion}  handleWishList={handleWishList} query={query} />
    </div>
  )
};
export default Home;
