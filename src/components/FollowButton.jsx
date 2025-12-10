const FollowButton = ({ isFollowed, onClick }) => {
    

  return (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-1 rounded-lg ${
        isFollowed ? "bg-gray-300" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
