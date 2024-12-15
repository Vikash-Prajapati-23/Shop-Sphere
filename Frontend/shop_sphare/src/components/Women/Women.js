import React, { useState, useEffect } from "react";
import "./Style/Women.css";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

const Women = ({showAlert, handleCardClick}) => {
  const [woMenProduct, setWoMenProduct] = useState(null);

  const woManProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/women's clothing`
    );
    const newUrl = await url.json();
    setWoMenProduct(newUrl);
  };
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
            <div className="" key={product.id}
              >
              <Card
                onClick={() => {handleCardClick(product)}}
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
