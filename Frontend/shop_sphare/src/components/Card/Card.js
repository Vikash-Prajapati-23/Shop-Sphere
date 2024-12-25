import React, { useContext } from "react";
import "./Style/Card.css";
import Button from "../Button/Button";
import { alertContext, themeContext } from "../../App";

const Card = ({
  title,
  description,
  image,
  id,
  price,
  category,
  rating,
  // getData,
  // showAlert,
  type,
  fetchSingleProduct,
  fetchWishlistProduct,
}) => {
  // let {title, description, image, id, price, category, rating, getData} = props;

  const usedAlert = useContext(alertContext);
  const toggleMode = useContext(themeContext);

  return (
    <div style={{ backgroundColor: toggleMode.mode === true ? "#fff" : "#fff", border: toggleMode.mode === true ? "1px solid darkgrey" : "1px solid black" }} className="m-3 card-comp" onClick={fetchSingleProduct}>
      <div className=" card-style">
        <div className="text-center m-2">{category}</div>
        <img
          src={image}
          style={{ height: "140px", objectFit: "scale-down" }}
          className="card-img-top "
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
                usedAlert.showAlert("Added to wishlist.", "success");
                fetchWishlistProduct();
              }}
              className={"btn btn-success"}
              btnName={"Wishlist"}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                if (usedAlert && usedAlert.showAlert) {
                  usedAlert.showAlert("Added to Cart!", "success"); // Call the showAlert function
                };
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
