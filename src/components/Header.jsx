import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import "./header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="Header">
      <div className="logo">
        <Link to="/">MERN Café</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">My Cart</Link>
        <Link to="/order">My Order</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.token ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}