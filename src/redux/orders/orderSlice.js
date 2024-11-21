import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newOrders: [], // Array to store new orders
  paymentOrders: [], // Array to store orders under payment
  confirmedOrders: [], // Array to store confirmed orders
  loading: false, // Loading state for order operations
  error: null, // Error state for order operations
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.newOrders = action.payload;
      state.paymentOrders = action.payload;
      state.confirmedOrders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNewOrder: (state, action) => {
      state.newOrders.push(action.payload);
    },
    moveToPaymentOrders: (state, action) => {
      const order = state.newOrders.find(
        (order) => order.id === action.payload
      );
      if (order) {
        state.newOrders = state.newOrders.filter(
          (order) => order.id !== action.payload
        );
        state.paymentOrders.push(order);
      }
    },
    moveToConfirmedOrders: (state, action) => {
      const order = state.paymentOrders.find(
        (order) => order.id === action.payload
      );
      if (order) {
        state.paymentOrders = state.paymentOrders.filter(
          (order) => order.id !== action.payload
        );
        state.confirmedOrders.push(order);
      }
    },

    removeOrder: (state, action) => {
      const orderId = action.payload;

      // Remove from the respective order lists
      state.newOrders = state.newOrders.filter(
        (order) => order._id !== orderId
      );
      state.paymentOrders = state.paymentOrders.filter(
        (order) => order._id !== orderId
      );
      state.confirmedOrders = state.confirmedOrders.filter(
        (order) => order._id !== orderId
      );
    },
    updateOrderStatus: (state, action) => {
      const { _id, status } = action.payload;

      // Remove from newOrders if status is not 'new'
      if (status === "payment-awaited") {
        state.newOrders = state.newOrders.filter((order) => order._id !== _id);
        state.paymentOrders.push(action.payload);
      } else if (status === "confirmed") {
        state.paymentOrders = state.paymentOrders.filter(
          (order) => order._id !== _id
        );
        state.confirmedOrders.push(action.payload);
      }
    },
  },
});

// Export actions and reducer
export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addNewOrder,
  moveToPaymentOrders,
  moveToConfirmedOrders,
  removeOrder,
  updateOrderStatus,
} = orderSlice.actions;
export default orderSlice.reducer;
