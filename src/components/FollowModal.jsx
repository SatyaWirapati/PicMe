import { X } from "lucide-react";

const FollowModal = ({
  isOpen,
  onClose,
  title,
  users = [],
  following = [],
  loaderRef,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-full max-w-md h-[500px] rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* LIST USERS */}
        <div className="p-3 space-y-3 overflow-y-auto h-[430px]">
          {users.length === 0 && (
            <p className="text-center text-gray-400">No users found</p>
          )}

          {users.map((u) => {
            // ✅ Cek apakah user ini ada di following kita
            const isFollowed = following.some((f) => f.id === u.id);

            return (
              <div key={u.id} className="flex justify-between items-center">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      u.profilePictureUrl
                        ? u.profilePictureUrl
                        : `https://ui-avatars.com/api/?name=${u.username}`
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{u.username}</p>
                    <p className="text-sm text-gray-400">{u.email}</p>
                  </div>
                </div>

                {/* RIGHT */}
                {isFollowed ? (
                  <button className="text-sm bg-gray-300 px-4 py-1 rounded-lg">
                    Following
                  </button>
                ) : (
                  <button className="text-sm bg-blue-500 text-white px-4 py-1 rounded-lg">
                    Follow
                  </button>
                )}
              </div>
            );
          })}
          {/* Infinite Scroll Trigger */}
          <div ref={loaderRef} className="h-5"></div>
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
