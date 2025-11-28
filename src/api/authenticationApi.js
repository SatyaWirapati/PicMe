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

export { loginUser };