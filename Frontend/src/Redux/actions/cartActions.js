import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ product, isLoggedIn }, thunkAPI) => {
    try {
      // GUEST USER: use localStorage
      if (!isLoggedIn) {
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const exists = guestCart.find((item) => item._id === product._id);

        if (exists) {
          toast.success("Item already in cart");
          return guestCart;
        }

        guestCart.push(product);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart!");
        return guestCart;
      }

      // LOGGED IN USER: hit backend
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productcart/addcart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      toast.success(data.message);
      return product;
    } catch (error) {
      toast.error("Something went wrong");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
