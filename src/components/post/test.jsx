import { X } from "lucide-react"
import { useEffect } from "react"

const FollowModal = ({
  isOpen,
  onClose,
  title = "Followers",
  users = [],
  following = [],
  onFollow,
  onUnfollow
}) => {

  if (!isOpen) return null

  // cek apakah user ini ada di following kita
  const isUserFollowed = (userId) => {
    return following.some((u) => u.id === userId)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[400px] rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[400px] overflow-y-auto">

          {users.length === 0 && (
            <p className="text-center py-6 text-gray-500">
              No users found
            </p>
          )}

          {users.map((user) => {

            const followed = isUserFollowed(user.id)

            return (
              <div
                key={user.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >

                {/* Left: avatar + username */}
                <div className="flex items-center gap-3">

                  <img
                    src={
                      user.profilePictureUrl ||
                      "https://ui-avatars.com/api/?name=" + user.username
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium text-sm">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                </div>

                {/* Right: Follow / Following */}
                {followed ? (

                  <button
                    onClick={() => onUnfollow(user.id)}
                    className="px-4 py-1 rounded-md bg-gray-200 text-sm text-gray-700 hover:bg-gray-300"
                  >
                    Following
                  </button>

                ) : (

                  <button
                    onClick={() => onFollow(user.id)}
                    className="px-4 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
                  >
                    Follow
                  </button>

                )}

              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}

export default FollowModal
