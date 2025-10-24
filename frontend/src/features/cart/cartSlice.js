// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: 0,
};

const updateLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      updateLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      updateLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      updateLocalStorage(state.items);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      updateLocalStorage(state.items);
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      updateLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
