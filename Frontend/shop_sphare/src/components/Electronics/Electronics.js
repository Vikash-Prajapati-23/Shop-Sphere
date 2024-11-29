import React, { useEffect, useState } from "react";
import "./Style/Electronics.css";
import Card from "../Card/Card";

const Electronics = () => {
  const [electricProduct, setElectricProduct] = useState([]);

  const fetchElectricProducts = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/electronics`
    );
    const newProducts = await url.json();
    setElectricProduct(newProducts);
  };

  useEffect(() => {
    fetchElectricProducts();
  });

  return (
    <div className="card m-3">
      <h3 className="text-center m-md-2">Electronics</h3>
      <div className="d-flex overflow-auto caro-hight">
        {electricProduct.map((product) => (
          <div className="col-md-3 flex-shrink-0" key={product.id}>
            <Card
              category={product.category}
              title={product.title ? product.title.slice(0, 20) : "No Title"}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
