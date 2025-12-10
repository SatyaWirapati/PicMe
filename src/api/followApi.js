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

const followUser = async (userId) => {
    const response = await axiosInstance.post(`/follow`,{userIdFollow:userId} );
    return response.data;
}

const unfollowUser = async (userId) => {
    const response = await axiosInstance.delete(`/unfollow/${userId}`);
    return response.data;
}
export {getFollowersById, getFollowingById, followUser, unfollowUser}