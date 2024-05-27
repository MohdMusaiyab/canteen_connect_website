import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa"; // Example icon, replace with appropriate React Icons import

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    try {
      Cookies.remove("userToken");
      dispatch(signOutUserSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure(error));
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white md:w-64">
      {/* Top Bar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center md:hidden">
        <div className="text-xl font-bold text-yellow-400">Admin Panel</div>
        <button
          onClick={toggleMenu}
          className="text-white block px-3 py-2 hover:bg-gray-700 rounded-md focus:outline-none"
        >
          <FaBars />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`flex-grow p-4 ${isMenuOpen ? "block" : "hidden md:block"}`}
      >
        <ul className="space-y-2">
          <li>
            <Link
              to={`/profile/${currentUser?._id}`}
              className="block py-2 px-4 text-white hover:bg-gray-700 border rounded-md border-transparent hover:border-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${currentUser?._id}/orders`}
              className="block py-2 px-4 text-white hover:bg-gray-700 border rounded-md border-transparent hover:border-white"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${currentUser?._id}/my-products`}
              className="block py-2 px-4 text-white hover:bg-gray-700 border rounded-md border-transparent hover:border-white"
            >
              My Products
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${currentUser?._id}/categories`}
              className="block py-2 px-4 text-white hover:bg-gray-700 border rounded-md border-transparent hover:border-white"
            >
              Categories
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="block py-2 px-4 text-white hover:bg-gray-700 border rounded-md border-transparent hover:border-white"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
