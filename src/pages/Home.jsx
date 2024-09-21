import React from "react";
import { useSelector } from "react-redux";
import { ShoppingBag, BarChart, Users } from "lucide-react";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Campus Shops Admin
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Manage your campus shops with ease and efficiency.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<ShoppingBag className="h-8 w-8 text-white" />}
              title="Inventory Management"
              description="Keep track of stock levels and manage products across all campus shops."
            />
            <FeatureCard 
              icon={<BarChart className="h-8 w-8 text-white" />}
              title="Sales Analytics"
              description="Get insights into sales trends and performance metrics for informed decision-making."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-white" />}
              title="User Management"
              description="Easily manage staff accounts and permissions for each campus shop."
            />
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quick Stats</h3>
                <dl className="mt-4 space-y-4">
                  <QuickStat label="Total Shops" value="12" />
                  <QuickStat label="Active Orders" value="48" />
                  <QuickStat label="Monthly Revenue" value="$52,000" />
                </dl>
              </div>
              <div className="relative h-64 sm:h-auto">
                <img
                  src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                  alt="Dashboard preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-6 py-8 bg-gray-50 sm:px-10 sm:py-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Logged in as:</span>
              <span className="text-sm font-semibold text-indigo-600">{currentUser?.name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  </div>
);

const QuickStat = ({ label, value }) => (
  <div className="flex justify-between">
    <dt className="text-sm font-medium text-gray-600">{label}</dt>
    <dd className="text-sm font-semibold text-gray-900">{value}</dd>
  </div>
);

export default Home;