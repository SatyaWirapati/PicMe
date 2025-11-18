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
        <aside className="hidden md:flex flex-col ml-2 justify-between border-r w-40 h-screen p-2.5 sticky  z-100 top-0 left-0 bg-white">
            <div>
                <h1 className="font-semibold text-lg  mb-3">PicMe</h1>
                <nav className="flex flex-col gap-3">
                    {menu.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({isActive})=>(
                                `flex item-center gap-3 p-2 rounded-md ${
                                    isActive? "bg-gray-200 font-semibold": "hover:bg-gray-100"
                                }`
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div>
                <button>Logout</button>
            </div>
        </aside>
    )
}

export default Sidebar;