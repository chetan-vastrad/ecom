import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { name, email, password } = formData;
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="border p-2 w-full mb-3"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="border p-2 w-full mb-3"
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
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-center text-black">
          have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login Here
          </Link>
        </p>
        {isError && <p className="text-red-500 mt-2">{message}</p>}
        {isSuccess && (
          <p className="text-green-600 mt-2">Registered successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Register;
