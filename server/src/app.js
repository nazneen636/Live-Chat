import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import globalError from "./helpers/globalError.js";
import mainRoute from "./router/index.js";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);

// initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// store online users
export const userSocketMap = {}; // {userId: socketId}

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);
  if (userId) userSocketMap[userId] = socket.id;

  //   emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/status", (req, res) => res.send("Server is live"));

app.use("/api", mainRoute);
app.use(globalError);
export default server;
