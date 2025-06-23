import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/Men.css";
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";

const Men = ({ handleCartAddition, handleWishList, query, isLoggedIn }) => {
  const [menProduct, setMenProduct] = useState([]);
  const nevigate = useNavigate();
  const { categorySlug } = useParams();

  const getManProduct = async (categorySlug) => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/category/${categorySlug}`
      );
      const data = await url.json();

      if (Array.isArray(data.categoryFound)) {
        setMenProduct(data.categoryFound);
      } else {
        setMenProduct([]);
        toast.error("Unexpected error while fetching products.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setMenProduct([]);
      toast.error("Failed to load category products.");
    }
  };

  useEffect(() => {
    getManProduct(categorySlug);
  }, [categorySlug]);

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

  const handleCardClick = (product) => {
    nevigate(`/SingleProduct/${product.id}`);
  };

  if (!menProduct) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="container card my-3">
      <div className=" m-3">
        <h3 className="text-center m-md-2">
          {categorySlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
        </h3>
        <div className="d-flex flex-wrap">
          {menProduct
            .filter((product) => product.title.toLowerCase().includes(query))
            .map((product) => (
              <div
                className="col-md-3 flex-shrink-0"
                key={product.id || product._id || product.productId}
                onClick={() => handleCardClick(product)}
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

export default Men;
