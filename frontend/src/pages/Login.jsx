import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode"; // ✅ works perfectly with v3.1.2

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isSuccess && user?.token) {
      try {
        const decoded = jwtDecode(user.token); // ✅ decode JWT
        console.log("Decoded Token:", decoded.id);

        if (decoded.role === "admin") {
          navigate("/admin/dashboard"); // admin redirect
        } else {
          navigate("/"); // normal user redirect
        }
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, [isSuccess, user, navigate]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>

        <input
          className="border p-2 w-full mb-3 text-black"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="border p-2 w-full mb-3 text-black"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
         <p className="mt-4 text-center text-black">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
        <div className="text-blue-400 text-sm text-center">
        <p>Admin Login</p>
        <p>UserName: admingmail.com password: 123456</p>
        </div>
        <div className="text-blue-400 text-sm text-center">
        <p>User Login</p>
        <p>UserName: test@gmail.com password: 123456</p>
        </div>
        {isError && <p className="text-red-500 mt-2">{message}</p>}
        {isSuccess && (
          <p className="text-green-600 mt-2">Login successful!</p>
        )}
      </form>
    </div>
  );
};

export default Login;
