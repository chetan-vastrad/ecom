import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams(); // 👈 extract id from URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        console.log("API Response:", res.data);

        // ✅ Use the correct key name from your backend
        setProduct(res.data.singleProduct || res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handelDispatch = (p) =>{
    dispatch(addToCart(p))
  }

  if (!product)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  console.log("Product:", product);

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="w-full  object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-white text-lg mb-2">
            Category: {product.category}
          </p>
          <p className="text-2xl text-indigo-600 font-semibold mb-4">
            ₹{product.price}
          </p>
          <p className="text-white mb-6">{product.description}</p>

          <button 
          onClick={()=>{handelDispatch(product)}}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
