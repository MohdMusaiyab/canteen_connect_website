import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

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
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg max-w-md w-full space-y-6"
        style={{ boxShadow: "0 4px 10px rgba(254, 114, 76, 0.5)" }}
      >
        <h2 className="text-2xl font-semibold text-center text-[#FE724C]">
          Register
        </h2>
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-gray-700">
            Contact:
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FE724C]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FE724C] text-white py-2 rounded-lg hover:bg-[#FE5730] transition duration-300"
        >
          Register
        </button>
        <Link
          to="/login"
          className="text-[#FE724C] text-center block transform hover:scale-110 transition-transform duration-300 ease-out"
        >
          Already Have an Account? Login Here
        </Link>
      </form>
    </div>
  );
};

export default Register;
