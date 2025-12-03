import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authenticationApi";
import { Settings, LogOut, LogIn, Edit, Sun, Moon } from "lucide-react";

const SettingsDropdown = ({ direction = "up" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, logout } = useAuth();

  const toggleDropwdown = () => {
    setOpen((prev) => !prev);
  };

  const handleLogin = () => {
    navigate("/login");
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log(res?.message);
      logout();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProfile = () => {
    navigate("/editProfile");
    setOpen(false);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("light");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
      console.log("SettingsDropdown rendered");

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* settings button */}
      <button
        onClick={toggleDropwdown}
        className="flex gap-2 p-2 hover:bg-gray-100 rounded-md w-full items-center transition "
      >
        <Settings size={22} />
        <span className="hidden md:inline">Settings</span>
      </button>

      {/* dropdown */}
      {open && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 min-w-[120px] md:w-full  bg-gray-300  z-50 border rounded-xl shadow-lg p-2 space-y-1
                                ${
                                  direction === "up"
                                    ? "bottom-12 origin-bottom animate-slide-up"
                                    : "top-12 origin-top animate-slide-down"
                                }`}
        >
          {/* profile edit */}
          {isAuthenticated && (
            <button className=" dropdown-item"
                    onClick={handleEditProfile}>
              <Edit size={22} />
              <span>Edit Profile</span>
            </button>
          )}

          {/* theme */}
          <button className="dropdown-item" onClick={toggleTheme}>
            <Sun size={22} className="block dark:hidden" />
            <Moon size={22} className="hidden dark:block" />
            <span>Dark / Light</span>
          </button>

          <hr className="my-1 border-gray-200 dark:border-zinc-700 " />

          {/* LOGIN / LOGOUT */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="dropdown-item text-red-500"
            >
              <LogOut size={22} />
              <span>Logout</span>
            </button>
          ) : (
            <button onClick={handleLogin} className="dropdown-item">
              <LogIn size={22} />
              <span>Login</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
