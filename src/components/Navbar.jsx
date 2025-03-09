import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">My Blog</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
