import React, { useContext } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { users, onlineUsers } = useContext(AuthContext);
  console.log(users());

  const navigate = useNavigate();
  return (
    <div
      className={`bg-[#8185b2]/10 h-full  rounded-r-xl px-3 py-5  text-white  ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* logo & menu */}
      <div className="pb-2">
        <div className="flex items-center justify-between">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Log out</p>
            </div>
          </div>
        </div>
      </div>

      {/* search */}
      <div className="bg-[#282142] rounded-full flex items-center gap-2 mt-5 py-3 px-4">
        <img src={assets.search_icon} alt="search" className="w-3" />
        <input
          type="text"
          className="bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1"
          placeholder="search user..."
        />
      </div>

      {/* content */}
      <div className="flex flex-col gap-2 mt-6 overflow-y-scroll">
        {userDummyData?.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              console.log(setSelectedUser(user));
            }}
            key={index}
            className={`flex items-center gap-3 relative py-2 cursor-pointer pl-2 max-sm:text-sm ${
              selectedUser?._id === user._id && "bg-[#282142]/50 rounded"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-[35px] aspect-square rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p className="">{user?.fullName}</p>
              {index < 3 ? (
                <span className="text-xs text-green-600">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>

            {index > 2 && (
              <p className="absolute top-4 right-4 rounded-full flex justify-center items-center  text-xs h-5 w-5 bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
