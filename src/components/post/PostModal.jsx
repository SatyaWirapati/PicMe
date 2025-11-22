import { X, Heart, Send, MessageCircle } from "lucide-react"
import { useState } from "react";
import formatDate from "../../utils/formatDate";

const PostModal = ({ post, onClose }) => {
    const comments = post?.comments || [];
    const [liked, setLiked] = useState(post.isLiked)
    const [likeCount, setLikeCount] = useState(post.totalLikes)
    console.log(post.user)
    const toggleLike = () => {
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setLiked(!liked);
    }
    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center  items-center z-100">
            <div className=" flex w-full h-full justify-center items-stretch overflow-hidden md:h-[85vh]  md:max-w-5xl md:rounded-lg ">
                {/*=== LEFT IMAGE (Desktop) ===*/}
                <div className="bg-amber-50 hidden w-1/2 justify-center items-center md:flex ">
                    <img src={post.imageUrl}
                        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500"}
                        className="object-fill w-full h-full aspect-square" />
                </div>

                {/* right content */}
                <div className="bg-red-300 flex flex-col w-full md:h-full h-auto md:w-1/2 rounded-md ">
                    <div className="flex items-center gap-3 px-3 py-2 border-b-1">
                        <img src={(post.user?.profilePictureUrl && post.user.profilePictureUrl.length > 0)
                            ? post.user.profilePictureUrl
                            : `https://ui-avatars.com/api/?name=${post.user?.username}`
                        }
                            alt="pic"
                            className="w-10 h-10 rounded-full bg-blue-500"
                            onError={(e) => {
                                e.target.src =
                                    "https://ui-avatars.com/api/?name=" + post.user?.username;
                            }}
                        />
                        <span className="font-semibold">{post.user?.username} </span>
                    </div>
                    {/* {=== LEFT IMAGE (DESKTOP)} */}
                    <div className="md:hidden w-full relative pt-[100%] bg-blackl">
                        <img src={post.imageUrl}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500"
                            }}
                            className="absolute inset-0 w-full h-full object-fill" />
                    </div>

                    {/* likes and posted date*/}
                    <div className="flex text-md px-3 border-b py-2 md:hidden items-center justify-between gap-3">

                        {/* perintilan */}
                        <div className="flex items-center gap-3.5">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleLike}
                                >
                                    <Heart
                                        size={28}
                                        className={
                                            liked ? "text-red-500 transition fill-red-500"
                                                : "text-gray-300 transition"
                                        } />
                                </button>

                                <span className=""> {likeCount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={28} className="text-gray-300 transition" />
                                <span> {comments.length}</span>
                            </div>
                            <Send size={28} className="text-gray-300 transition" />
                        </div>

                        <span>
                            {formatDate(post.createdAt)}
                        </span>

                    </div>


                    {/* scroll area (caption + comments) */}
                    <div className="md:flex-1 overflow-y-auto h-full px-3 py-3 ">
                        <div className="text-md font-bold">
                            {post.caption === "" ? "" : post.caption}
                        </div>
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-3 items-center py-1.5">
                                <img src={(c.user?.profilePictureUrl && c.user.profilePictureUrl.length > 0)
                                    ? c.user.profilePictureUrl
                                    : `https://ui-avatars.com/api/?name=${c.user?.username}`
                                } alt=""
                                    className="h-8 w-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://ui-avatars.com/api/?name=" + c.user?.username;
                                    }} />
                                <div className="flex flex-col text-sm">
                                    <span className="font-bold">{c.user.username}</span>
                                    <span>{c.comment}</span>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* likes and posted date (desktop)*/}
                    <div className="hidden text-md px-3 border-b py-2 md:flex items-center justify-between gap-3">

                        {/* perintilan */}
                        <div className="flex items-center gap-3.5">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleLike}
                                >
                                    <Heart
                                        size={28}
                                        className={
                                            liked ? "text-red-500 transition fill-red-500"
                                                : "text-gray-300 transition"
                                        } />
                                </button>

                                <span className=""> {likeCount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={28} className="text-gray-300 transition" />
                                <span> {comments.length ? comments.length : 0}</span>
                            </div>
                            <Send size={28} className="text-gray-300 transition" />
                        </div>

                        <span>
                            {formatDate(post.createdAt)}
                        </span>

                    </div>

                    {/* input comment */}
                    <div className="bg-gray-300">
                        <input type="text" placeholder="Add a comment..."
                            className="w-full bg-white h-full border-t rounded-sm px-2 py-2
                                         focus:outline-none
                                        focus:ring-0
                                        focus:border-transparent" />
                    </div>

                </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white">
                <X size={30} />
            </button>
        </div>
    )
}
export default PostModal;