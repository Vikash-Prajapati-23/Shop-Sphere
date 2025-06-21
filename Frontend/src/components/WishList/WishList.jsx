import { useEffect } from "react";
import "./Style/WishList.css";
import Button from "../Button/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const WishList = ({ wishlist, setWishlist, handleCartAddition }) => {
  // Fetch wishlist data on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/wishlistproduct/wishlist`,
          {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        setWishlist(Array.isArray(data) ? data : []); // Ensure wishlist is always an array
      } catch (error) {
        setWishlist([]); // Set wishlist to an empty array on error
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCart = async (product) => {
    handleCartAddition(product);
    handleProductDelete(product._id); // Remove from wishlist after adding to cart
  };

  const handleProductDelete = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/wishlistproduct/removewishlist/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for authentication
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to remove item from wishlist");
      } else {
        const updatedWishlist = wishlist.filter(
          (item) => item._id !== productId
        );

        setWishlist(updatedWishlist);
        toast.success("Item removed from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  const navigate = useNavigate();
  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
    } else {
      toast.error("Product ID not found");
    }
  };

  return (
    <div className="wishlist-container bg-light my-5">
      <h2 className="pt-4 text-center">Your Wishlist</h2>
      <Toaster />
      <div>
        {Array.isArray(wishlist) && wishlist.length === 0 ? (
          <div className={"d-flex justify-content-center align-items-center"}>
            <img src={"./images/wish.gif"} alt=""></img>
            <h4>Your wishlist is empty.!</h4>
          </div>
        ) : (
          <div className={"my-3 d-flex flex-wrap justify-content-center gap-3"}>
            {wishlist?.map((product, index) => (
              <div
                className="card px-1 col-md-3 flex-shrink-0 "
                key={product.id || index}
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
                      onClick={() => handleCardClick(product)}
                    />
                    <button
                      onClick={() => handleProductDelete(product._id)}
                      className="btn text-dark close-btn fs-2 shadow-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className={"p-1 "}>
                    <pre className="d-flex justify-content-start fw-bold">
                      {(product.tittle
                        ? product.title.slice(0, 30)
                        : "No Title") + "..."}
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
                      ₹{product.price}
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
