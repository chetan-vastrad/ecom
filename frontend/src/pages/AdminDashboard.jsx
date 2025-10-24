import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {  
    dispatch(fetchProducts()); // fetch products when component mounts
  }, [dispatch]);

const handleDelete = async (id) => {
  // Show confirmation dialog
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action will permanently delete the product.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6", // Blue
    cancelButtonColor: "#d33",     // Red
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  // If user confirms deletion
  if (result.isConfirmed) {
    try {
      await dispatch(deleteProduct(id)).unwrap();

      // Show success message
      Swal.fire({
        title: "Deleted!",
        text: "Product deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      // Show error message
      Swal.fire({
        title: "Error!",
        text: err || "Failed to delete product.",
        icon: "error",
      });
    }
  }
};


  if (loading)
    return (
      <h4 className="text-center mt-5 text-gray-700 font-semibold">
        ⏳ Loading products...
      </h4>
    );

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="inline-flex items-center bg-green-600 text-white px-5 py-2.5 rounded-md text-lg font-medium shadow hover:bg-green-700 transition"
        >
          ➕ Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <h5 className="text-center text-gray-500 text-lg mt-20">No products found.</h5>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={product.image ? `http://localhost:8000${product.image}` : "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <p className="text-green-600 font-bold text-lg mb-2">₹{product.price}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description?.slice(0, 60)}...
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-sm text-red-500 hover:underline font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
