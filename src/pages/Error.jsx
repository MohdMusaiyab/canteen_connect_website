import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-semibold text-red-500 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-700 mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Error;
