import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Panggil API login di sini
        console.log("LOGIN:", form);

        // Jika login berhasil → redirect ke explore
        navigate("/explore");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
            
            {/* Logo */}
            <h1 className="text-3xl font-bold mb-8">PicMe</h1>

            {/* Card */}
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 border">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900"
                    >
                        Log In
                    </button>

                </form>
            </div>

            <div className="w-full max-w-sm mt-4 bg-white border p-4 text-center rounded-lg">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link to="/register" className="text-blue-600 font-semibold">
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
