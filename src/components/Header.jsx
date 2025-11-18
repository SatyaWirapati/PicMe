import { useState } from "react";
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="h-8 bg-red-300 flex justify-between items-center  border-b sticky top-0 z-10">
            {/* {mobile title} */}
            <h1 className="font-semibold text-lg md:hidden">PicMe</h1>
            {/*Desktop search bar*/}
            <input type="text"
                placeholder="Search..."
                className="hidden md:block w-3/4 h-3/4 bg-white p-2 rounded-md ml-4
                        focus:outline-none
                        focus:ring-0
                        focus:border-transparent
                        
                        shadow-sm transition duration-300
                        hover:shadow-md hover:shadow-gray-400
                        focus:shadow-md focus:shadow-blue-400" />
            {/*Search Button (mobile only)*/}
            <button className="md:hidden text-gray-600"
                onClick={() => setShowSearch(true)}>
                🔍
            </button>
            <img src="" alt="Profile" className="mr-4 rounded-full w-8 h-8" />
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
    )
}

export default Header;