import { useState, useCallback } from "react";
import fetchExplorePosts from "../api/postApi"

const isValidImage = async (url)=> {
    try {
        const res = await fetch(url, {method:"HEAD"})
        return res.ok && res.headers.get("content-type")?.startsWith("image");
    }catch {
        return false;   
    }
}

const useExplorePosts = (size = 9) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);

    const getPosts = useCallback(async () => {
        if (loading) return;
        if (totalPages && page > totalPages) return;
        setLoading(true);
        try {
            const data = await fetchExplorePosts(page, size);
            const filtered = [];
            for (const p of data.posts){
                if(p.imageUrl){
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
        hasMore: totalPages === null || page <= totalPages,
    }

}

export default useExplorePosts;