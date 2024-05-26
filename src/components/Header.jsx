import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#FE724C] py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-10 mr-4" />
          <h1 className="text-white font-semibold text-xl">FoodDeliveryApp</h1>
        </div>

        {/* Navigation Links for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          {Cookies.get("userToken") ? (
            <Link
              to={`/profile/${currentUser?._id}`}
              className="text-white hover:text-yellow-300 transition duration-300 flex items-center"
            >
              {currentUser ? (
                <>
                  {currentUser.name} <FaUser className="ml-2" />
                </>
              ) : (
                "Profile"
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button (Hidden on larger screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (visible only on small screens) */}
      {isOpen && (
        <nav className="md:hidden bg-[#FE724C]">
          <Link
            to="/"
            className="block text-white hover:text-yellow-300 transition duration-300 py-2 px-4"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-yellow-300 transition duration-300 py-2 px-4"
          >
            About
          </Link>
          {Cookies.get("userToken") ? (
            <Link
              to={`/profile/${currentUser?._id}`}
              className="block text-white hover:text-yellow-300 transition duration-300 py-2 px-4"
            >
              {currentUser ? (
                <div className="flex items-center">
                  {currentUser.name} <FaUser className="ml-2" />
                </div>
              ) : (
                "Profile"
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              className="block text-white hover:text-yellow-300 transition duration-300 py-2 px-4"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default Header;
