import axiosInstance from "../utils/axiosInstance";

const fetchFollowingStories = async (page=1,size=10) => {
    const response = await axiosInstance.get("following-story", {
        params:{page,size},
    })

    console.log(response.data.data);
    return response.data.data;
}
const fetchStoriesViewById = async (storyId,page=1,size=10) => {
    const response = await axiosInstance.get(`story-views/${storyId}`, {
        params:{page,size},
    })

    console.log(response.data.data);
    return response.data.data;
}

export {fetchFollowingStories, fetchStoriesViewById}