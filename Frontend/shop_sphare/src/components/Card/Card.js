import React from "react";
import "./Style/Card.css";
import Button from "../Button/Button";

const Card = ({
  title,
  description,
  image,
  id,
  price,
  category,
  rating,
  // getData,
  showAlert,
  type,
  fetchSingleProduct,
  fetchWishlistProduct,
}) => {
  // let {title, description, image, id, price, category, rating, getData} = props;

  return (
    <div className="m-3 card-comp" onClick={fetchSingleProduct}>
      <div className="card card-style">
        <div className="text-center m-2">{category}</div>
        <img
          src={image}
          style={{ height: "140px", objectFit: "scale-down" }}
          className="card-img-top "
          alt="Image"
        />
        <div className="card-body">
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
                showAlert("Added to Wishlist!", "success");
                fetchWishlistProduct();
              }}
              className={"btn btn-success"}
              btnName={"Wishlist"}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                showAlert("Added to cart!", "success");
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
