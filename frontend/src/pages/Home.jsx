import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryGrid from "./CategoryGrid";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useSearch } from "../context/SearchContext"
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { searchTerm } = useSearch();
  const navigation = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ecom-qca1.onrender.com/api/products");
        setProducts(res.data.product);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

    const handleAddToCart = (product) => {
    dispatch(addToCart(product));
   Swal.fire({
    title: "Added to Cart!",
    text: `${product.name} has been added to your cart.`,
    icon: "success",
    confirmButtonText: "OK",
    timer: 1500, // optional auto-close after 1.5s
    showConfirmButton: false, // hide OK button (optional)
  });
  };

    const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Remove max-w-7xl mx-auto to make it full width */}
      <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
        {/* <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
          Our Products
        </h3> */}
        <CategoryGrid/>

        {/* Keep the grid layout but it will now span full width */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No products found for "{searchTerm}"
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={`https://ecom-qca1.onrender.com${item.image}`}
                  alt={item.name}
                  onClick={()=>navigation(`/product/${item._id}`)}
                  className="w-full h-56 object-cover cursor-pointer"
                />
                <div className="p-4 text-center flex flex-col">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-indigo-600 font-bold mt-2">
                    ₹{item.price}
                  </p>
                  <p className="text-gray-500 mt-2">{item.description}</p>
                  {/* <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-5 bg-blue-500 text-black px-6 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white transition duration-300 font-semibold flex items-center gap-2 justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13h10"
                      />
                    </svg>
                    Add to Cart
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer/>
    </div>
  );
};

export default Home;