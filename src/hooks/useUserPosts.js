import { useState, useCallback } from "react";
import { fetchPostByUserId } from "../api/postApi";

const useUserPosts = (userId, size = 9) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const getPosts = useCallback(async () => {
    if (!userId) return;
    if (loading) return;
    if (totalPages && page > totalPages) return;

    setLoading(true);
    try {
      const data = await fetchPostByUserId(userId, page, size);
      const filtered = data.posts.filter((p) => p.imageUrl);

      setPosts((prev) => [...prev, ...filtered]);

      if (!totalPages) setTotalPages(data.totalPages);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [userId, page, size, loading, totalPages]);

  return {
    posts,
    loading,
    getPosts,
    hasMore: totalPages === null || page <= totalPages,
  };
};

export default useUserPosts;
