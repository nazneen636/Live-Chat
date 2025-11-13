import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);
  return (
    selectedUser && (
      <div
        className={`bg-[8185b2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* header */}
        <div className="pt-10 flex flex-col items-center justify-center gap-2 text-xs font-light">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-24 aspect-square object-cover rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2 text-nowrap">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-8 text-center ">{selectedUser.bio}</p>
        </div>
        <hr className="mt-4 mb-4 text-gray-600" />
        {/* media */}
        <div className="px-4 text-xs">
          <p className="text-lg font-semibold">Media</p>
          <div
            className={`mt-2 max-h-[200px] overflow-y-scroll flex flex-wrap gap-4 opacity-80`}
          >
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img
                  src={url}
                  alt=""
                  className="h-20 w-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* btn  */}
        <button
          onClick={() => logout()}
          className="mt-6 ml-1 bg-linear-to-r from-[#5757cf] to-[#34348f] hover:opacity-90 text-white border-none text-base font-medium py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
