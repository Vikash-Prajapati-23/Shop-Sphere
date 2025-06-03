import { useEffect, useState } from "react";
import "./Style/Cart.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = ({ cart, setCart, handleWishList, isLoggedIn }) => {
  const [guestCart, setGuestCart] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const localData = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCart(localData);
    } else {
      const fetchCart = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/productcart/cart",
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          setCart(Array.isArray(data) ? data : []);
        } catch (error) {
          toast.error("Failed to fetch cart items");
          setCart([]);
        }
      };
      fetchCart();
    }
  }, [isLoggedIn, setCart]);

  const handleProductDelete = async (productId) => {
    if (!isLoggedIn) {
      const filtered = guestCart.filter((product) => product.id !== productId && product._id !== productId);
      setGuestCart(filtered);
      localStorage.setItem("guestCart", JSON.stringify(filtered));
      toast.success("Item removed from cart");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/removecart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to remove item from cart");
      }
      const filteredCart = cart.filter((product) => product._id !== productId);
      setCart(filteredCart);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleProductIncrement = async (productId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/incrementcart/${productId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to increment item in cart");
      }
      const updatedCart = cart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updatedCart);
    } catch (error) {
      toast.error("Failed to increment item in cart");
    }
  };

  const handleProductDecrement = async (productId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/decrementcart/${productId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to decrement item in cart");
      }
      const updatedCart = cart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      setCart(updatedCart);
      if (data.message === "Item removed from cart") {
        const filteredCart = cart.filter(
          (product) => product._id !== productId
        );
        setCart(filteredCart);
      }
    } catch (error) {
      toast.error("Failed to decrement item in cart");
    }
  };

  const handleAddToWishList = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
    handleProductDelete(product._id);
  };

  const displayCart = isLoggedIn ? cart : guestCart;

  return (
    <div className="container bg-clr my-5">
      <h2 className="text-center py-4">Shopping Cart</h2>
      {displayCart.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center gap-5 py-4">
          <img src="./images/empty-cart.png" alt="Empty Cart" />
          <h4>Your cart is empty.!</h4>
        </div>
      ) : (
        <>
          <ul>
            {displayCart.map((product) => (
              <li
                className="cart-container cart-list rounded m-2 py-3"
                key={product._id || product.id}
              >
                <img
                  src={product.image}
                  className="cart-product mx-5"
                  alt={product.title}
                  onClick={() => handleCardClick(product)}
                />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <pre>{product.title?.slice(0, 20) || "No Title"}...</pre>
                    <div className="d-flex align-items-center">
                      <p>
                        <span className="fw-bold" style={{ color: "gold" }}>
                          ★{" "}
                        </span>
                        <span className="me-3">{product.rating?.rate}</span>
                      </p>
                      <p className="fw-bold">Reviews {product.rating?.count}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      {isLoggedIn && (
                        <>
                          <Button
                            onClick={() =>
                              handleProductDecrement(product._id)
                            }
                            className="btn btn-danger fw-bold"
                            btnName={"-"}
                          />
                          <span className="px-3 fw-bold">
                            {product.quantity}
                          </span>
                          <Button
                            onClick={() =>
                              handleProductIncrement(product._id)
                            }
                            className="btn btn-success fw-bold me-3"
                            btnName={"+"}
                          />
                        </>
                      )}
                      <Button
                        className="btn btn-info fw-bold"
                        onClick={() => handleAddToWishList(product)}
                        btnName={"Move to wishlist"}
                      />
                    </div>
                  </div>

                  <div className="ms-5 me-5 fw-bold">
                    ₹{product.price}{" "}
                    {isLoggedIn && product.quantity
                      ? `(x ${product.quantity})`
                      : ""}
                  </div>

                  <div className="ms-5">
                    <button
                      onClick={() =>
                        handleProductDelete(product._id || product.id)
                      }
                      className="btn text-danger"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total d-flex justify-content-end">
            <span className="mx-3 py-3">
              Total: ₹
              {displayCart
                .reduce((total, product) => {
                  const qty = product.quantity || 1;
                  return total + product.price * qty;
                }, 0)
                .toFixed(2)}
            </span>
            <Button className="btn btn-primary fw-bold" btnName={"Place Order"} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
