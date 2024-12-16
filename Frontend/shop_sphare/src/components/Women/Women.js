import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Women.css";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

const Women = ({ showAlert, handleCardClick }) => {
  const [woMenProduct, setWoMenProduct] = useState(null);
  const nevigate = useNavigate();

  const woManProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/women's clothing`
    );
    const newUrl = await url.json();
    setWoMenProduct(newUrl);
  };

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
    <div className="container">
      <div className="card m-3">
        <h3 className="text-center m-md-2">Women's Clothing</h3>
        <div className="d-flex overflow-auto caro-hight">
          {woMenProduct.map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => { handleCardClickWomen(product) }}
            >
              <Card
                onClick={() => { handleCardClick(product) }}
                title={product.title ? product.title.slice(0, 20) : "No Title."}
                id={product.id}
                image={product.image}
                price={product.price}
                rating={product.rating}
                showAlert={showAlert}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
