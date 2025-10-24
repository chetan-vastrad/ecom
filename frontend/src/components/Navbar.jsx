import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // make sure you have a logout action
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import {useSearch} from "../context/SearchContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { searchTerm, setSearchTerm } = useSearch();

  // ✅ Use Redux to detect login
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  // Cart Update

  const cartItems = useSelector((state) => state.cart.items);
  // const cartCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout()); // ✅ clears auth state in Redux
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EcomStore
        </Link>

        <form className="flex flex-1 max-w-lg border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 outline-none text-gray-700"
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 flex items-center justify-center">
            <Search size={20} />
          </button>
        </form>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition">
            <ShoppingCart size={26} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
