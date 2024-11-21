import React, { useEffect } from "react";
import socket from "../../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder,
  moveToPaymentOrders,
  updateOrderStatus,
  removeOrder,
} from "../../redux/orders/orderSlice";
import AdminPanel from "../../components/AdminPannel";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.newOrders);
  const paymentOrders = useSelector((state) => state.orders.paymentOrders);
  const confirmedOrders = useSelector((state) => state.orders.confirmedOrders);
  console.log(orders, paymentOrders, confirmedOrders);

  useEffect(() => {
    socket.on("new_order", (order) => {
      dispatch(addNewOrder(order));
    });

    socket.on("order_updated", (order) => {
      dispatch(updateOrderStatus(order));
    });

    return () => {
      socket.off("new_order");
      socket.off("order_updated");
    };
  }, [dispatch]);

  const handleAcceptOrder = (orderId) => {
    socket.emit("accept_order", orderId);
  };
  const handleCancelOrder = (orderId) => {
    // Emit socket event for order cancellation (if needed)
    socket.emit("cancell_order", orderId);

    // Remove the order from the Redux state
    dispatch(removeOrder(orderId));
  };

  const OrderSection = ({ title, orders, emptyMessage, renderItem }) => (
    <div className="mt-10 bg-gray-900 border border-cyan-600 p-4 rounded-lg shadow-md hover:shadow-cyan-600/50 transition-all duration-300">
      <h2 className="text-5xl font-bold mb-4 text-center text-cyan-300">
        {title}
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center">{emptyMessage}</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => renderItem(order, index))}
        </ul>
      )}
    </div>
  );

  const renderNewOrderItem = (order) => (
    <li
      key={order._id}
      className="bg-gray-900 border border-cyan-600 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
    >
      <p className="text-lg font-semibold text-cyan-400">
        Order ID: {order._id}
      </p>
      <p className="text-cyan-300 font-bold">Amount: Rs {order.total}</p>
      <div className="flex space-x-2 mt-2">
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          onClick={() => handleAcceptOrder(order._id)}
        >
          Accept Order
        </button>
        <button className="border border-cyan-600 text-cyan-400 hover:bg-cyan-600/20 px-4 py-2 rounded-lg transition-all duration-300"
        onClick={() => handleCancelOrder(order._id)} // Cancel Order
        >
          Decline Order
        </button>
      </div>
    </li>
  );

  const renderPaymentOrderItem = (order) => (
    <li
      key={order._id}
      className="bg-gray-900 border border-cyan-600 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
    >
      <p className="text-lg font-semibold text-cyan-400">
        Order ID: {order._id}
      </p>
      <p className="text-sm text-gray-400">Customer: {order.customer}</p>
      <p className="text-cyan-300 font-bold">Amount: Rs {order.total}</p>
    </li>
  );

  const renderConfirmedOrderItem = (order) => (
    <li
      key={order.orderId}
      className="bg-gray-900 border border-cyan-600 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
    >
      <p className="text-lg font-semibold text-cyan-400">
        Order ID: {order.orderId}
      </p>
      <p className="text-sm text-gray-400">Customer: {order.customer}</p>
      <p className="text-cyan-300 font-bold">Amount: Rs {order.amount}</p>
    </li>
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="flex">
        <AdminPanel />

        <div className="flex-1 ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <OrderSection
            title="New Orders"
            orders={orders}
            emptyMessage="No new orders"
            renderItem={renderNewOrderItem}
          />

          <OrderSection
            title="Payment Processing"
            orders={paymentOrders}
            emptyMessage="No orders under payment"
            renderItem={renderPaymentOrderItem}
          />

          <OrderSection
            title="Confirmed Orders"
            orders={confirmedOrders}
            emptyMessage="No confirmed orders"
            renderItem={renderConfirmedOrderItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
