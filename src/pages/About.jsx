import React from "react";
import { motion } from "framer-motion";
import f1 from "../assets/f1.svg";
import f2 from "../assets/f2.svg";
import f3 from "../assets/f3.svg";
import AboutDescription from "../components/AboutDescription";

const FeatureSection = ({ image, title, isReversed }) => {
  const containerClasses = `flex flex-col ${
    isReversed ? "md:flex-row-reverse" : "md:flex-row"
  } items-center mb-20 md:mb-32`;

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.img
          src={image}
          alt={title}
          className="w-1/3 md:w-1/2 mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
          {title}
        </h2>
        <p className="text-lg text-gray-600 text-center md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8">
            About Our Service
          </h1>
          <AboutDescription />
        </motion.div>

        <div className="mt-20">
          <FeatureSection
            image={f3}
            title="Get Ready to Satisfy Your Cravings in Just a Few Taps"
          />
          <FeatureSection
            image={f2}
            title="Enjoy Hassle-Free Ordering and Quick Pickups"
            isReversed
          />
          <FeatureSection
            image={f1}
            title="Say Goodbye to Long Queues and Waiting Time"
          />
        </div>
      </div>
    </div>
  );
};

export default About;