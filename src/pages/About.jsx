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
      className={`${containerClasses} bg-gray-900 p-8 rounded-lg border border-cyan-400`}
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
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4 text-center md:text-left">
          {title}
        </h2>
        <p className="text-lg text-gray-400 text-center md:text-left">
          Canteen Connect simplifies your college dining experience by eliminating long queues and providing instant, hassle-free food ordering directly from your campus canteen.
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="bg-gray-950 min-h-screen py-24 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-300 mb-8">
            About Canteen Connect
          </h1>
          <AboutDescription />
        </motion.div>

        <div className="mt-20 space-y-12">
          <FeatureSection
            image={f3}
            title="Instant Ordering, Zero Wait"
          />
          <FeatureSection
            image={f2}
            title="Smart Campus Dining Solution"
            isReversed
          />
          <FeatureSection
            image={f1}
            title="Transform Your Campus Meal Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default About;