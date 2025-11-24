import { Home, Compass, PlusSquare, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    const menu = [
        { to: "/", icon: <Home size={22} />, label: "Home" },
        { to: "/explore", icon: <Compass size={22} />, label: "Explore" },
        { to: "/add", icon: <PlusSquare size={22} />, label: "Add" },
        { to: "/settings", icon: <Settings size={22} />, label: "Settings" },


    ];
    return (
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
-            ">
            <div className="hidden md:block">
                <h1 className="font-semibold text-lg mb-3"> PicMe</h1>
            </div>

            <nav className="
            // mobile
            flex gap-6 items-center justify-evenly w-full
            
            // desktop
            md:flex-col md:gap-3 md:mt-[25.2px]">
                {menu.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `
                                flex items-center gap-2
                                p-1 md:p-2 rounded-md 
                                transition md:w-10/12

                                ${isActive ? "font-semibold text-black" : "text-gray-600"}
                                ${isActive ? "md:bg-gray-200" : "md:hover:bg-gray-100"}

                                /* mobile: icon-only */
                                md:gap-3
                            `
                        }
                    >
                        {item.icon}

                        {/* Hide text on mobile, show on desktop */}
                        <span className="hidden md:inline">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="hidden md:block mt-auto ">
                <button className="text-red-500">Logout</button>
            </div>
        </aside>
    )
}

export default Sidebar;