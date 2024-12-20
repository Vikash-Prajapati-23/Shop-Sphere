import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Men.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';

const Men = () => {
  const [menProduct, setMenProduct] = useState(null);
  const nevigate = useNavigate();
  // const [limit, setLimit] = useState();

  const manProduct = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/men's clothing`
    );
    const newUrl = await url.json();
    setMenProduct(newUrl);
  };

  const handleCardClickMan = (product) => {
    nevigate(`/SingleProduct/${product.id}`)
  }

  useEffect(() => {
    manProduct();
  }, []);

  if (!menProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container">
      <div className="card m-3">
        <h3 className="text-center m-md-2">Men's clothing</h3>
        <div className="d-flex overflow-auto caro-hight">
          {menProduct.map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => { handleCardClickMan(product) }} >
              <Card
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
    </div>
  );
};

export default Men;
