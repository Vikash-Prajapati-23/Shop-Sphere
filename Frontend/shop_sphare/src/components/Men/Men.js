import React, { useState, useEffect } from "react";
import "./Style/Men.css";
import Card from "../Card/Card";

const Men = ({ showAlert }) => {
  const [menProduct, setMenProduct] = useState([]);
  // const [limit, setLimit] = useState();

  const manProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/men's clothing`
    );
    const newUrl = await url.json();
    setMenProduct(newUrl);
  };

  useEffect(() => {
    manProduct();
  }, []);

  return (
    <div className="container">
      <div className="card m-3">
        <h3 className="text-center m-md-2">Men's clothing</h3>
        <div className="d-flex overflow-auto caro-hight">
          {menProduct.map((product) => (
            <div className="" key={product.id}>
              <Card
                title={product.title ? product.title.slice(0, 20) : "No Title"}
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

export default Men;
