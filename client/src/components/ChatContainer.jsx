import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTIme } from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    getMessages,
    sendMessages,
    unseenMessages,
  } = useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);
  // const scrollEnd = useRef();
  const [input, setInput] = useState("");

  // handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessages({ text: input.trim() });
    setInput("");
    setShowEmojiPicker(false);
  };

  // handle sending a img
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      await sendMessages({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   if (scrollEnd.current && messages) {
  //     scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  // -------
  const chatContainerRef = useRef();
  const scrollEnd = useRef();
  useEffect(() => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;

    // If user is close to bottom, smooth scroll near bottom (leaving 12px)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    if (isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight - 12,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    if (!emoji) return;
    const cursorPos = inputRef.current.selectionStart;
    const textBefore = input.substring(0, cursorPos);
    const textAfter = input.substring(cursorPos);
    const newText = textBefore + emoji + textAfter;
    setInput(newText);
    console.log(newText);

    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        cursorPos + emoji.length,
        cursorPos + emoji.length
      );
    }, 0);
  };

  // emoji

  // -------
  return selectedUser ? (
    <div className="h-full  relative backdrop-blur-lg">
      {/* header */}
      <div className="w-full  px-4  flex items-center gap-3 py-3  border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="profile"
          className="w-9 h-9 object-cover rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName || ""}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
          )}{" "}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden  max-w-5" />
      </div>

      {/* chat area */}
      <div
        className="w-full flex flex-col p-3 overflow-y-auto h-[calc(98vh-205px)]"
        ref={chatContainerRef}
      >
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex relative items-end gap-2 justify-end ${
              msg.senderId !== authUser._id && "flex-row-reverse"
            }`}
          >
            <div className="relative">
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    msg.senderId === authUser._id
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}
              {/* seen msg */}
              <div className="absolute bottom-1 right-1">
                {index === messages.length - 1 &&
                  msg.senderId === authUser._id && (
                    <span className="ml-1 text-xs">
                      {msg.seen ? (
                        <span className="text-cyan-400">Seen</span>
                      ) : (
                        <span className="text-gray-300">Delivered</span>
                      )}
                    </span>
                  )}
              </div>
              {/* seen msg */}
            </div>
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-gray-500">
                {formatMessageTIme(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        {/* this is the key line */}
        <div ref={scrollEnd} />
      </div>

      {/* bottom area */}
      <div className=" flex items-center gap-3 p-3 pb-0">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="mr-2 text-white text-xl"
            >
              <FaRegSmile />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}
          </div>
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
            type="file"
            id="image"
            onChange={handleSendImage}
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <div className="w-12 h-12 text-xl rounded-full bg-linear-to-r text-white flex items-center justify-center from-cyan-400 to-cyan-800">
          <BsFillSendFill />
        </div>
        {/* <img onClick={handleSendMessage} src={assets.send_button} alt="" /> */}
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center bg-white/10 max-md:hidden gap-2 text-gray-200 h-full
    "
    >
      <img src={assets.logo_icon} className="max-w-44" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime anywhere</p>
    </div>
  );
};

export default ChatContainer;
