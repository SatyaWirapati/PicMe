import { useState } from "react";
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="h-8 bg-white flex justify-between  border-b sticky top-0 z-10">
            {/* {mobile title} */}
            <h1 className="font-semibold text-lg md:hidden">PicMe</h1>
            {/*Desktop search bar*/}
            <input type="text"
                placeholder="Search..."
                className="hidden md:block w-full bg-gray-200 p-2 rounded-md " />
            {/*Search Button (mobile only)*/}
            <button className="md:hidden text-gray-600"
                    onClick={()=>setShowSearch(true)}>
                🔍
            </button>
            <img src="" alt="Profile" className="rounded-full w-8 h-8" />
            {/* {Overlay search for mobile} */}
            {showSearch &&(
                <div>
                    <input type="text" />
                    <button></button>
                </div>
            )}
        </header>
    )
}

export default Header;