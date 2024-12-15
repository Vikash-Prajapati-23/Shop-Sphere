import React, { useEffect, useState } from 'react'
import "./Style/Jewelery.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';

const Jewelery = ({showAlert}) => {
    const [jeweleryProduct, setJeweleryProduct] = useState(null);

    const fetchJeweleryProducts = async () => {
      const url = await fetch(
        `https://fakestoreapi.com/products/category/jewelery`
      );
      const newProducts = await url.json();
      setJeweleryProduct(newProducts);
    };
  
    useEffect(() => {
        fetchJeweleryProducts();
    });

    if (!jeweleryProduct) {
      return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
    }
  
    return (
      <div className="container">
      <div className="card m-3">
        <h3 className="text-center m-md-2">Jewelery</h3>
        <div className="d-flex overflow-auto caro-hight">
          {jeweleryProduct.map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id}>
              <Card
                category={product.category}
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
}

export default Jewelery
