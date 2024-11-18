import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className=" hover:text-blue-500 transition duration-300 py-2 px-3 rounded-md hover:bg-blue-200"
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
    <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? "bg-gradient-to-b from-[#f0ecec] to-[#8bc1ff] text-white shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="logo.png" alt="Logo" className="h-10" />
            <h1 className="text-white font-bold text-xl">FoodDeliveryApp</h1>
          </Link>

          {/* Navigation Links for larger screens */}
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {Cookies.get("userToken") ? (
              <NavLink to={`/profile/${currentUser?._id}`}>
                <div className="flex items-center space-x-2">
                  <span>{currentUser?.name || "Profile"}</span>
                  <FaUser />
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
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
              className="md:hidden mt-4 bg-[#FD5E34] rounded-lg shadow-lg"
            >
              <div className="flex flex-col p-4 space-y-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                {Cookies.get("userToken") ? (
                  <NavLink to={`/profile/${currentUser?._id}`}>
                    <div className="flex items-center space-x-2">
                      <span>{currentUser?.name || "Profile"}</span>
                      <FaUser />
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