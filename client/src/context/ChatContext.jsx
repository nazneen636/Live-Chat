import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState(null);
  const { socket, axios } = useContext(AuthContext);

  // function to get all users for sidebar
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/messages/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === "ok") {
        setUsers(data.data.users);
        setUnseenMessages(data.data.unseenMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // function to get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      console.log("USER DATA RESPONSE:", data);
      if (data.status == "ok") {
        // setMessages(data.data.messages);
        setMessages(Array.isArray(data.data) ? data.data : []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // function to send messages for selected user
  // const sendMessages = async (messageData) => {
  //   try {
  //     // const { data } = await axios.post(
  //     //   `/api/messages/send/${(selectedUser._id, messageData)}`
  //     // );
  //     const { data } = await axios.post(
  //       `/api/messages/send/${selectedUser._id}`,
  //       messageData
  //     );

  //     if (data.status == "ok") {
  //       setMessages((prevMessage = []) => [
  //         ...prevMessage,
  //         data.data?.newMessage || data.newMessage,
  //       ]);
  //     } else {
  //       toast.error(data.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.status === "ok" && data.data) {
        setMessages((prev) => [...prev, data.data]);
      } else {
        console.warn("No new message object returned from backend", data);
        toast.error("Message not returned from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //   function to subscribe to messages for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  const unSubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [socket, selectedUser]);
  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    getUsers,
    getMessages,
    sendMessages,
    unseenMessages,
    setUnseenMessages,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
