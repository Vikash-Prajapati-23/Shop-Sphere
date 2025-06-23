import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/SingleProduct.css";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { themeContext } from "../../App";
import toast from "react-hot-toast";

const SingleProduct = ({ handleCartAddition, handleWishList, isLoggedIn }) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const toggleMode = useContext(themeContext);
  const navigate = useNavigate(); // Added: Use navigate to redirect users.
  const { id } = useParams(); // Added: Extract the product ID from the URL.;

  const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/single/singleproduct/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSingleProduct(data);
      }
      // throw new Error(data.message || "Failed to fetch product");
    } catch (error) {
      if (process.env.REACT_APP_NODE_ENV !== "production") {
        console.error(error);
      }
      toast.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchSingleProduct(id); // Pass the id from useParams
  }, [id]);

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
    }
    handleWishList(product);
  };

  if (!singleProduct) {
    return (
      <div>
        <Loading />
      </div>
    ); // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container card mt-3 mb-3">
      <div className="m-3">
        <div className="d-flex">
          <div className="prod-img m-4 ">
            <img
              className="m-4 prod-img"
              src={singleProduct.image}
              alt={singleProduct.title}
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
                  handleWishlist(singleProduct);
                }}
                className={"btn btn-success"}
                btnName={"Wishlist"}
              />
              <Button
                onClick={() => {
                  handleAddToCart(singleProduct);
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
