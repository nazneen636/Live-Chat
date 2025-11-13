import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, axios } = useContext(AuthContext);

  // Get all users
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/messages/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status === "ok") {
        setUsers(data.data.users);
        setUnseenMessages(data.data.unseenMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.status === "ok") {
        setMessages(Array.isArray(data.data) ? data.data : []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Send message
  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.status === "ok" && data.data) {
        setMessages((prev) => [...prev, data.data]);
      } else {
        toast.error("Message not returned from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Subscribe to socket events
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev?.[newMessage.senderId] + 1 || 1,
        }));
      }
    };

    const handleMessageSeen = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, seen: true } : m))
      );
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageSeen", handleMessageSeen);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageSeen", handleMessageSeen);
    };
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
