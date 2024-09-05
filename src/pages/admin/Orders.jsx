import React, { useEffect, useState } from 'react';
import socket from '../../../socket'; // Import the socket instance

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to store orders

  useEffect(() => {
    // Listen for 'new_order' event from the server
    socket.on('new_order', (order) => {
      console.log('New order received:', order); // Log the received order for debugging
      setOrders((prevOrders) => [...prevOrders, order]); // Add the new order to the state
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off('new_order');
    };
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order ID: {order.orderId}</p>
              <p>Amount: {order.amount}</p>
              <p>Customer: {order.customer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
