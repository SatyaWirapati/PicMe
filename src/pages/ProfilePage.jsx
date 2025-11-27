import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../api/postApi";
import useUserPosts from "../hooks/useUserPosts";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import PostGrid from "../components/post/PostGrid";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const { posts, loading, getPosts, hasMore } = useUserPosts(userId, 9);
  const loaderRef = useInfiniteScroll(getPosts, loading, hasMore);

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await fetchUserById(userId);
      setUserData(data);
    };
    loadProfileData();
  }, [userId]);

  return (
    <div className="w-full min-h-screen bg-red-300 text-black">
      {/* Header */}
      <div className="flex items-center p-1.5 relative border-b">
        {/* arrow */}
        <span className="absolute left-2 text-2xl font-bold">←</span>

        {/* username header */}
        <span className="mx-auto font-semibold text-base">
          {userData?.username || ""}
        </span>
      </div>

      {/* profile */}
      <div>
        {/* top part */}
        <div className="py-3 flex justify-between items-center">
          <img
            src={
              posts?.profilePictureUrl && posts.profilePictureUrl.length > 0
                ? posts.profilePictureUrl
                : `https://ui-avatars.com/api/?name=${posts?.username}`
            }
            alt=""
            className="w-15 h-15 rounded-full bg-white"
          />

          {/* kanan */}
          <div className="flex flex-col mx-auto items-center justify-between">
            {/* username */}
            <span className="mx-auto my-2 font-semibold text-base">
              {userData?.username || ""}
            </span>

            <div className="flex gap-4 ">
              <div className="flex flex-col">
                <span className="mx-auto">posts</span>
                <span className="mx-auto">{posts?.length}</span>
              </div>

              <div className="flex flex-col">
                <span className="mx-auto">followers</span>
                <span className="mx-auto">{userData?.totalFollowers}</span>
              </div>

              <div className="flex flex-col">
                <span className="mx-auto">following</span>
                <span className="mx-auto">{userData?.totalFollowing}</span>
              </div>
            </div>
          </div>
        </div>

        {/* bio */}
        <div>
          <div className="text-sm w-1/2">{userData?.bio || ""}</div>
          <div className="text-sm w-1/2 mt-2 mb-2">{userData?.website || ""}</div>
        </div>

        {/* buttons */}
        <div className="flex justify-around items-center">
          <button className="bg-blue-400 py-1 px-6.5 rounded-xl">Follow</button>
          <button className="bg-gray-300 py-1 px-4 rounded-xl">Message</button>
        </div>
      </div>

      {/* post grid */}
      <PostGrid posts={posts} className="bg-white -m-4 mt-2 p-2" />
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default ProfilePage;
