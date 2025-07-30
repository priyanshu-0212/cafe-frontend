import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {error && <div className="cart-error">{error}</div>}
      <ul className="cart-list">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li className="cart-item" key={value._id}>
                  <span className="cart-product">{value.productName}</span>
                  <span className="cart-price">${value.price}</span>
                  <div className="cart-qty-controls">
                    <button className="cart-btn" onClick={() => decrement(value._id, value.qty)}>-</button>
                    <span className="cart-qty">{value.qty}</span>
                    <button className="cart-btn" onClick={() => increment(value._id, value.qty)}>+</button>
                  </div>
                  <span className="cart-total">${value.price * value.qty}</span>
                </li>
              )
          )}
      </ul>
      <div className="cart-summary">
        <span>Order Value:</span>
        <span className="cart-order-value">${orderValue}</span>
      </div>
      <div className="cart-action">
        {user?.token ? (
          <button className="cta-btn" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="cta-btn" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </div>
    </div>
  );
}