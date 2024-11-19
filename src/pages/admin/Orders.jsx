import React, { useEffect } from "react";
import socket from "../../../socket"; // Import the socket instance
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder,
  moveToPaymentOrders,
  updateOrderStatus,
} from "../../redux/orders/orderSlice";
import AdminPanel from "../../components/AdminPannel";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.newOrders);
  const paymentOrders = useSelector((state) => state.orders.paymentOrders); // Assuming you have paymentOrders in redux
  const confirmedOrders = useSelector((state) => state.orders.confirmedOrders); // Assuming you have confirmedOrders in redux

  useEffect(() => {
    // Listen for 'new_order' event from the server
    socket.on("new_order", (order) => {
      console.log("New order received:", order); // Log the received order for debugging
      dispatch(addNewOrder(order)); // Dispatch the addNewOrder action
    });

    // Listen for 'order_updated' event from the server
    socket.on("order_updated", (order) => {
      console.log("Order updated:", order); // Log the updated order for debugging
      dispatch(updateOrderStatus(order)); // Dispatch action to update order status
    });

    // Clean up the event listeners when the component is unmounted
    return () => {
      socket.off("new_order");
      socket.off("order_updated");
    };
  }, [dispatch]);

  const handleAcceptOrder = (orderId) => {
    socket.emit("accept_order", orderId);
    console.log("Order accepted:", orderId); // Log the accepted order for debugging
  };

  return (
    <div className="flex min-h-screen ">
      {/* Admin Panel */}

      <AdminPanel />

      {/* Order Boxes */}
      <div className="flex-1 ml-6 grid grid-cols-3 gap-4 mt-8">
        {/* New Orders Box */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">New Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center">No new orders</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold text-gray-700">
                    Order ID: {order._id}
                  </p>
                  <p className="text-green-600 font-bold">
                    Amount: Rs {order.total}
                  </p>
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAcceptOrder(order._id)}
                  >
                    Accept Order
                  </button>
                  <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded ml-2">
                    Decline Order
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment Under Processing Orders Box */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Payment Under Processing
          </h2>
          {paymentOrders.length === 0 ? (
            <p className="text-gray-600 text-center">No orders under payment</p>
          ) : (
            <ul className="space-y-4">
              {paymentOrders.map((order, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold text-gray-700">
                    Order ID: {order.orderId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer: {order.customer}
                  </p>
                  <p className="text-green-600 font-bold">
                    Amount: Rs {order.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirmed Orders Box */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Confirmed Orders
          </h2>
          {confirmedOrders.length === 0 ? (
            <p className="text-gray-600 text-center">No confirmed orders</p>
          ) : (
            <ul className="space-y-4">
              {confirmedOrders.map((order, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold text-gray-700">
                    Order ID: {order.orderId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer: {order.customer}
                  </p>
                  <p className="text-green-600 font-bold">
                    Amount: Rs {order.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
