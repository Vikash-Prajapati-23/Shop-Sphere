import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style/Jewelery.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import { themeContext } from '../../App';

const Jewelery = () => {
  const [jeweleryProduct, setJeweleryProduct] = useState(null);
  const nevigate = useNavigate();
  const toggleMode = useContext(themeContext)

  const fetchJeweleryProducts = async () => {
    const url = await fetch(
      `https://fakestoreapi.com/products/category/jewelery`
    );
    const newProducts = await url.json();
    setJeweleryProduct(newProducts);
  };

  const handleCardClickJewelery = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  }

  useEffect(() => {
    fetchJeweleryProducts();
  });

  if (!jeweleryProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container card my-3" style={{ backgroundColor: toggleMode.mode === true ? "#494343" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} >
      <div className=" m-3">
        <h3 className="text-center m-md-2">Jewelery</h3>
        <div className="d-flex overflow-auto caro-hight">
          {jeweleryProduct.map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => { handleCardClickJewelery(product) }}>
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
    </div>
  );
}

export default Jewelery
