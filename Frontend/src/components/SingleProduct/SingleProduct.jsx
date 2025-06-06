import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/SingleProduct.css";
import Button from "../Button/Button";
import Loading from '../Loading/Loading';
import { themeContext } from "../../App";
import toast from "react-hot-toast";

const SingleProduct = ({ handleCartAddition, handleWishList, isLoggedIn }) => {   // fetchWishlistProduct
  const [singleProduct, setSingleProduct] = useState(null);
  // const alert = useContext(alertContext);
  const toggleMode = useContext(themeContext);
  const navigate = useNavigate(); // Added: Use navigate to redirect users.
  const { id } = useParams(); // Added: Extract the product ID from the URL.;

  // Added: Function to fetch product details using the extracted ID.
  const fetchSingleProduct = async (id) => {
    console.log("Fetching product with ID:", id); // Debugging log to check the ID being fetched.
    try {
      const response = await fetch(`http://localhost:3001/api/single/singleproduct/${id}`, {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product"); 
      }
      setSingleProduct(data); // Update the product state with fetched data.
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Failed to fetch product details");
    }
  };

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  }

  const handleWishlist = (product) => {
    if(!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
    }
    handleWishList(product);
  }

  useEffect(() => {
    fetchSingleProduct(id); // Pass the id from useParams
  }, [id]);

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
                  handleWishlist(singleProduct)
                }}
                className={"btn btn-success"}
                btnName={"Wishlist"}
              />
              <Button
                onClick={() => {
                  handleAddToCart(singleProduct)
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
