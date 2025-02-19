import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Style/WishList.css";
import Card from '../Card/Card'

const WishList = ({ cart, setCart }) => {

  return (
    <div className="wishlist-container bg-light my-5">
      <h3 className="pt-4" >Your Wishlist</h3>
      <div>
        {cart.length === 0 ? <div className={"d-flex justify-content-center align-items-center"} >
          <img src={"./images/wish.gif"} alt="image" ></img>
          <h4>You havn't added anything to your wishlist.!</h4>
        </div> : (
          <div className="card" key={cart.id}>
            {cart?.map((product) => {
              <Card
                title={product ? product.title.slice(0, 20) : "No Title."}
                id={product.id}
                image={product.image}
                price={product.price}
                rating={product.rating}
              />
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
