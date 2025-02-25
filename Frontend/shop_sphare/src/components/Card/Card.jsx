import React, { useContext } from "react";
import "./Style/Card.css";
import Button from "../Button/Button";
import { themeContext } from "../../App";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../features/cartSlice";

const Card = ({
  product,
  id,
  title,
  image,
  price,
  category,
  rating,
  fetchSingleProduct,
  handleAddToCart, 
  handleWishlist, 
}) => {
  const toggleMode = useContext(themeContext);
  // const dispatch = useDispatch();

  return (
    <div className={`m-3 card-comp ${toggleMode.mode ? "dark-mode" : "light-mode"}`} onClick={fetchSingleProduct}>
      <div className="card card-style">
        <img
          src={image}
          style={{ height: "140px", objectFit: "scale-down" }}
          className="card-img-top my-2"
          alt="Image"
        />
        <div style={{ backgroundColor: toggleMode.mode === true ? "#2C2C2C" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="mb-1">Price = ${price}</p>
          <p className="mb-1">
            <span style={{ color: "gold", fontSize: "1.3rem" }}>★ </span>
            <span>{rating.rate}</span>
          </p>
          <p className="mb-1">Reviews {rating.count}</p>
          <div className="btns d-flex justify-content-between">
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                handleWishlist(product); // Pass the product object to the handleWishlist function
              }}
              className={"btn btn-success"}
              btnName={"Wishlist"}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                handleAddToCart(product); // Pass the product object to the handleAddToCart function
              }}
              className={"btn btn-success"}
              btnName={"Add to Cart"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
