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
export { fetchUserById, fetchLoggedUser };