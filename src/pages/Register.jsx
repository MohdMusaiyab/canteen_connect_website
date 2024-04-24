import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
   
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    // You can add your registration logic here
    const res=await axios.post("http://localhost:3000/api/v1/users/register-user",formData);
    console.log(res);
    console.log('Form Submitted:', formData);
    navigate("/login")
  };
  return (
    <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </label>
    <br />
    <label>
      Email:
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </label>
    <br />
    <label>
      Contact:
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
    </label>
    <br />
    <label>
      Address:
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
    </label>
    <br />
    <button type="submit">Register</button>
  </form>
  );
};

export default Register;
