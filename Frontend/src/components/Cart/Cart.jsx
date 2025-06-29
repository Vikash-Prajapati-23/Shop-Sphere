import "./Style/Cart.css";
import "../Dashboard/ProfileNevigate/ManageAddresses/ManageAddresses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddress } from "../../context/addressDetailsContext";
import { useEffect, useState } from "react";
import CartLayoutContainer from "./CartLayoutContainer/CartLayoutContainer";
import { useFormData } from "../../context/formDataContext";

const Cart = ({
  cart,
  setCart,
  handleWishList,
  isLoggedIn,
  name,
  email,
  platformFee,
  deliveryCost,
}) => {
  const [guestCart, setGuestCart] = useState([]);
  const navigate = useNavigate();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const { savedAddresses, setSavedAddresses } = useFormData();

  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setGuestCart(cart);
      };

      window.addEventListener("guestCartUpdated", updateCart);
      window.dispatchEvent(new Event("guestCartUpdate"));
      updateCart(); // Sync on mount too

      return () => window.removeEventListener("guestCartUpdated", updateCart);
    } else {
      setCart(cart);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/productcart/cart`,
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
  }, [isLoggedIn, setCart]);

  useEffect(() => {
    // Fetch all addresses for the logged-in user
    if (isLoggedIn) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/savedAddress`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setSavedAddresses(data.addresses || []);
          // Auto-select first address if none selected
          if (!selectedAddress && data.addresses && data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        });
    }
  }, [isLoggedIn]);

  const handleProductDelete = async (productId) => {
    if (!isLoggedIn) {
      const filtered = guestCart.filter(
        (product) => product.id !== productId && product._id !== productId
      );
      setGuestCart(filtered);
      localStorage.setItem("guestCart", JSON.stringify(filtered));
      toast.success("Item removed from cart");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/removecart/${productId}`,
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
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/incrementcart/${productId}`,
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
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/decrementcart/${productId}t`,
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
      // toast.success("")
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
    toast.success("Added to wishlist!");
    handleProductDelete(product._id);
  };

  const displayCart = isLoggedIn ? cart : guestCart;

  return (
    <div className="main-cart">
      {displayCart.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center gap-5 py-4 w-100">
          <img src="./images/empty-cart.png" alt="Empty Cart" />
          <h4>Your cart is empty.!</h4>
        </div>
      ) : (
        <CartLayoutContainer
          cart={cart}
          setCart={setCart}
          name={name}
          email={email}
          deliveryCost={deliveryCost}
          platformFee={platformFee}
          handleCardClick={handleCardClick}
          displayCart={displayCart}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          isLoggedIn={isLoggedIn}
          handleProductDelete={handleProductDelete}
          handleProductIncrement={handleProductIncrement}
          handleProductDecrement={handleProductDecrement}
          handleAddToWishList={handleAddToWishList}
        />
      )}
    </div>
  );
};

export default Cart;
