import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchLoggedUser } from "../api/userApi";


const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const goToProfile = async() => { 
    try {
      const response = await fetchLoggedUser()
      navigate(`/profile/${response.id}`)
    } catch (error) {
      console.error("Error fetching Logged User:", error);
    }
  }

  return (
    <header className="h-8 bg-white flex justify-between items-center  border-b sticky top-0 z-10">
      {/* {mobile title} */}
      <h1 className="font-semibold text-lg md:hidden pl-3.5">PicMe</h1>
      {/*Desktop search bar*/}
      <input
        type="text"
        placeholder="Search..."
        className="hidden md:block w-3/4 h-3/4 bg-gray-200 p-2 rounded-md ml-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-transparent
                        
                        shadow-sm transition duration-300
                        hover:shadow-md hover:shadow-gray-400
                        focus:shadow-md focus:shadow-blue-400"
      />
      {/*Search Button (mobile only)*/}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setShowSearch(true)}
      >
        🔍
      </button>
      {/* profile */}
      <Link
        to={isAuthenticated ? "/profile" : "/login"}
        className="flex items-center"
      >
        {console.log("isAuntheticated: ", isAuthenticated)}
        {isAuthenticated ? (
          <img
            src={
              user?.profilePictureUrl && user.profilePictureUrl > 0
                ? user.profilePictureUrl
                : `https://ui-avatars.com/api/?name=${user.username}`
            }
            alt="Profile"
            onClick={goToProfile}
            className="mr-4 rounded-full w-7 h-7"
          />
        ) : (
          <button className="mr-4 bg-blue-500 text-white rounded-full py-1 px-1.5 text-sm">
            👤
          </button>
        )}
      </Link>

      {/* {Overlay search for mobile} */}
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 h-1/4 bg-white z-20 flex items-start pt-4">
          {/* Bar pencarian */}
          <div className="flex items-center w-full px-4">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="flex-1 bg-white p-2 rounded-md"
            />
            <button
              className="ml-2 text-gray-600 hover:text-gray-800 text-lg"
              onClick={() => setShowSearch(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
