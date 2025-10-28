import axios from "axios";

const API_URL = "https://ecom-qca1.onrender.com/api/products";

// Helper to get token
// const getToken = () => localStorage.getItem("token");
// const token = localStorage.getItem("token");
const getToken = () => JSON.parse(localStorage.getItem("user"))?.token;

// 🟢 Fetch all products (public)
const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  // Handle both array or nested data
  return (
    response.data.products ||
    response.data.product ||
    response.data ||
    []
  );
};

// 🟢 Fetch single product
const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response);
  
  return response.data.product || response.data;
};

// 🟢 Add new product (admin only)
const addProduct = async (productData) => {
  const token = getToken();
  const response = await axios.post(API_URL, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.product || response.data;
};

// 🟡 Update product (admin only)
const updateProduct = async (id, updatedData) => {
  const token = getToken();
  console.log("Updating product id:", id, "with data:", updatedData);
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.product || response.data;
};

// 🔴 Delete product (admin only)
const deleteProduct = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.message || "Product deleted successfully";
};

// 🧾 Export all product services
export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
