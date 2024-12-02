import React from "react";
import "./Style/WishList.css";
import Card from '../Card/Card'

const WishList = ({ onClick, getData, addToWishlist }) => {
  return (
    <div className="card m-3">
      <h3>Your Wishlist</h3>
      {/* <span onClick={onClick}>&#10084;&#65039;</span> */}

      <Card
        addToWishlist
      />

      <div className="wishLists card m-3" onClick={onClick}></div>
    </div>
  );
};

export default WishList;
