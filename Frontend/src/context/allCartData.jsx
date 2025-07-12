import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormData } from "./formDataContext";

const allCart = createContext();

export const useCartData = () => useContext(allCart);

export const CartDataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestCart, setGuestCart] = useState([]);
  const [cart, setCart] = useState([]);
  const { setSavedAddresses, selectedAddress, setSelectedAddress, } = useFormData();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCart(cart);
    };

    window.addEventListener("guestCartUpdated", updateCart);
    window.dispatchEvent(new Event("guestCartUpdate"));
    updateCart(); // Sync on mount too

    return () => window.removeEventListener("guestCartUpdated", updateCart);
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
        // toast.error("Failed to fetch cart items");
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

  const handleCartAddition = async (product) => {
    try {
      if (!isLoggedIn) {
        // Guest: store in localStorage
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || []; // Check BEFORE adding
        const guestExistCart = guestCart.find(
          (item) => item._id === product._id || item.id === product.id
        );

        if (guestExistCart) {
          toast.success("Item already in cart!");
          return;
        }

        guestCart.push(product); // Now it's safe to add
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart!");
        setCart(guestCart);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/addcart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to add to cart");
        return;
      } // Only update state if the request was successful
      setCart((prevCart) => {
        const exists = prevCart.find((item) => item._id === product._id);
        if (exists) {
          toast.success(data.message);
          return prevCart;
        } else {
          toast.success(data.message);
          return [...prevCart, product];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      console.log("[handleClearCart] Sending request to clear cart...");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/productcart/clearcart`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("[handleClearCart] Response:", response.status, data);
      if (response.ok) {
        toast.success(data.message || "Cart cleared successfully");
        // Refetch cart to ensure sync
        try {
          const refetch = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/productcart/cart`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const cartData = await refetch.json();
          setCart(Array.isArray(cartData) ? cartData : []);
          console.log("[handleClearCart] Cart after refetch:", cartData);
        } catch (fetchErr) {
          console.error("[handleClearCart] Error refetching cart:", fetchErr);
          setCart([]);
        }
      } else {
        toast.error(data.message || "Failed to clear cart");
        // Optionally refetch to sync state
        try {
          const refetch = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/productcart/cart`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const cartData = await refetch.json();
          setCart(Array.isArray(cartData) ? cartData : []);
        } catch {}
      }
    } catch (error) {
      toast.error("Something went wrong while clearing the cart!");
      console.error("[handleClearCart] Exception:", error);
    }
  }

  const handleDelete = async (productId) => {
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

  const handleIncrement = async (productId) => {
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

  const handleDecrement = async (productId) => {
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

  return (
    <allCart.Provider
      value={{
        cart,
        setCart,
        isLoggedIn,
        setIsLoggedIn,
        guestCart,
        setGuestCart,
        handleClearCart,
        handleCartAddition,
        handleDecrement,
        handleIncrement,
        handleDelete,
      }}
    >
      {children}
    </allCart.Provider>
  );
};
