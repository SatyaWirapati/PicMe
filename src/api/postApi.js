import axiosInstance from "../utils/axiosInstance";

const fetchExplorePosts = async (page = 1, size = 9) => {

    const response = await axiosInstance.get("/explore-post", {
        params: { page, size },
    });

    return response.data.data;
}

export default fetchExplorePosts;