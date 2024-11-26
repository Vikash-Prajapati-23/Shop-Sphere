import React from "react";
import './Style/Card.css'
import Button from "../Button/Button";


const Card = (props) => {

  let {title, description, image, id, price, category, rating} = props;

  return (
    <div className="m-3">
      <div className="card" style={{width: "18rem"}}>
      <div className="text-center m-2">{category}</div>
        <img src={image} style={{height: "140px", objectFit: "scale-down", margin: "5px"}} className="card-img-top" alt="Image" />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">
            {description}
          </p>
          <p>${price}</p>
          <p>{rating}</p>
          <Button btnName={"Add to Cart"} />
        </div>
      </div>
    </div>
  );
};

export default Card;
