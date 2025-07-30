import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import "./order.css";
export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2 className="order-title">My Orders</h2>
      {error && <div className="order-error">{error}</div>}
      {orders &&
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-summary">
              <span>Order ID: <strong>{order._id}</strong></span>
              <span>Status: <strong>{order.status}</strong></span>
              <span>Order Value: <span className="order-value">${order.orderValue}</span></span>
            </div>
            <ul className="order-list">
              {order.items.map((item) => (
                <li className="order-item" key={item._id}>
                  <span className="order-product">{item.productName}</span>
                  <span className="order-price">${item.price}</span>
                  <span className="order-qty">x{item.qty}</span>
                  <span className="order-total">${item.qty * item.price}</span>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
    </div>
  );
}