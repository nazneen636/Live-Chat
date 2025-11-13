import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Sidebar = () => {
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  console.log(onlineUsers);

  const [input, setInput] = useState();
  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);
  return (
    <div
      className={`bg-[#8185b2]/10 h-full rounded-r-xl px-3 py-5  text-white  ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* logo & menu */}
      <div className="pb-2">
        <div className="flex items-center justify-between">
          <img src={assets.logo} alt="logo" className="max-w-16" />
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
              <p onClick={() => logout()} className="cursor-pointer text-sm">
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* search */}
      <div className="bg-[#282142] rounded-full flex items-center gap-2 mt-5 py-3 px-4 ">
        <img src={assets.search_icon} alt="search" className="w-3" />
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
            console.log(input);
          }}
          className="bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1"
          placeholder="search user..."
        />
      </div>

      {/* content */}
      <div className="flex flex-col gap-2 mt-6 h-[52%] overflow-y-scroll">
        {filteredUsers?.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
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
              {onlineUsers.includes(user._id) ? (
                <span className="text-xs text-green-600">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>

            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 rounded-full flex justify-center items-center  text-xs h-5 w-5 bg-violet-500/50">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
