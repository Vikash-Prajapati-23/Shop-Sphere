import React, { useContext } from "react";
import "./Style/Card.css";
import Button from "../Button/Button";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../features/cartSlice";

const Card = ({
  product,
  title,
  image,
  price,
  rating,
  fetchSingleProduct,
  handleAddToCart, 
  handleWishlist, 
}) => {
  // const dispatch = useDispatch();

  return (
    <div className={`mx-lg-3 card-comp`} onClick={fetchSingleProduct}>
      <div className="card card-style">
        <img
          src={image}
          className="card-img-top my-2"
          alt="Image"
        />
        <div className="card-area">
          <h5 className="card-title-text-size">{title ? title.slice(0, 17) : "No Title."}...</h5>
          <p className="mb-1 fw-semibold form-text-size"> ${price}</p>
          <p className="mb-1 form-text-size">
            <span style={{ color: "gold", fontSize: "1.3rem" }}>★ </span>
            <span>{rating.rate}</span>
          </p>
          <p className="mb-1 fw-semibold form-text-size">Reviews {rating.count}</p>
          <div className="btns d-flex justify-content-between">
            {/* <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                handleWishlist(product);
              }}
              className={"btn btn-success form-text-size"}
              btnName={"Wishlist"}
            /> */}
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                handleAddToCart(product); // Pass the product object to the handleAddToCart function
              }}
              className={"btn btn-success form-text-size"}
              btnName={"Add to Cart"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
