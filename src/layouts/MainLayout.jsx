import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className={`flex-1 overflow-y-auto bg-red-300 p-4`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
