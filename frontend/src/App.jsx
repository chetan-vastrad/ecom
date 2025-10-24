import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import EditProduct from "./pages/EditProduct";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
