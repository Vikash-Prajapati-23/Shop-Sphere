import React, { useState, useEffect } from "react";
import "./Style/Men.css";
import Card from "../Card/Card";

const Men = () => {
  const [menProduct, setMenProduct] = useState([]);
  // const [limit, setLimit] = useState();

  const manProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/men's clothing`
    );
    const newUrl = await url.json();
    setMenProduct(newUrl);
  };

  // const fetchMoreMenProducts = async () => {
  //   const url = await fetch(
  //     `https://fakestoreapi.com/products?limit=${limit}`
  //   );
  //   setLimit(10);
  //   const newProducts = await url.json();
  //   setLimit(limit + 4);
  //   setMenProduct(newProducts);
  // };

  useEffect(() => {
    manProduct();
    // fetchMoreMenProducts();
  }, []);

  return (
    <div>
      <h3 className="text-center m-md-3">Men's clothing</h3>
      <div className="container card my-3">
        {menProduct.map((product) => (
          <div className="" key={product.id}>
            <Card
              title={product.title}
              id={product.id}
              image={product.image}
              price={product.price}
              // category={product.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
