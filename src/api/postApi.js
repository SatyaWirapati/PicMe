import axiosInstance from "../utils/axiosInstance";

const fetchExplorePosts = async (page = 1, size = 9) => {

    const response = await axiosInstance.get("/explore-post", {
        params: { page, size },
    });

    return response.data.data;
}
const fetchHomePosts = async (page =1, size =9)=> {
    const response = await axiosInstance.get("/following-post",{
        params: {page, size},
    });
    return response.data.data;
}

const fetchPostById = async (postId) =>  {
    const response =  await axiosInstance.get(`/post/${postId}`)
    console.log(response.data.data)
    return response.data.data;
}

export {fetchExplorePosts,fetchHomePosts,fetchPostById};