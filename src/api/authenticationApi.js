// File: ../api/authenticationApi.js
import axiosInstance from "../utils/axiosInstance";

const loginUser = async (email, password) => {
    // 1. Gunakan metode POST
    // 2. Kredensial dikirim sebagai objek di body (argumen kedua), bukan params.
    const response = await axiosInstance.post(`/login`, {
        email: email,
        password: password
    });

    return response.data;
};

const registerUser = async (formData) => {
    const response = await axiosInstance.post(`/register`, formData);
    return response.data;
}

const logoutUser = async () => {
    const response = await axiosInstance.get("/logout");
    return response.data;
}

export { loginUser, registerUser, logoutUser };