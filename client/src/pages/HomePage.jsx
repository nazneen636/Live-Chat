import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  console.log(selectedUser);

  return (
    <div className="border w-full h-[95dvh] sm:px-[15%] sm:py-[2%]">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
        <div className="grid grid-cols-4">
          <Sidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <div className="col-span-2">
            <ChatContainer
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
          <RightSidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
