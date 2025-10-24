import React from "react";

const products = [
  { id: 1, name: "Chocolate Cake", price: 299, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Vanilla Cupcake", price: 149, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Strawberry Muffin", price: 199, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Blueberry Pie", price: 249, image: "https://via.placeholder.com/200" },
  { id: 5, name: "Red Velvet Cake", price: 349, image: "https://via.placeholder.com/200" },
  { id: 6, name: "Brownie", price: 99, image: "https://via.placeholder.com/200" },
  { id: 7, name: "Cheesecake", price: 399, image: "https://via.placeholder.com/200" },
  { id: 8, name: "Chocolate Donut", price: 129, image: "https://via.placeholder.com/200" },
];

const ProductGrid = () => {
  return (
    <div className="p-10 bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">₹{product.price}</p>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
