import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Style/SingleProduct.css";
import Button from "../Button/Button";
import Loading from '../Loading/Loading';
import { alertContext, themeContext } from "../../App";

const SingleProduct = ({ fetchWishlistProduct }) => {
  const [singleProduct, setsingleProduct] = useState(null);
  const alert = useContext(alertContext);
  const toggleMode = useContext(themeContext);
  const { id } = useParams(); // Added: Extract the product ID from the URL.;

  // Added: Function to fetch product details using the extracted ID.
  const fetchSingleProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setsingleProduct(data); // Update the product state with fetched data.
  };

  useEffect(() => {
    fetchSingleProduct(); 
  }, []);

  if (!singleProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className="container card mt-3 mb-3">
      <div className="m-3">
        <div className="d-flex">
          <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className="prod-img m-4 ">
            <img
              className="m-4 prod-img"
              src={singleProduct.image}
              alt={singleProduct.title}
              // style={{
              //   objectFit: "contain",
              //   mixBlendMode: toggleMode.mode ? "darken" : "normal", // Adjust blending
              // }}
            />
          </div>
          <div className="prod-info m-4">
            <h3 className="m-md-3">{singleProduct.title}</h3>
            <p className="m-md-3">{singleProduct.description}</p>
            <p className="m-md-3 fw-bold">Price: ${singleProduct.price}</p>
            <p className="m-md-3 fw-bold">
              <span style={{ color: "gold", fontSize: "1.3rem" }}>★ </span>
              <span>{singleProduct.rating.rate}</span>
            </p>
            <p className="m-md-3 fw-bold">
              Reviews {singleProduct.rating.count}
            </p>

            <div className="prod-btn d-flex m-3">
              <Button
                onClick={() => {
                  alert.showAlert("Added to wishlist", "btn text-bg-primary");
                  fetchWishlistProduct();
                }}
                className={"btn btn-success"}
                btnName={"Wishlist"}
              />
              <Button
                onClick={() => {
                  alert.showAlert("Added to cart", "success");
                }}
                className={"btn btn-success mx-3"}
                btnName={"Add to cart"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
