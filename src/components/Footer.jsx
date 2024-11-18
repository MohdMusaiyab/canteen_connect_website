import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhoneAlt 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 border-t border-cyan-400">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            Canteen Connect
          </h2>
          <p className="text-gray-400">
            Transforming campus dining with quick, convenient online ordering.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link to="/menu" className="hover:text-cyan-400 transition">Menu</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            Contact Us
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-cyan-400" />
              <span>support@canteenconnect.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-cyan-400" />
              <span>+91 1234567890</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-2xl text-gray-400 hover:text-cyan-400 transition"
            >
              <FaFacebook />
            </a>
            <a 
              href="#" 
              className="text-2xl text-gray-400 hover:text-cyan-400 transition"
            >
              <FaTwitter />
            </a>
            <a 
              href="#" 
              className="text-2xl text-gray-400 hover:text-cyan-400 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-gray-800 text-gray-500">
        © 2024 Canteen Connect. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;