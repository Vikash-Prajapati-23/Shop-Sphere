import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/SingleProduct.css";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";

const SingleProduct = ({
  handleCartAddition,
  handleRemoveWishlist,
  handleWishList,
  clicked,
  setClicked,
  isLoggedIn,
  wishlist,
}) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/single/singleproduct/${id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSingleProduct(data);

          // Check if this product exists in wishlist
          const exists =
            Array.isArray(wishlist) &&
            wishlist.some(
              (item) => item._id === data._id || item.id === data.id
            );
          setClicked(exists);
        } else {
          toast.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product details");
      }
    };

    fetchSingleProduct(id);
  }, [id, wishlist]);

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlistToggle = async (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast("Please log in to manage your wishlist");
      return;
    }

    const productId = product._id || product.id;

    if (clicked) {
      await handleRemoveWishlist(productId);
    } else {
      await handleWishList(product);
    }

    setClicked(!clicked);
  };

  if (!singleProduct) return <Loading />;

  return (
    <div className="mx-lg-5 mx-md-3 mx-3 card my-3 single-prod-main">
      <div className="m-lg-3 ">
        <div className="single-prod">
          <div className="prod-img prod-img-wishlist m-4">
            <img
              className="m-1 prod-img pt-5"
              src={singleProduct.image}
              alt={singleProduct.title}
            />
            <button
              onClick={() => handleWishlistToggle(singleProduct)}
              className="prod-wishlist-btn"
            >
              <i
                className={`${
                  clicked ? "fas text-danger" : "far text-muted"
                } fa-heart prod-wishlist-icon`}
              ></i>
            </button>
          </div>

          <div className="prod-info m-3">
            <h3 className="m-md-3 login-text-size">{singleProduct.title}</h3>
            <p className="m-md-3 desc-text-size">{singleProduct.description}</p>
            <p className="m-md-3 fw-bold login-text-size">
              Price: ${singleProduct.price}
            </p>
            <p className="m-md-3 fw-bold login-text-size">
              <span style={{ color: "gold", fontSize: "1.3rem" }}>★ </span>
              <span>{singleProduct.rating.rate}</span>
            </p>
            <p className="m-md-3 fw-bold login-text-size">
              Reviews {singleProduct.rating.count}
            </p>

            <div className="prod-btn ms-lg-3 ms-0">
              <Button
                onClick={() => handleAddToCart(singleProduct)}
                className={"btn btn-success add-cart-btn login-text-size ms-0"}
                btnName={"Add to cart"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
