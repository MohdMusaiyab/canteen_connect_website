import React, { useState, useEffect } from "react";
import AdminPanel from "../../components/AdminPannel";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Categories = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const token = Cookies.get("userToken");

  const getVendorCategories = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/category/get-vendor-categories/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategories([]);
    getVendorCategories();
  }, [id, currentUser._id]);

  const showModal = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsModalVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/category/update-category/${
          selectedCategory._id
        }`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(response?.data?.data);
      getVendorCategories();
      setIsModalVisible(false);
      setSelectedCategory(null);
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/category/delete-category/${
          selectedCategory._id
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(
        categories.filter((category) => category._id !== selectedCategory._id)
      );
      setIsModalVisible(false);
      setSelectedCategory(null);
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/category/create-category/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, response?.data?.data]);
      setIsCreateModalVisible(false);
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.log("Create failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminPanel />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl font-bold mb-8 text-cyan-300">
            My Categories
          </h1>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
            {categories.length > 0 ? (
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className="border border-gray-800 p-4 rounded-lg hover:border-cyan-600 transition-all duration-300 cursor-pointer bg-gray-900 hover:shadow-lg hover:shadow-cyan-900/20"
                    onClick={() => showModal(category)}
                  >
                    <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-400">{category.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No categories available.</p>
            )}
          </div>

          <button
            onClick={() => setIsCreateModalVisible(true)}
            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300 mb-2"
          >
            Create Category
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">
              Edit Category
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalVisible(false)}
                  className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300 ">
              Create Category
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalVisible(false)}
                  className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
