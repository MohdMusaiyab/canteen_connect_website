import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminPanel from "../../components/AdminPannel";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";

const CreateProduct = () => {
  const { id } = useParams();
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("userToken");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [vendorCategories, setVendorCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const getVendorProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/get-products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyProducts(res?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async (product) => {
    setLoadingMessage("Creating Product...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/product/create-product`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getVendorProducts();
      setLoadingMessage("");
      closeModal();
    } catch (error) {
      console.log(error);
      setLoadingMessage("");
    }
  };

  const handleEditProduct = async (product) => {
    setLoadingMessage("Updating Product...");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/product/update-product/${
          product._id
        }`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getVendorProducts();
      setLoadingMessage("");
      closeModal();
    } catch (error) {
      console.log(error);
      setLoadingMessage("");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/product/delete-product/${productId}`,
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
          `${
            import.meta.env.VITE_API_BASE_URL
          }/category/get-vendor-categories/${currentUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVendorCategories(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getVendorCategories();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    setUploadError(null);

    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setUploadingImage(false);
          setUploadError("Maximum Image Size is 2MB");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadingImage(false);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Function to close modal on outside click
  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminPanel />
      <div className="flex-1 p-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-bold text-cyan-300">My Products</h1>
            <button
              onClick={() => openModal(null, "add")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-lg">+ Add Product</span>
            </button>
          </div>

          {myProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-600 transition-all duration-300 shadow-lg hover:shadow-cyan-900/20"
                >
                  <div className="aspect-video w-full bg-gray-800">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="text-gray-400">
                        <span className="text-cyan-400">₹</span> {product.price}
                      </span>
                      <span className="text-gray-400">
                        <span className="text-cyan-400">⏱</span>{" "}
                        {product.cookingTime}min
                      </span>
                      <span className="text-gray-400">
                        <span className="text-cyan-400">📦</span>{" "}
                        {product.quantity} left
                      </span>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => openModal(product, "edit")}
                        className="px-4 py-2 text-cyan-400 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openModal(product, "delete")}
                        className="px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No Products available.</p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 modal-overlay"
            onClick={handleModalOutsideClick}
          >
            <div
              className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === "edit" && selectedProduct && (
  <>
    <h2 className="text-2xl font-semibold mb-6 text-cyan-300">
      Edit Product
    </h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setLoadingMessage("Updating Product...");
          let photoURL = selectedProduct.photo;

          // If a new file is selected, upload it
          if (file) {
            photoURL = await handleImageUpload(file);
          }

          const updatedProduct = {
            ...selectedProduct,
            photo: photoURL,
          };

          handleEditProduct(updatedProduct);
        } catch (error) {
          console.log(error);
          setLoadingMessage("");
        }
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-gray-400 mb-2">Name</label>
        <input
          type="text"
          value={selectedProduct.name}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              name: e.target.value,
            })
          }
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
      </div>
      <div>
        <label className="block text-gray-400 mb-2">Description</label>
        <textarea
          value={selectedProduct.description}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              description: e.target.value,
            })
          }
          rows="3"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-2">Price</label>
          <input
            type="number"
            value={selectedProduct.price}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                price: e.target.value,
              })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={selectedProduct.cookingTime}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                cookingTime: e.target.value,
              })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-2">Quantity</label>
          <input
            type="number"
            value={selectedProduct.quantity}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                quantity: e.target.value,
              })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Category</label>
          <select
            value={selectedProduct.category}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                category: e.target.value,
              })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          >
            {vendorCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-gray-400 mb-2">Photo</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
        />
        {uploadError && (
          <p className="text-red-400 text-sm mt-1">{uploadError}</p>
        )}
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={closeModal}
          className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-300"
          disabled={uploadingImage}
        >
          {loadingMessage || "Update"}
        </button>
      </div>
    </form>
  </>
)}


              {modalType === "delete" && selectedProduct && (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                    Confirm Deletion
                  </h2>
                  <p className="mb-6 text-gray-400">
                    Are you sure you want to delete{" "}
                    <span className="text-cyan-400 font-semibold">
                      {selectedProduct.name}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(selectedProduct._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {modalType === "add" && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-cyan-300">
                    Add New Product
                  </h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (file) {
                        try {
                          setLoadingMessage("Creating Product...");
                          const photoURL = await handleImageUpload(file);
                          setLoadingMessage("");
                          const newProduct = {
                            name: e.target.name.value,
                            description: e.target.description.value,
                            price: parseInt(e.target.price.value),
                            category: e.target.category.value,
                            cookingTime: parseInt(e.target.cookingTime.value),
                            photo: photoURL,
                            quantity: parseInt(e.target.quantity.value),
                          };
                          handleAddProduct(newProduct);
                        } catch (error) {
                          console.log(error);
                          setLoadingMessage("");
                        }
                      } else {
                        setUploadError("Please select an image.");
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        required
                        rows="3"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                        >
                          {vendorCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Cooking Time (minutes)
                        </label>
                        <input
                          type="number"
                          name="cookingTime"
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Photo
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                        />
                        {uploadError && (
                          <p className="text-red-400 text-sm mt-1">
                            {uploadError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-300"
                        disabled={uploadingImage}
                      >
                        {loadingMessage || "Add Product"}
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
