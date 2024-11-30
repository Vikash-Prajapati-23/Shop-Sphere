import React, { useState, useEffect } from "react";
import "./Style/Women.css";
import Card from "../Card/Card";

const Women = () => {
  const [woMenProduct, setWoMenProduct] = useState([]);

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

  return (
    <div className="container">
      <div className="card m-3">
        <h3 className="text-center m-md-2">Women's Clothing</h3>
        <div className="d-flex overflow-auto caro-hight">
          {woMenProduct.map((product) => (
            <div className="" key={product.id}>
              <Card
                title={product.title ? product.title.slice(0, 20) : "No Title."}
                id={product.id}
                image={product.image}
                price={product.price}
                rating={product.rating}
                // category={product.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
