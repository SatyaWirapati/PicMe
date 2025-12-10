import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const FollowModal = ({
  isOpen,
  onClose,
  title,
  users = [],
  following = [],
  loaderRef,
}) => {
  if (!isOpen) return null;

  const [localFollowing, setLocalFollowing] = useState([]);

  useEffect(() => {
    setLocalFollowing(following.map((f) => f.id));
  }, [following, isOpen]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-full max-w-md h-[500px] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-3 space-y-3 overflow-y-auto h-[430px]">
          {users.length === 0 && (
            <p className="text-center text-gray-400">No users found</p>
          )}

          {users.map((u) => {
            const isFollowed = localFollowing.includes(u.id);

            return (
              <div key={u.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      u.profilePictureUrl ||
                      `https://ui-avatars.com/api/?name=${u.username}`
                    }
                    onError={(e) =>
                      (e.target.src = `https://ui-avatars.com/api/?name=${u.username}`)
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <Link to={`/profile/${u.id}`} onClick={onClose}>
                    <p className="font-medium">{u.username}</p>
                  </Link>
                </div>

                <FollowButton
                  isFollowed={isFollowed}
                  userId={u.id}
                  onChanged={(newState) => {
                    setLocalFollowing((prev) =>
                      newState
                        ? [...prev, u.id] // FOLLOW
                        : prev.filter((id) => id !== u.id) // UNFOLLOW
                    );
                  }}
                />
              </div>
            );
          })}

          <div ref={loaderRef} className="h-5"></div>
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
