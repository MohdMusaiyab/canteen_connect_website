import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminPanel from "../../components/AdminPannel";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const { id } = useParams();
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit", "delete" or "add"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("userToken");
  const currentUser = useSelector((state) => state.user.currentUser);

  const [vendorCategories, setVendorCategories] = useState([]);

  const getVendorProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/product/get-products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyProducts(res?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/product/create-product",
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getVendorProducts();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/product/update-product/${product._id}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getVendorProducts();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/product/delete-product/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getVendorProducts();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    setMyProducts([]);
    getVendorProducts();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const getVendorCategories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/category/get-vendor-categories/${currentUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVendorCategories(res?.data?.data);
        console.log(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getVendorCategories();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminPanel />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">My Products</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {myProducts.length > 0 ? (
            <ul className="space-y-4">
              {myProducts.map((product) => (
                <li
                  key={product._id}
                  className="border-b pb-2 cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(product, "edit")}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModal(product, "delete")}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No Products available.</p>
          )}
        </div>
        <button
          onClick={() => openModal(null, "add")}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Product
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              {modalType === "edit" && selectedProduct && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditProduct(selectedProduct);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={selectedProduct.description}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </>
              )}
              {modalType === "delete" && selectedProduct && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    Confirm Deletion
                  </h2>
                  <p className="mb-4">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {selectedProduct.name}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(selectedProduct._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              {modalType === "add" && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newProduct = {
                        name: e.target.name.value,
                        description: e.target.description.value,
                        price: parseInt(e.target.price.value),
                        category: e.target.category.value,
                        cookingTime: parseInt(e.target.cookingTime.value),
                        photo: e.target.photo.value,
                        quantity: parseInt(e.target.quantity.value),
                      };
                      handleAddProduct(newProduct);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      >
                        {vendorCategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Cooking Time (minutes)
                      </label>
                      <input
                        type="number"
                        name="cookingTime"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Photo URL
                      </label>
                      <input
                        type="text"
                        name="photo"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
