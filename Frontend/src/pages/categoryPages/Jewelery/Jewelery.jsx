import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Jewelery.css";
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";

const Jewelery = ({
  handleCartAddition,
  handleWishList,
  query,
  isLoggedIn,
}) => {
  const [jeweleryProduct, setJeweleryProduct] = useState(null);
  const nevigate = useNavigate();

  const fetchJeweleryProducts = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/category/jewelery`
      );
      const data = await url.json();
      if (Array.isArray(data.categoryFound)) {
        setJeweleryProduct(data.categoryFound);
      } else {
        setJeweleryProduct([]);
        toast.error("Unexpected error while fetching products.");
      }
    } catch (error) {
      setJeweleryProduct([]);
      toast.error("Failed to load category products.");
    }
  };

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      nevigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
  };

  const handleCardClickJewelery = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  };

  useEffect(() => {
    fetchJeweleryProducts();
  }, []); // Now it runs only once when the component mounts

  if (!jeweleryProduct) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    ); // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="container card my-3">
      <div className=" m-3">
        <h3 className="text-center m-md-2">Jewelery</h3>
        <div className="d-flex flex-wrap">
          {jeweleryProduct
            .filter((product) => product.title.toLowerCase().includes(query))
            .map((product) => (
              <div
                className="col-md-3 flex-shrink-0"
                key={product.id}
                onClick={() => {
                  handleCardClickJewelery(product);
                }}
              >
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
};

export default Jewelery;
