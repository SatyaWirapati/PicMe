import useHomePosts from "../hooks/useHomePosts";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import PostGrid from "../components/post/PostGrid";
const HomePage = () => {
    const {posts, getPosts, loading, hasMore} = useHomePosts(9);
    const loaderRef = useInfiniteScroll(getPosts, loading, hasMore);
    return (
        <div >
            <h2 className="font-semibold text-lg mg-3">Explore</h2>
            <PostGrid posts={posts}/>
            <div ref={loaderRef} className="h-10"></div>
            {loading && <p className="text-center py-3 text-sm">Loading... </p>}
        </div>
    )
}
export default HomePage;