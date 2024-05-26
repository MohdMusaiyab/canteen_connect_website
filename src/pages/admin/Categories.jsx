import React, { useState, useEffect } from "react";
import AdminPanel from "../../components/AdminPannel";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
import Cookies from "js-cookie";

const Categories = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();
  const token = Cookies.get("userToken");
  const getVendorCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/category/get-vendor-categories/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategories([]); // Clear the categories before fetching new data
    getVendorCategories();
  }, [id, currentUser._id]); // Re-fetch data when id or currentUser._id changes

  const showModal = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.put(
        `http://localhost:3000/api/v1/category/update-category/${selectedCategory._id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //Need to check here
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
        `http://localhost:3000/api/v1/category/delete-category/${selectedCategory._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Assuming your categories state is named 'categories' and the setter is 'setCategories'
      setCategories(
        categories.filter((category) => category._id !== selectedCategory._id)
      );

      setIsModalVisible(false);
      setSelectedCategory(null);
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminPanel />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Categories for the Admin</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {categories.length > 0 ? (
            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="border-b pb-2 cursor-pointer"
                  onClick={() => showModal(category)}
                >
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No categories available.</p>
          )}
        </div>
      </div>
      <Modal
        title="Edit Category"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the category description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
