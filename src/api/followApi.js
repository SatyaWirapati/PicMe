import axiosInstance from "../utils/axiosInstance";

const getFollowingById = async (userId, page=1,size=10 ) => {
    const response = await axiosInstance.get(`/following/${userId}`, {
        params: { page, size },
    });
    return response.data
}

const getFollowersById = async (userId, page = 1, size = 10) => {
    const response = await axiosInstance.get(`/followers/${userId}`, {
        params: { page, size },
    })
    return response.data;
}

export {getFollowersById, getFollowingById}