import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 text-gray-100">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl border border-cyan-400 text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-300 mb-6">
          Oops! The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="
            inline-block 
            px-6 
            py-3 
            rounded-lg 
            bg-cyan-600 
            text-gray-100 
            hover:bg-cyan-500 
            hover:shadow-lg 
            transition 
            duration-300 
            transform 
            hover:scale-105
          "
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Error;
