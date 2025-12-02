import { Home, Compass, PlusSquare, Settings, Circle } from "lucide-react";
import { NavLink } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";

const Sidebar = () => {
  const menu = [
    { to: "/", icon: <Home size={22} />, label: "Home" },
    { to: "/explore", icon: <Compass size={22} />, label: "Explore" },
    { to: "/add", icon: <PlusSquare size={22} />, label: "Add" },
    { to: "/stories", icon: <Circle size={22} />, label: "Stories" },
  ];

  return (
    <>
      <aside
        className="
                // mobile
                flex fixed
                 bottom-0 left-0 w-full h-14
                border-t bg-white z-50
                justify-around items-center

                // desktop
                md:flex md:flex-col md:justify-start
                md:border-r md:w-40 md:h-screen md:p-2.5
                md:top-0  md:sticky
-            "
      >
        <div className="hidden md:block">
          <h1 className="font-semibold text-lg mb-3"> PicMe</h1>
        </div>

        <nav
          className="
          flex gap-6 items-center justify-evenly w-full
          
          md:flex-col md:gap-3 md:mt-[25.2px]  
          md:justify-between md:flex-1
          md:items-center
        "
        >
          {/* WRAPPER untuk menu */}
          <div className=" space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
            flex items-center gap-2
            p-1 md:p-2 rounded-md 
            transition
            w-[140px]   // << ini kunci penting!!!!
            ${
              isActive
                ? "font-semibold text-black md:bg-gray-200"
                : "text-gray-600 md:hover:bg-gray-100"
            }
            md:gap-3
          `
                }
              >
                <span className="w-[22px] flex justify-center">
                  {item.icon}
                </span>

                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Settings */}
          <SettingsDropdown />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
