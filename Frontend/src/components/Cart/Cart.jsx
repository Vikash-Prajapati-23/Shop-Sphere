import React, { useEffect } from "react";
import "./Style/Cart.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = ({ cart, setCart, handleWishList }) => {
  const navigate = useNavigate();
  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/productcart/cart",
          {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          }
        );
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleProductDelete = async (productId) => {
    // Here, the ?. ensures that filter() is only called if cart is not undefined or null.
    // If cart is undefined or null, filteredCart will be undefined, and setCart(filteredCart) will not throw an error.
    // const filteredCart = cart?.filter((product) => product?.id !== id);
    // setCart(filteredCart);

    try {
      const response = await fetch(
        `http://localhost:3001/api/productcart/removecart/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for authentication
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
      console.error("Failed to remove item from cart");
      toast.error("Failed to remove item from cart");
    }
  };

  const handleProductIncrement = (id) => {
    // Here, the ?. ensures that map() is only called if cart is not undefined or null.
    // If cart is undefined or null, updatedCart will be undefined, and setCart(updatedCart) will not throw an error.
    // Using cart?.map(...) ensures map() is not called on an undefined cart (avoiding runtime errors).
    // Not using cart?.map(...) assumes cart is always defined, which can cause crashes if cart is ever undefined.
    const updatedCart = cart?.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedCart);
  };

  const handleProductDecrement = (id) => {
    const updateCart = cart
      ?.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
      .filter((product) => product.quantity > 0);
    setCart(updateCart);
  };

  const handleAddToWishList = (product) => {
    handleWishList(product);
    handleProductDelete(product.id);
  };

  return (
    <div className="container bg-clr my-5">
      <h2 className="text-center py-4">Shopping Cart</h2>
      <ul>
        {cart.length === 0 ? (
          <div className="d-flex align-products-center justify-content-center gap-5 py-4">
            {" "}
            <img src="./images/empty-cart.png"></img>{" "}
            <h4> Your cart is empty.!</h4>{" "}
          </div>
        ) : (
          <ul>
            {cart.map((product) => (
              <li
                className="cart-container cart-list rounded m-2 py-3"
                key={product._id}
              >
                <img
                  src={product.image}
                  className="cart-product mx-5"
                  alt={product.title}
                  onClick={() => handleCardClick(product)}
                />

                <div className=" d-flex justify-content-between align-items-center">
                  <div className=" justify-content-between ">
                    <pre className=" ">
                      {" "}
                      {product.title?.slice(0, 20) || "No Title"}...{" "}
                    </pre>
                    <div className=" d-flex align-products-center">
                      <p>
                        <span className="fw-bold" style={{ color: "gold" }}>
                          ★{" "}
                        </span>
                        <span className="me-3">{product.rating.rate}</span>
                      </p>
                      <p className="fw-bold">Reviews {product.rating.count}</p>
                    </div>
                    <div className=" d-flex justify-content-between align-products-center">
                      <Button
                        onClick={() => handleProductDecrement(product.id)}
                        className="btn btn-danger fw-bold"
                        btnName={"-"}
                      />
                      <span className="d-flex align-products-center px-3 fw-bold">
                        {product.quantity}
                      </span>
                      <Button
                        onClick={() => handleProductIncrement(product.id)}
                        className="btn btn-success fw-bold me-3"
                        btnName={"+"}
                      />
                      
                      <Button
                        className="btn btn-info fw-bold "
                        onClick={() => handleAddToWishList(product)}
                        btnName={"Move to wishlist"}
                      />
                    </div>
                  </div>

                  <div className="ms-5 align-products-center me-5 fw-bold ">
                    ₹{product.price} (x{product.quantity})
                  </div>

                  <div className="ms-5 align-products-center">
                    <button
                      onClick={() => handleProductDelete(product._id)}
                      className="btn text-danger "
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <div className="cart-total d-flex justify-content-end">
              <span className=" mx-3 py-3">
                Total: ₹
                {cart
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
              <Button
                className="btn btn-primary fw-bold"
                btnName={"Place Order"}
              />
            </div>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Cart;
