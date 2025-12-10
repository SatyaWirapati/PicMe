import { followUser, unfollowUser } from "../api/followApi";
import { useNotification } from "../context/NotificationContext";

const FollowButton = ({ isFollowed, userId, onChanged }) => {
  const showNotification = useNotification();

  const handleClick = async () => {
    try {
      let response;

      if (isFollowed) {
        // UNFOLLOW
        response = await unfollowUser(userId);
        onChanged(false); // update state di parent
      } else {
        // FOLLOW
        response = await followUser(userId);
        onChanged(true);
      }

      showNotification(response.message);
    } catch (err) {
      console.error(err);
      showNotification("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-sm px-4 py-1 rounded-lg ${
        isFollowed ? "bg-gray-300" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
