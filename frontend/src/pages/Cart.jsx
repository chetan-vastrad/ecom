// src/pages/Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import cart from "../assets/images/cart.png"

const Cart = () => {
  const [ closeForm, setCloseForm] =useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(true)
  const [formData,setFormData] = useState({
    name:"",
    phone:"",
    address:"",
    paymentstatus:"", 
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("formDta", formData);
     setCloseForm(true)
    setShowOrderDetails(false)
    //  dispatch(clearCart());
  }
  const openFormHandler = () =>{
    setCloseForm(false)
  }
  const handleClose = () =>{
    setCloseForm(true)
  }
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gray-50 shadow-inner p-6">
        <img
          src={cart}
          alt="Empty Cart"
          className="w-40 md:w-56 mb-6 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
        />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          🛒 Your cart is empty
        </h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Looks like you haven’t added anything yet. Start shopping and fill
          your cart with amazing products!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
     {showOrderDetails ? <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

        <div className="grid gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex bg-white rounded-lg shadow p-4 items-center justify-between"
            >
              <img
                src={`https://ecom-qca1.onrender.com${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 px-4">
                <h3 className="font-semibold text-black text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-500">{item.category}</p>
                <p className="text-green-600 font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementQuantity(item._id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="text-black">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item._id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-500 hover:underline font-medium"
              >
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center bg-white p-4 rounded shadow">
          <span className="text-xl font-semibold text-black">Total Price:</span>
          <span className="text-xl font-bold text-green-600">
            ₹{totalPrice}
          </span>
        </div>
        <div>
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-6 mr-4 bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={openFormHandler}
            className="mt-6  bg-orange-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </div>
        {closeForm ? (
          ""
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl p-10 w-full max-w-md shadow-2xl">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={handleChange}
                      value={formData.name}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      required
                      onChange={handleChange}
                      value={formData.phone}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      rows="3"
                      required
                      onChange={handleChange}
                      value={formData.address}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Type
                    </label>
                    <select
                      name="paymentstatus"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                      value={formData.paymentstatus}
                    >
                      <option value="">-- Select Payment Type --</option>
                      {["Pay Now", "Pay After Delivery"].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-6 flex justify-between items-center bg-white p-4 rounded shadow">
                    <span className="text-xl font-semibold text-black">
                      Total Price:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                    Confirm Order
                  </button>
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                  >
                    ✕
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>:
      <div className="grid p-4 bg-white mt-4 rounded-lg">
        <div className="text-xl text-black w-full text-center">
          <h1>Order Details</h1>
        </div>
        {items.map((item) => (
          <div
            key={item._id}
            className="flex  rounded-lg shadow p-4 items-center justify-between"
          >
            <img
              src={`https://ecom-qca1.onrender.com${item.image}`}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 px-4">
              <h3 className="font-semibold text-black text-lg">{item.name}</h3>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-black text-lg weight-500">
                Delivery Details
              </h2>
              <div className="mt-4 p-4 border rounded shadow">
                {Object.entries(formData).map(([key, value]) => (
                  <p key={key} className="text-black">
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </p>
                ))}
              </div>

              <button
                onClick={openFormHandler}
                className="mt-6 border border-green-500 text-green-500 px-6 py-3 rounded-xl shadow transition"
              >
                Order Confirmed Thank You !
              </button>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Cart;
