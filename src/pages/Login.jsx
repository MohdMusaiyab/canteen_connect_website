// Login.jsx
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

import { useNavigate } from "react-router-dom";
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
        "http://localhost:3000/api/v1/users/login",
        formData
      );
      // console.log("Response from Login:", res?.data?.token);
      Cookies.set("userToken", res?.data?.token);
      dispatch(signInSuccess(res.data?.user?._doc));
      // console.log("Logged in!");

      // console.log(user);
      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleInputChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
