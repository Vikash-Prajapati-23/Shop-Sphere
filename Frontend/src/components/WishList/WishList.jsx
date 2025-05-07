import React, { useEffect } from "react";
import "./Style/WishList.css";
import Button from "../Button/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WishList = ({ wishlist, setWishlist, handleCartAddition }) => {
  // Fetch wishlist data on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/wishlistproduct/wishlist",
          {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          }
        );
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await fetch("http://localhost:3001/api/wishlistproduct/addwishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
        credentials: "include",
      });
      handleCartAddition(product); // Add product to cart
      toast.success("Added to cart!");
      handleProductDelete(product.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:3001/api/wishlistproduct/removewishlist/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const navigate = useNavigate();
  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  // const handleProductDelete = (id) => {
  //   const filteredCart = wishlist?.filter((item) => item?.id !== id);
  //   setWishlist(filteredCart);
  // }

  // const handleAddToCart = (product) => {
  //   handleCartAddition(product);
  //   handleProductDelete(product.id);
  // };

  return (
    <div className="wishlist-container bg-light my-5">
      <h2 className="pt-4 text-center">Your Wishlist</h2>
      <Toaster />
      <div>
        {wishlist.length === 0 ? (
          <div className={"d-flex justify-content-center align-items-center"}>
            <img src={"./images/wish.gif"} alt=""></img>
            <h4>Your wishlist is empty.!</h4>
          </div>
        ) : (
          <div className={"my-3 d-flex flex-wrap justify-content-center gap-3"}>
            {wishlist?.map((product) => (
              <div
                className="card px-1 col-md-3 flex-shrink-0 "
                key={product.id}
              >
                <div className="p-3 ">
                  <div>
                    <img
                      src={product.image}
                      style={{
                        height: "150px",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      className="card-img card-img-top my-3"
                      alt=""
                      onClick={() => handleCardClick(wishlist)}
                    />
                    <button
                      onClick={() => handleProductDelete(product.id)}
                      className="btn text-dark close-btn fs-2 shadow-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className={"p-1 "}>
                    <pre className="d-flex justify-content-start fw-bold">
                      {product.title.slice(0, 30) || "No Title"}...
                    </pre>

                    <div className=" d-flex ">
                      <p>
                        <span className="fw-bold" style={{ color: "gold" }}>
                          ★{" "}
                        </span>
                        <span className="me-3">{product.rating.rate}</span>
                      </p>
                      <p className="">Reviews {product.rating.count}</p>
                    </div>

                    <p className="d-flex justify-content-start fw-bold">
                      {" "}
                      ₹{product.price}{" "}
                    </p>

                    <Button
                      className="btn btn-success w-100"
                      onClick={() => handleAddToCart(product)}
                      btnName={"Move to cart"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
