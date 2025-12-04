import {
  X,
  Heart,
  Send,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { likePost, unlikePost } from "../../api/likeApi";
import Notification from "../Notification";
import { useEffect, useRef } from "react";

const PostModal = ({ post, onClose }) => {
  const comments = post?.comments || [];
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.totalLikes);
  const [notif, setNotif] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  console.log(post.user);

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(""), 2000);
  };

  const toggleLike = async () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      const res = await unlikePost(post.id);
      console.log(res.message);
      showNotif(res.message);
    } else {
      setLikeCount(likeCount + 1);
      const res = await likePost(post.id);
      console.log(res.message);
      showNotif(res.message);
    }
    setLiked(!liked);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${post.userId}`);
  };

  handle

  return (
    <>
      <Notification message={notif} />
      <div className="fixed inset-0 bg-black/70 flex justify-center  items-center z-100">
        <div className=" flex w-full h-full justify-center items-stretch overflow-hidden md:h-[85vh]  md:max-w-5xl md:rounded-lg ">
          {/*=== LEFT IMAGE (Desktop) ===*/}
          <div className="bg-amber-50 hidden w-1/2 justify-center items-center md:flex ">
            <img
              src={post.imageUrl}
              onError={(e) =>
                (e.target.src =
                  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500")
              }
              className="object-fill w-full h-full aspect-square"
            />
          </div>

          {/* right content */}
          <div className="bg-red-300 flex flex-col w-full md:h-full h-auto md:w-1/2 rounded-md md:rounded-l-none ">
            <div className="flex items-center justify-between gap-3 px-3 py-2 border-b bg-white">
              <div className="flex gap-3 items-center">
                <img
                  src={
                    post.user?.profilePictureUrl &&
                    post.user.profilePictureUrl.length > 0
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
                <button onClick={goToProfile}>
                  <span className="font-semibold">{post.user?.username}</span>
                </button>
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MoreHorizontal />
                </button>

                {openMenu && (
                  <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 z-50 animate-slide-down border">
                    <button
                      className="dropdown-item text-blue-600"
                      onClick={() => {
                        setOpenMenu(false);
                        showNotif("Update clicked");
                      }}
                    >
                      <Edit size={24} />
                      Update
                    </button>

                    <button
                      className="dropdown-item text-red-600"
                      onClick={() => {
                        setOpenMenu(false);
                        showNotif("Delete clicked");
                      }}
                    >
                      <Trash2 size={24} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* {image mobile} */}
            <div className="md:hidden w-full  relative pt-[100%] bg-black">
              <img
                src={post.imageUrl}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500";
                }}
                className="absolute inset-0 w-full h-full object-fill"
              />
            </div>

            {/* likes and posted date*/}
            <div className="flex text-md px-3 border-b py-2 md:hidden items-center justify-between gap-3">
              {/* perintilan */}
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-2">
                  <button onClick={toggleLike}>
                    <Heart
                      size={28}
                      className={
                        liked
                          ? "text-red-500 transition fill-red-500"
                          : "text-white transition"
                      }
                    />
                  </button>

                  <span className=""> {likeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle
                    size={28}
                    className="text-gray-100 transition"
                  />
                  <span> {comments.length}</span>
                </div>
                <Send size={28} className="text-gray-100 transition" />
              </div>

              <span>{formatDate(post.createdAt)}</span>
            </div>

            {/* scroll area (caption + comments) */}
            <div className="md:flex-1 overflow-y-auto h-full px-3 py-3 ">
              <div className="text-md font-bold">
                {post.caption === "" ? "" : post.caption}
              </div>
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3 items-center py-1.5">
                  <img
                    src={
                      c.user?.profilePictureUrl &&
                      c.user.profilePictureUrl.length > 0
                        ? c.user.profilePictureUrl
                        : `https://ui-avatars.com/api/?name=${c.user?.username}`
                    }
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=" + c.user?.username;
                    }}
                  />
                  <div className="flex flex-col text-sm">
                    <span className="font-bold">{c.user.username}</span>
                    <span>{c.comment}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* likes and posted date (desktop)*/}
            <div className="hidden text-md px-3  py-2 md:flex items-center justify-between gap-3">
              {/* perintilan */}
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-2">
                  <button onClick={toggleLike}>
                    <Heart
                      size={28}
                      className={
                        liked
                          ? "text-red-500 transition fill-red-500"
                          : "text-gray-100 transition"
                      }
                    />
                  </button>

                  <span className=""> {likeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle
                    size={28}
                    className="text-gray-100 transition"
                  />
                  <span> {comments.length ? comments.length : 0}</span>
                </div>
                <Send size={28} className="text-gray-100 transition" />
              </div>

              <span>{formatDate(post.createdAt)}</span>
            </div>

            {/* input comment */}
            <div className="bg-gray-300">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full bg-white h-full border-t rounded-sm px-2 py-2
                                         focus:outline-none
                                        focus:ring-0
                                        focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500"
        >
          <X size={30} />
        </button>
      </div>
    </>
  );
};
export default PostModal;
