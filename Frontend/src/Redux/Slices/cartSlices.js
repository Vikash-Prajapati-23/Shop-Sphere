import { createSlice } from "@reduxjs/toolkit";
import { addToCartAsync } from "../actions/cartActions";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        // guest cart case
        state.cartItems = payload;
        state.totalQuantity = payload.length;
        state.totalPrice = payload.reduce((acc, item) => acc + item.price, 0);
      } else {
        // logged-in user case
        const exists = state.cartItems.find((item) => item._id === payload._id);
        if (!exists) {
          state.cartItems.push({ ...payload, quantity: 1 });
          state.totalQuantity += 1;
          state.totalPrice += payload.price;
        }
      }
    });
  }
});

export default cartSlice.reducer;