import axiosInstance from "../utils/axiosInstance";

const fetchUserById = async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`)
    console.log(response.data.data)
    return response.data.data;

}

const fetchLoggedUser = async () => {
    const response = await axiosInstance.get("/user");
    console.log(response.data.data);
    return response.data.data;
}

const postUpdateProfile = async (formData) => {
    const response = await axiosInstance.post("/update-profile",formData);
    console.log(response.data);
    return response.data;
}
export { fetchUserById, fetchLoggedUser, postUpdateProfile};