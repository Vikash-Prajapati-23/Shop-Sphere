import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Electronics.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import { themeContext } from "../../App";

const Electronics = ({ handleWishList, handleCartAddition }) => {
  const [electricProduct, setElectricProduct] = useState(null);
  const nevigate = useNavigate();
  const toggleMode = useContext(themeContext)

  const fetchElectricProducts = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/electronics`
    );
    const newProducts = await url.json();
    if (JSON.stringify(newProducts) !== JSON.stringify(electricProduct)) {
      setElectricProduct(newProducts);
    }
    // setElectricProduct(newProducts);
  };

  const handleCardClickElectronics = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  }

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  }

  const handleAddToWishlist = (product) => {
    handleWishList(product);
  }

  useEffect(() => {
    fetchElectricProducts();
  }, []);  // Now it runs only once when the component mounts

  if (!electricProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container my-3" style={{ backgroundColor: toggleMode.mode === true ? "#494343" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} >
      <div className=" m-3">
        <h3 className="text-center m-md-2">Electronics</h3>
        <div className="d-flex overflow-auto">
          {electricProduct.map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => {
              handleCardClickElectronics(product)
            }}>
              <Card
                {...product}
                handleAddToCart={() => handleAddToCart(product)}
                handleAddToWishlist={() => handleAddToWishlist(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
