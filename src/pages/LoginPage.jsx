import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authenticationApi";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const responese = await loginUser(form.email, form.password);
      console.log("Login Success:", responese);
      login(responese.user);
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
    // Panggil API login di sini
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-3 pb-40">
      {/* logo */}
      <div className="text-3xl mb-8 font-bold">
        <h1>PicMe</h1>
      </div>

      {/* form */}
      <div className="w-full bg-red-300 max-w-md pb-3.5 shadow-md rounded-lg p-6 border">
        <span className="px-3 text-xl">Login</span>
        <form
          action=""
          className="flex flex-col gap-4.5 items-center px-3 mt-3 "
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full text-center text-md font-bold text-red-600 border border-red-400 bg-red-100 p-2 rounded-md mb-2">
              {error}!
            </div>
          )}
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={form.email}
            placeholder="Email"
            className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />

          <button
            type="submit"
            className={`
                bg-blue-500 text-white min-w-1/3 rounded-md py-2 px-6 text-lg mt-4 
                transition duration-300 shadow-md 
                ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
                }
            `}
            disabled={isLoading}
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
      <Link
        to="/explore"
        className="bg-blue-500 text-white p-2 rounded-md mt-3 text-center transition duration-300
         hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
      >
        {"Or continue without login =>"}
      </Link>
    </div>
  );
};

export default LoginPage;
