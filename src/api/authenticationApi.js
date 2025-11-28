import axiosInstance from "../utils/axiosInstance";

const fetchUserById = async () => {
    const response = await axiosInstance.get(`/login`,
        { params: {email:}}
    )
    console.log(response.data.data)
    return response.data.data;

}
export { fetchUserById };