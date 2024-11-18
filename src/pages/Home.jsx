import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUtensils, 
  FaClock, 
  FaQrcode, 
  FaShoppingCart 
} from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaUtensils className="text-cyan-400 text-4xl" />,
      title: "Campus Cuisine",
      description: "Order from your college canteen anytime"
    },
    {
      icon: <FaClock className="text-cyan-400 text-4xl" />,
      title: "Skip the Queue",
      description: "Pre-order and save valuable time"
    },
    {
      icon: <FaQrcode className="text-cyan-400 text-4xl" />,
      title: "Easy Pickup",
      description: "Quick QR code for order collection"
    },
    {
      icon: <FaShoppingCart className="text-cyan-400 text-4xl" />,
      title: "Real-time Menu",
      description: "Updated menu and availability"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-cyan-300">
            Canteen Connect
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Order, Pay, Pickup - No More Waiting in Line
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login"
              className="
                px-6 py-3 
                bg-cyan-600 
                text-white 
                rounded-lg 
                hover:bg-cyan-500 
                transition 
                duration-300
                flex items-center
                space-x-2
              "
            >
              <FaShoppingCart />
              <span>Start Ordering</span>
            </Link>
            <Link 
              to="/about"
              className="
                px-6 py-3 
                border 
                border-cyan-400 
                text-cyan-400 
                rounded-lg 
                hover:bg-cyan-900 
                transition 
                duration-300
              "
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid md:grid-cols-4 gap-6 text-center"
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="
                bg-gray-900 
                p-6 
                rounded-lg 
                hover:scale-105 
                transition 
                duration-300 
                hover:shadow-lg 
                hover:border 
                border-cyan-400
              "
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;