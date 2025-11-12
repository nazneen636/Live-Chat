import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  console.log(selectedUser);

  return (
    <div className="w-full h-[95dvh] sm:px-[15%] sm:py-[2%]">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
        <div className={`grid ${selectedUser ? "grid-cols-4" : "grid-cols-2"}`}>
          <Sidebar
          // selectedUser={selectedUser}
          // setSelectedUser={setSelectedUser}
          />
          <div className={`${selectedUser ? "col-span-2" : ""} h-full`}>
            <ChatContainer />
          </div>
          {selectedUser && (
            <RightSidebar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
