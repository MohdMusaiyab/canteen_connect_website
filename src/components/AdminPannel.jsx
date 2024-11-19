import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  LogOut,
} from "lucide-react";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className="flex items-center gap-3 w-full py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
      onClick={() => setIsMobileOpen(false)}
    >
      <Icon size={20} className="text-cyan-400" />
      <span>{children}</span>
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col  bg-gray-950 text-gray-100">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden p-4 border-b border-gray-800">
        <h2 className="text-cyan-400 font-semibold text-lg">Admin Panel</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto space-y-2 p-2 mt-20">
        <NavLink to={`/profile/${currentUser?._id}`} icon={LayoutDashboard}>
          Dashboard
        </NavLink>
        <NavLink to={`/profile/${currentUser?._id}/orders`} icon={ShoppingCart}>
          Orders
        </NavLink>
        <NavLink to={`/profile/${currentUser?._id}/my-products`} icon={Package}>
          My Products
        </NavLink>
        <NavLink
          to={`/profile/${currentUser?._id}/categories`}
          icon={FolderTree}
        >
          Categories
        </NavLink>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full mt-4 py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
        >
          <LogOut size={20} className="text-cyan-400" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 md:hidden z-30 p-3 rounded-full bg-cyan-500 text-white shadow-lg hover:opacity-90 transition-opacity"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-45 sticky  h-screen overflow-hidden bg-gray-950 border-r border-gray-800 shadow-lg ">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleSidebar}
        />

        {/* Mobile Sidebar Content */}
        <aside className="absolute right-0 h-full w-80 bg-gray-950 border-l border-gray-800 shadow-lg">
          <SidebarContent />
        </aside>
      </div>
    </>
  );
};

export default AdminPanel;
