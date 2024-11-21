import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  signInSuccess,
  signInComplete,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import socket from "../../socket";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      //Getting the user from Redux

      navigate(`/profile/${currentUser?._id}`);
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        formData
      );
      Cookies.set("userToken", res?.data?.token);
      dispatch(signInSuccess(res.data?.user?._doc));
      socket.emit("login", res.data?.user?._doc._id);
      navigate(`/profile/${res.data?.user?._doc._id}`);
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error.message));
    } finally {
      dispatch(signInComplete());
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="
            bg-gray-900 
            p-8 
            rounded-2xl 
            shadow-2xl 
            border 
            border-cyan-400 
            space-y-6
          "
        >
          <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">
            Canteen Connect
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                required
                placeholder="Email Address"
                className="
                  w-full 
                  p-3 
                  pl-10 
                  bg-gray-800 
                  text-gray-100 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-cyan-400
                "
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
                required
                placeholder="Password"
                className="
                  w-full 
                  p-3 
                  pl-10 
                  bg-gray-800 
                  text-gray-100 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-cyan-400
                "
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full 
              bg-cyan-600 
              text-white 
              py-3 
              rounded-lg 
              hover:bg-cyan-500 
              transition 
              duration-300 
              transform 
              hover:scale-105
            "
          >
            Login
          </button>

          <div className="text-center">
            <Link
              to="/register"
              className="
                text-cyan-400 
                hover:text-cyan-300 
                transition 
                duration-300 
                inline-block
              "
            >
              Don't Have an Account? Register Here
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
