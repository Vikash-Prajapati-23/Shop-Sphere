import { useEffect } from "react";
import "./Style/WishList.css";
import Button from "../Button/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartData } from "../../context/allCartData";

const WishList = ({
  wishlist,
  setWishlist,
  handleRemoveWishlist,
}) => {
  const { handleCartAddition } = useCartData();

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

  const handleProductDelete = async (product) => {
    handleRemoveWishlist(product._id || product.id || product.productId);
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
          <div className={"d-flex mx-auto justify-content-center align-items-center"}>
            <img src={"./images/wish.gif"} className="opt-img" alt=""></img>
            <p>Your wishlist is empty.!</p>
          </div>
        ) : (
          <div
            className={
              "my-3 d-flex flex-wrap justify-content-center wishlist-prod gap-3"
            }
          >
            {wishlist?.map((product, index) => (
              <div
                className="card px-1 col-md-3 flex-shrink-0 "
                key={product.id || index}
              >
                <div className="prod-infos">
                  <div>
                    <img
                      src={product.image}
                      className="card-img"
                      alt={product.title}
                      onClick={() => handleCardClick(product)}
                    />
                    <button
                      onClick={() => handleProductDelete(product)}
                      className="text-dark close-btn shadow-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className={"p-1"}>
                    <p className="d-flex justify-content-start fw-semibold text-size-b">
                      {(product.title
                        ? product.title.slice(0, 13)
                        : "No Title") + "..."}
                    </p>

                    <div className="small-hidden text-size-s">
                      <p>
                        <span className="fw-bold" style={{ color: "gold" }}>
                          ★{" "}
                        </span>
                        <span className="me-3">{product.rating.rate}</span>
                      </p>
                      <p className="">Reviews {product.rating.count}</p>
                    </div>

                    <p className="d-flex justify-content-start fw-semibold text-size-b">
                      ₹{product.price}
                    </p>

                    <Button
                      className="btn btn-success w-100 text-size-s"
                      onClick={() => handleCartAddition(product)}
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
