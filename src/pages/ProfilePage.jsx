import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchUserById } from "../api/userApi";
import { getFollowersById, getFollowingById } from "../api/followApi";

import useUserPosts from "../hooks/useUserPosts";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import PostGrid from "../components/post/PostGrid";
import FollowModal from "../components/FollowModal";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();

  const [userData, setUserData] = useState(null);

  const { posts, loading, getPosts, hasMore } = useUserPosts(userId, 9);
  const loaderRef = useInfiniteScroll(getPosts, loading, hasMore);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // PAGINATION STATE
  const [followerPage, setFollowerPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);

  const [hasMoreFollowers, setHasMoreFollowers] = useState(true);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true);

  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [checkFollowing, setCheckFollowing] = useState([]);

  const [loadedFollowerPages, setLoadedFollowerPages] = useState(new Set());
  const [loadedFollowingPages, setLoadedFollowingPages] = useState(new Set());

  // ========================
  // FETCH FOLLOWERS (PAGINATED)
  // ========================
  const fetchFollowers = async () => {
    if (loadingFollowers || !hasMoreFollowers) return;
    if (loadedFollowerPages.has(followerPage)) return;
    setLoadedFollowerPages((prev) => new Set(prev).add(followerPage));

    try {
      setLoadingFollowers(true);

      const res = await getFollowersById(userId, followerPage, 10);
      const newUsers = res?.data?.users || [];

      setFollowers((prev) => {
        const map = new Map();

        [...prev, ...newUsers].forEach((user) => {
          map.set(user.id, user); // id = key → impossible duplicate
        });

        return Array.from(map.values());
      });

      if (newUsers.length < 10) {
        setHasMoreFollowers(false);
      } else {
        setFollowerPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Fetch followers error:", error);
    } finally {
      setLoadingFollowers(false);
    }
  };

  // ========================
  // FETCH FOLLOWING (PAGINATED)
  // ========================
  const fetchFollowing = async () => {
    if (loadingFollowing || !hasMoreFollowing) return;
    if (loadedFollowingPages.has(followingPage)) return;
    setLoadedFollowingPages((prev) => new Set(prev).add(followingPage));  

    try {
      setLoadingFollowing(true);

      const res = await getFollowingById(userId, followingPage, 10);
      const newUsers = res?.data?.users || [];

      setFollowing((prev) => {
        const map = new Map();

        [...prev, ...newUsers].forEach((user) => {
          map.set(user.id, user);
        });

        return Array.from(map.values());
      });

      if (newUsers.length < 10) {
        setHasMoreFollowing(false);
      } else {
        setFollowingPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Fetch following error:", error);
    } finally {
      setLoadingFollowing(false);
    }
  };

  // ========================
  // LOAD PROFILE DATA
  // ========================
  useEffect(() => {
    setFollowers([]);
    setFollowing([]);

    setFollowerPage(1);
    setFollowingPage(1);

    setHasMoreFollowers(true);
    setHasMoreFollowing(true);

    const loadProfileData = async () => {
      try {
        const data = await fetchUserById(userId);

        // set state untuk render
        setUserData(data);

        const totalFollowing = data?.totalFollowing ?? 0;
        console.log("total", totalFollowing);
        const response = await getFollowingById(
          userId,
          1,
          totalFollowing || 10
        );

        console.log("ini following", response.data.users);
        setCheckFollowing(response.data.users || []);
      } catch (error) {
        console.error("Load profile error:", error);
      }
    };

    if (userId) loadProfileData();
  }, [userId]);

  // Saat modal followers dibuka
  useEffect(() => {
    if (showFollowers && followers.length === 0) {
      fetchFollowers();
    }
  }, [showFollowers]);

  // Saat modal following dibuka
  useEffect(() => {
    if (showFollowing && following.length === 0) {
      fetchFollowing();
    }
  }, [showFollowing]);

  // ========================
  // INFINITE SCROLL FOR MODAL
  // ========================
  const followersLoaderRef = useInfiniteScroll(
    fetchFollowers,
    loadingFollowers,
    hasMoreFollowers
  );

  const followingLoaderRef = useInfiniteScroll(
    fetchFollowing,
    loadingFollowing,
    hasMoreFollowing
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 text-black">
      {/* PROFILE HEADER */}
      <div className="max-w-2xl mx-auto bg-white rounded-md px-6 py-4 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-center mb-4 relative border-b pb-2">
          <span className="absolute left-0 text-2xl font-bold cursor-pointer">
            ←
          </span>
          <span className="font-semibold text-lg">
            {userData?.username || ""}
          </span>
        </div>

        {/* PROFILE INFO */}
        <div className="flex gap-6 items-between">
          <img
            src={
              userData?.profilePictureUrl
                ? userData.profilePictureUrl
                : `https://ui-avatars.com/api/?name=${userData?.username}`
            }
            alt="profile"
            className="w-20 h-20 rounded-full object-cover bg-gray-500"
          />

          <div className="flex-col flex items-center md:ml-27">
            <p className="font-semibold text-lg mb-3">{userData?.username}</p>

            <div className="flex gap-6 text-center">
              <div>
                <p className="font-semibold">{posts?.length || 0}</p>
                <span className="text-sm text-gray-500">Posts</span>
              </div>

              <div
                onClick={() => setShowFollowers(true)}
                className="cursor-pointer"
              >
                <p className="font-semibold">{userData?.totalFollowers}</p>
                <span className="text-sm text-gray-500">Followers</span>
              </div>

              <div
                onClick={() => setShowFollowing(true)}
                className="cursor-pointer"
              >
                <p className="font-semibold">{userData?.totalFollowing}</p>
                <span className="text-sm text-gray-500">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* BIO & INFO */}
        <div className="mt-4 space-y-1">
          {userData?.bio && <p className="text-sm">{userData.bio}</p>}

          {userData?.phoneNumber && (
            <p className="text-sm">📞 {userData.phoneNumber}</p>
          )}

          {userData?.email && <p className="text-sm">📧 {userData.email}</p>}

          {userData?.website && (
            <p className="text-sm">🌐 {userData.website}</p>
          )}
        </div>

        {/* BUTTONS (tanpa follow logic dulu) */}
        {currentUser?.id !== userId && (
          <div className="flex justify-center gap-4 mt-5">
            <button className="bg-blue-500 text-white px-6 py-1 rounded-lg">
              Follow
            </button>

            <button className="bg-gray-300 px-6 py-1 rounded-lg">
              Message
            </button>
          </div>
        )}
      </div>

      {/* POST GRID */}
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-md p-4">
        <PostGrid posts={posts} />
        <div ref={loaderRef} className="h-10"></div>
      </div>

      {/* FOLLOWERS MODAL */}
      <FollowModal
        isOpen={showFollowers}
        onClose={() => setShowFollowers(false)}
        title="Followers"
        users={followers}
        following={checkFollowing}
        loaderRef={followersLoaderRef}
      />

      {/* FOLLOWING MODAL */}
      <FollowModal
        isOpen={showFollowing}
        onClose={() => setShowFollowing(false)}
        title="Following"
        users={following}
        following={checkFollowing}
        loaderRef={followingLoaderRef}
      />
    </div>
  );
};

export default ProfilePage;
