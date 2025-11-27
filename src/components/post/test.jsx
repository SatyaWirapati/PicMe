import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../api/postApi';

const ProfilePage = () => {

    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProfileData = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                const data = await fetchUserById(userId);
                setUserData(data);
            } catch (err) {
                console.error("Gagal memuat data profil: ", err);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
    }, [userId]);

    return (
        <div className="w-full min-h-screen bg-white text-black">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
                <span>←</span>

                {/* username header */}
                <span className="font-semibold text-lg">
                    {userData?.username || ""}
                </span>
            </div>

            {/* profile */}
            <div className="px-4 py-4">

                {/* top part */}
                <div className="flex items-center gap-4">
                    <img
                        src={userData?.profilePictureUrl}
                        alt=""
                        className="w-20 h-20 rounded-full bg-gray-300 object-cover"
                    />

                    {/* kanan */}
                    <div className="flex flex-col">
                        {/* username */}
                        <span className="font-semibold text-lg">
                            {userData?.username || ""}
                        </span>

                        <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex flex-col items-center">
                                <span>212</span>
                                <span>posts</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <span>123</span>
                                <span>followers</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <span>232</span>
                                <span>following</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bio */}
                <div className="mt-4 text-sm">
                    {userData?.bio || ""}
                </div>

                {/* buttons */}
                <div className="mt-4">
                    <button className="w-full bg-gray-200 py-2 rounded-lg text-sm font-medium">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* post grid */}
            <div className="grid grid-cols-3 gap-1 px-0">
                {/* nanti isi grid post disini */}
                <div className="bg-gray-200 aspect-square"></div>
                <div className="bg-gray-200 aspect-square"></div>
                <div className="bg-gray-200 aspect-square"></div>
            </div>

        </div>
    );
};

export default ProfilePage;
