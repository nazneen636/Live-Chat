import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
console.log(`${backendUrl}/api/auth/check`);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  //   check if user is authenticated and if so, set the user data and connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.status === "ok") {
        console.log(data.data);
        setAuthUser(data.data);
        connectSocket(data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      // console.log(error);
    }
  };

  // login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.status === "ok") {
        setAuthUser(data.data.user);
        connectSocket(data.data);
        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        toast.success(data.message);
        return true; // <-- success
      } else {
        toast.error(data.message);
        return false; // <-- failed
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      return false;
    }
  };

  // // get all users
  // const users = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/auth/all-user`);
  //     setAllUsers(data);
  //   } catch (error) {
  //     toast.error(error.message);
  //     // console.log(error.message);
  //   }
  // };

  // logout function to handle user logout and socket disconnection
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    delete axios.defaults.headers.common["Authorization"];

    toast.success("Logged out successfully");
    socket.disconnect();
  };

  // update profile function to handle user profile updates
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body, {
        headers: {
          // Authorization: `Bearer ${authUser.token}`,
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === "ok") {
        console.log(data, "ok");
        setAuthUser(data.data);
        toast.success("Profile updated successfully");
      }
      console.log(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //   connect socket function to handle socket connection and online users updates
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    }
  }, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    // users,
    socket,
    login,
    logout,
    updateProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
