import { useState } from "react";
import { fetchPostById } from "../../api/postApi";
import PostModal from "./PostModal";
const PostGrid = ({posts})=> {
    const [selectedPost, setSelectedPost ] = useState(null);
    return(
        <div className="grid grid-cols-3 gap-4">
                {posts.map((p) => (
                    <div key={p.id} 
                    className="aspect-square bg-gray-200 rounded-md overflow-hidden"
                    onClick={()=>setSelectedPost(fetchPostById(p.id))}>
                        {p.imageUrl && (
                            <img
                                src={p.imageUrl}
                                onError={(e) => {
                                    e.target.src =
                                        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500";
                                }}
                                className="w-full h-full object-fill rounded-md"
                            />

                        )}
                    </div>
                ))}
            </div>
    )
}

export default PostGrid;