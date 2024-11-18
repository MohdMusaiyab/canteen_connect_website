import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaQuestionCircle,
  FaBuilding,
} from "react-icons/fa";
import Cookies from "js-cookie";

const FooterSection = ({ title, icon, children }) => (
  <div className="mb-8 md:mb-0">
    <h5 className="uppercase mb-4 font-bold text-lg flex items-center text-gray-800">
      {icon}
      <span className="ml-2">{title}</span>
    </h5>
    <ul className="space-y-2">
      {children}
    </ul>
  </div>
);

const FooterLink = ({ to, children, external = false }) => {
  const baseClasses = "text-gray-800 hover:text-blue-500  transition duration-300 flex items-center";
  
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
      </a>
    );
  }
  
  return (
    <Link to={to} className={baseClasses}>
      {children}
    </Link>
  );
};

const SocialIcon = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-800 hover:text-yellow-500 transition duration-300 text-2xl mr-4"
  >
    <Icon />
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#f0ecec] to-[#8bc1ff] text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection title="Company" icon={<FaBuilding className="text-xl" />}>
            <li><FooterLink to="/about">About us</FooterLink></li>
            <li><FooterLink to="/careers">Careers</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
          </FooterSection>

          <FooterSection title="Support" icon={<FaQuestionCircle className="text-xl" />}>
            <li><FooterLink to="/faq">FAQs</FooterLink></li>
            <li><FooterLink to="/help">Help center</FooterLink></li>
            <li><FooterLink to="/terms">Terms of service</FooterLink></li>
          </FooterSection>

          <FooterSection title="Account" icon={<FaUser className="text-xl" />}>
            {Cookies.get("token") ? (
              <li><FooterLink to="/profile">Profile</FooterLink></li>
            ) : (
              <li><FooterLink to="/login">Login</FooterLink></li>
            )}
            <li>
              <FooterLink to="/cart">
                Cart <FaShoppingCart className="ml-1" />
              </FooterLink>
            </li>
          </FooterSection>

          <div>
            <h5 className="uppercase mb-4 font-bold text-lg flex items-center text-gray-800">
              Follow us
            </h5>
            <div className="flex">
              <SocialIcon href="https://facebook.com" icon={FaFacebook} />
              <SocialIcon href="https://twitter.com" icon={FaTwitter} />
              <SocialIcon href="https://instagram.com" icon={FaInstagram} />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-400 border-opacity-20 text-center">
          <p className="text-sm text-gray-800">
            © {new Date().getFullYear()} Canteen Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
