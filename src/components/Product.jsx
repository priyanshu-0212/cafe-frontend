import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./product.css"; // Assuming you have a CSS file for styling
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };
  return (
     <div className="product-list">
      {products &&
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              className="product-image"
              // src={`${API_URL}/${product.imgUrl}`}
                            src={product.imgUrl}

              alt={product.productName}
            />
            <div className="product-title">{product.productName}</div>
            <div className="product-desc">{product.description}</div>
            <div className="product-price">${product.price}</div>
            <button className="cta-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}