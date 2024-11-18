import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-cyan-400 transition duration-300 py-2 px-3 rounded-md hover:bg-gray-800"
  >
    {children}
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`
        fixed w-full z-50 transition-all duration-300 
        ${scrolled 
          ? "bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl" 
          : "bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl"}
      `}
    >
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="logo.png" 
              alt="Logo" 
              className="h-10 rounded-full ring-2 ring-cyan-400" 
            />
            <h1 className="text-cyan-300 font-bold text-xl">FoodDeliveryApp</h1>
          </Link>

          {/* Navigation Links for larger screens */}
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {Cookies.get("userToken") ? (
              <NavLink to={`/profile/${currentUser?._id}`}>
                <div className="flex items-center space-x-2">
                  <span>{currentUser?.name || "Profile"}</span>
                  <FaUser className="text-cyan-400" />
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-cyan-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="
                md:hidden 
                mt-4 
                bg-gray-900 
                rounded-lg 
                shadow-2xl 
                border border-gray-800
              "
            >
              <div className="flex flex-col p-4 space-y-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                {Cookies.get("userToken") ? (
                  <NavLink to={`/profile/${currentUser?._id}`}>
                    <div className="flex items-center space-x-2">
                      <span>{currentUser?.name || "Profile"}</span>
                      <FaUser className="text-cyan-400" />
                    </div>
                  </NavLink>
                ) : (
                  <NavLink to="/login">Login</NavLink>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;