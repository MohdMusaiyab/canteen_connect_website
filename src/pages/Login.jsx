import React, { useState } from "react";
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

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
      navigate(`/profile/${res.data?.user?._doc._id}`);
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error.message));
    } finally {
      dispatch(signInComplete());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg max-w-md w-full space-y-6"
        style={{ boxShadow: "0 4px 10px rgba(254, 114, 76, 0.5)" }}
      >
        <h2 className="text-2xl font-semibold text-center text-[#FE724C]">
          Login
        </h2>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FE724C] text-white py-2 rounded-lg hover:bg-[#FE5730] transition duration-300"
        >
          Login
        </button>
        <Link
          to="/register"
          className="text-[#FE724C] text-center block transform hover:scale-110 transition-transform duration-300 ease-out"
        >
          Dont Have an Account? Register Here
        </Link>
      </form>
    </div>
  );
};

export default Login;
