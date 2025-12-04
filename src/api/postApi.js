import axiosInstance from "../utils/axiosInstance";

const fetchExplorePosts = async (page = 1, size = 9) => {
  const response = await axiosInstance.get("/explore-post", {
    params: { page, size },
  });

  return response.data.data;
};

const fetchHomePosts = async (page = 1, size = 9) => {
  const response = await axiosInstance.get("/following-post", {
    params: { page, size },
  });
  return response.data.data;
};

const fetchPostById = async (postId) => {
  const response = await axiosInstance.get(`/post/${postId}`);
  console.log(response.data.data);
  return response.data.data;
};

const createPost = async (form) => {
  const response = await axiosInstance.post("/create-post", form);
  console.log(response.data);
  return response.data;
};

const fetchPostByUserId = async (userId) => {
  const respones = await axiosInstance.get(`/users-post/${userId}`, {
    params: { page: 1, size: 10 },
  });
  return respones.data.data;
};

const postUpdate = async (postId) => {
  const respones = await axiosInstance.post(`/update-post/${postId}`)
  console.log(respones);
  return respones.data;
}

export {
  fetchExplorePosts,
  fetchHomePosts,
  fetchPostById,
  fetchPostByUserId,
  createPost,
  postUpdate
};
