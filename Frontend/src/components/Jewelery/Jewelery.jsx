import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style/Jewelery.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import { themeContext } from '../../App';
import toast from "react-hot-toast";

const Jewelery = ({ handleCartAddition, handleWishList, query, isLoggedIn }) => {
  const [jeweleryProduct, setJeweleryProduct] = useState(null);
  const nevigate = useNavigate();
  const toggleMode = useContext(themeContext)

  const fetchJeweleryProducts = async () => {
    const url = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/products/category/jewelery`
    );
    const newProducts = await url.json();
    setJeweleryProduct(newProducts);
  };

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  }

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      nevigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
  }

  const handleCardClickJewelery = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  }

  useEffect(() => {
    fetchJeweleryProducts();
  }, []);  // Now it runs only once when the component mounts

  if (!jeweleryProduct) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container card my-3" style={{ backgroundColor: toggleMode.mode === true ? "#494343" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} >
      <div className=" m-3">
        <h3 className="text-center m-md-2">Jewelery</h3>
        <div className="d-flex flex-wrap">
          {jeweleryProduct.filter((product) => product.title.toLowerCase().includes(query)).map((product) => (
            <div className="col-md-3 flex-shrink-0" key={product.id} onClick={() => { handleCardClickJewelery(product) }}>
              <Card
                {...product}
                handleAddToCart={() => handleAddToCart(product)}
                handleWishlist={() => handleWishlist(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jewelery
