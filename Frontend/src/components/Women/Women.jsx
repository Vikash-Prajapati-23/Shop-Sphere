import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Women.css";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import { themeContext } from "../../App";
import toast from "react-hot-toast";

const Women = ({ handleCartAddition, handleWishList, query, isLoggedIn }) => {
  const [woMenProduct, setWoMenProduct] = useState(null);
  const nevigate = useNavigate();
  const toggleMode = useContext(themeContext)

  const woManProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/women's clothing`
    );
    const newUrl = await url.json();
    setWoMenProduct(newUrl);
  }

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  }

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      nevigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
  }


  const handleCardClickWomen = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  }

  useEffect(() => {
    woManProduct();
  }, []);

  if (!woMenProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container card my-3" style={{ backgroundColor: toggleMode.mode === true ? "#494343" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} >
      <div className=" m-3">
        <h3 className="text-center m-md-2">Women's Clothing</h3>
        <div className="d-flex overflow-auto">
          {woMenProduct.filter((product) => product.title.toLowerCase().includes(query)).map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => { handleCardClickWomen(product) }}
            >
              <Card
                {...product}
                handleAddToCart={() => handleAddToCart(product)}
                handleWishlist={() => handleWishlist(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;