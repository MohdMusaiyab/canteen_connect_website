import React from "react";
import AdminPannel from "../../components/AdminPannel";
import { useSelector } from "react-redux";
const AdminProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="flex h-screen ">
      {/* AdminPanel acting as the sidebar */}
      <AdminPannel />

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p>Welcome, {currentUser?.name}</p>
        {/* Add your main content here */}
        <div>
          <h1>Menu Here</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
