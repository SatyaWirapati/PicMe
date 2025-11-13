import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({children})=>{
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar/>
            <div className="flex-1 md:ml-56 flex flex-col">
                <Header/>
                <div className="flex-1 p-4 overflow-y-auto bg-red-300">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;