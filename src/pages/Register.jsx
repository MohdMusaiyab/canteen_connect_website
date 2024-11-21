import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });
  //Getting the Current user from Redux Store
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser?._id;
      navigate(`/profile/${userId}`);
    }
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register-user`,
        formData
      );
      console.log("Form Submitted:", res);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12  px-4 sm:px-6 lg:px-8">
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
            mt-6
            rounded-2xl 
            shadow-2xl 
            border 
            border-cyan-400 
            space-y-6
          "
        >
          <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">
            Register
          </h2>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
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

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

            {/* Contact Input */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Contact Number"
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

            {/* Address Input */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-cyan-400" />
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Your Address"
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
                  min-h-[100px]
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
            Register
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="
                text-cyan-400 
                hover:text-cyan-300 
                transition 
                duration-300 
                inline-block
              "
            >
              Already Have an Account? Login Here
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
