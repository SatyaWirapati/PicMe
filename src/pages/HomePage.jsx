import useHomePosts from "../hooks/useHomePosts";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
const HomePage = () => {
    const {posts, getPosts, loading, hasMore} = useHomePosts(9);
    const loaderRef = useInfiniteScroll(getPosts, loading, hasMore);
    return (
        <div >
            <h2 className="font-semibold text-lg mg-3">Explore</h2>
            <div className="grid grid-cols-3 gap-4">
                {posts.map((p) => (
                    <div key={p.id} className="aspect-square bg-gray-200 rounded-md">
                        {p.imageUrl && (
                            <img
                                src={p.imageUrl}
                                onError={(e) => {
                                    e.target.src =
                                        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500";
                                }}
                                className="w-full h-full object-cover rounded-md"
                            />

                        )}
                    </div>
                ))}
            </div>
            <div ref={loaderRef} className="h-10"></div>
            {loading && <p className="text-center py-3 text-sm">Loading... </p>}
        </div>
    )
}
export default HomePage;