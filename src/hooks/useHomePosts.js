import { useState, useCallback } from "react";
import {fetchHomePosts} from "../api/postApi"



const useHomePosts = (size = 9) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);

    const getPosts = useCallback(async () => {
        if (loading) return;
        if (totalPages && page > totalPages) return;
        setLoading(true);
        try {
            const data = await fetchHomePosts(page, size);
            const filtered = [];
            for (const p of data.posts){
                if(p.imageUrl && p.imageUrl.trim() !== ""){
                    filtered.push(p);
                }
            }
            setPosts(prev => [...prev, ...filtered]);
            if (!totalPages) setTotalPages(data.totalPages);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    }, [page, size, loading, totalPages])

    return {
        posts,
        loading,
        getPosts,
        hasMore: totalPages === null || page < totalPages,
    }

}

export default useHomePosts;