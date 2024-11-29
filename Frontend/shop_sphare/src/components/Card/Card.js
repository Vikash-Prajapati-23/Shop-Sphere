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
  getData,
}) => {
  // let {title, description, image, id, price, category, rating, getData} = props;

  return (
    <div className="m-3">
      <div className="card" style={{ width: "18rem" }}>
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
              onClick={getData}
              className={"btn btn-success"}
              btnName={"Wishlist"}
            />
            <Button
              onClick={getData}
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
