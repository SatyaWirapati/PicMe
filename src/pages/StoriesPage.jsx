import { useEffect, useState } from "react";
import { fetchFollowingStories, fetchStoriesViewById } from "../api/storiesApi";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500";

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [viewers, setViewers] = useState([]);

  // ================= FETCH STORIES =================
  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchFollowingStories(1, 100);
        const storyList = data?.stories || [];

        // ✅ REMOVE DUPLICATE (by id)
        const uniqueStories = Array.from(
          new Map(storyList.map((item) => [item.id, item])).values()
        );

        // ✅ SORT BY NEWEST
        uniqueStories.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setStories(uniqueStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    getStories();
  }, []);

  // ================= FETCH VIEWERS =================
  useEffect(() => {
    const getViewers = async () => {
      if (!selectedStory) return;

      try {
        const viewersData = await fetchStoriesViewById(
          selectedStory.id,
          1,
          100
        );

        const uniqueViewers = Array.from(
          new Map(viewersData.map((item) => [item.id, item])).values()
        );

        setViewers(uniqueViewers);
        console.log("viewers: ", viewers);
      } catch (error) {
        console.error("Error fetching viewers:", error);
      }
    };

    getViewers();
  }, [selectedStory]);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Stories</h1>

      {/* ========== STORY LIST ========== */}
      <div className="flex gap-4 overflow-x-auto">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="cursor-pointer min-w-[80px] text-center"
          >
            {/* <img
              src={story.imageUrl || DEFAULT_IMAGE}
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
            /> */}
            <img
              src={
                story.user?.profilePictureUrl
                  ? story.user.profilePictureUrl
                  : `https://ui-avatars.com/api/?name=${story.user?.username}`
              }
              alt="profile"
              className="w-20 h-20 rounded-full object-cover bg-gray-500"
            />

            <p className="text-sm mt-1 truncate w-20">
              {story?.user?.username || "Unknown"}
            </p>
          </div>
        ))}
      </div>

      {/* ========== ACTIVE STORY ========== */}
      {selectedStory && (
        <div className="mt-10">
          <img
            src={selectedStory.imageUrl || DEFAULT_IMAGE}
            onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            className="w-full max-h-[400px] object-contain rounded-lg"
          />

          <p className="mt-2 text-lg">{selectedStory.caption}</p>

          <p className="text-gray-500 mb-3 text-sm">
            👁 {selectedStory.totalViews} views
          </p>

          {/* ========== VIEWERS ========== */}
          <div>
            <h2 className="font-semibold mb-2">Viewers</h2>

            {viewers.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada yang melihat</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {viewers.map((viewer) => (
                  <div
                    key={viewer.id}
                    className="flex items-center gap-2 bg-gray-100 p-2 rounded"
                  >
                    <img
                      src={
                        viewer.user?.profilePictureUrl
                          ? viewer.user.profilePictureUrl
                          : `https://ui-avatars.com/api/?name=${viewer.user?.username}`
                      }
                      onError={(e) =>
                        (e.target.src = `https://ui-avatars.com/api/?name=${viewer.user?.username}`)
                      }
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <span className="text-sm truncate">
                      {viewer?.user?.username || viewer?.user?.name || "User"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
