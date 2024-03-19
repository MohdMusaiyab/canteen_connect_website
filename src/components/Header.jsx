import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-yellow-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-10 mr-4" />
          <h1 className="text-white font-semibold text-xl">FoodDeliveryApp</h1>
        </div>

        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-yellow-100">
            Home
          </Link>

          <Link to="/about" className="text-white hover:text-yellow-100">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-yellow-100">
            Contact
          </Link>
          <Link to='/login' className="text-white hover:text-yellow-100">Login</Link>
        </nav>

        {/* Mobile Menu Button (Hidden on larger screens) */}
        <button className="md:hidden text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
