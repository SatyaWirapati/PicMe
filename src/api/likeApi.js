import axiosInstance from "../utils/axiosInstance";

const likePost = async (postId) => { 
    const response = await axiosInstance.post(`/like`, { postId });
    console.log(response.data);
    return response.data;
}

const unlikePost = async (postId) => { 
    const response = await axiosInstance.post(`/unlike`, { postId });
    console.log(response.data);
    return response.data;
}
export { likePost,unlikePost };