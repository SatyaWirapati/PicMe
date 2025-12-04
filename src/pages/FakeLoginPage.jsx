import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authenticationApi";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { fetchUserById } from "../api/userApi";

const FakeLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetchUserById(form.id);

      console.log("Login Success:", response);

      // buang totalFollowing & totalFollowers
      const { totalFollowing, totalFollowers, ...safeUser } = response;

      login(safeUser);
      showNotification("Login In");
      navigate("/explore");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login gagal. Periksa kredensial Anda.";
      setError(errorMessage);
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-3 pb-40">
      {/* logo */}
      <div className="text-3xl mb-8 font-bold">
        <h1>PicMe</h1>
      </div>

      {/* form */}
      <div className="w-full bg-red-300 max-w-md pb-3.5 shadow-md rounded-lg p-6 border">
        <span className="px-3 text-xl">Fake Login</span>
        <form
          className="flex flex-col gap-4 items-center px-3 mt-3"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full text-center text-md font-semibold text-red-600 border border-red-400 bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}

          <input
            onChange={handleChange}
            type="text"
            name="id"
            value={form.id}
            placeholder="User ID"
            className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password (ignored)"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`
      bg-blue-500 text-white min-w-[140px] rounded-md py-2 px-6 text-lg mt-4 
      transition duration-300 shadow-md 
      ${
        isLoading
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
      }
    `}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* sign up */}
        <div className=" mx-auto flex justify-center mt-4 text-lg">
          <span className=" mr-2">Dont't have an account? </span>
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FakeLoginPage;
