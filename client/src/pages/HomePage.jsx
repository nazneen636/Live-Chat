import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  console.log(selectedUser);

  return (
    <div className="w-full h-[95dvh] sm:px-[15%] sm:py-[2%]">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
        <div className={`grid ${selectedUser ? "grid-cols-4" : "grid-cols-2"}`}>
          <Sidebar />
          <div className={`${selectedUser ? "col-span-2" : ""}`}>
            <ChatContainer />
          </div>
          {selectedUser && <RightSidebar />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
