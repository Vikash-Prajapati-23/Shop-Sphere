import React from "react";
import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";

const Home = ({
  handleCartAddition,
  handleCartDeletion,
  handleRemoveWishlist,
  handleWishList,
  setClicked,
  clicked,
  isLoggedIn,
  query,
  cart,
  setCart,
}) => {
  return (
    <div>
      <Carousel />
      <Products
        isLoggedIn={isLoggedIn}
        handleCartAddition={handleCartAddition}
        handleCartDeletion={handleCartDeletion}
        handleWishList={handleWishList}
        handleRemoveWishlist={handleRemoveWishlist}
        setClicked={setClicked}
        clicked={clicked}
        query={query}
        cart={cart}
        setcart={setCart}
      />
    </div>
  );
};
export default Home;
