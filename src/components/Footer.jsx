import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaQuestionCircle,
} from "react-icons/fa";

import Cookies from "js-cookie";

const Footer = () => {
  return (
    <footer className="bg-[#FE724C] text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div>
          <h5 className="uppercase mb-6 font-bold text-base flex items-center">
            <FaUser className="mr-2" /> Company
          </h5>
          <ul className="mb-4">
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-300">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="uppercase mb-6 font-bold text-base flex items-center">
            <FaQuestionCircle className="mr-2" /> Support
          </h5>
          <ul className="mb-4">
            <li>
              <Link to="/faq" className="hover:text-gray-300">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-gray-300">
                Help center
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-300">
                Terms of service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="uppercase mb-6 font-bold text-base flex items-center">
            <FaUser className="mr-2" /> Account
          </h5>
          <ul className="mb-4">
            {Cookies.get("token") ? (
              <li>
                <Link to="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/cart"
                className="flex items-center hover:text-gray-300"
              >
                Cart <FaShoppingCart className="ml-1" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="uppercase mb-6 font-bold text-base flex items-center">
            Follow us
          </h5>
          <div className="flex">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 mr-4"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 mr-4"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white-700 pt-10 text-center">
        <p className="text-sm white">
          © 2024 Canteen Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
