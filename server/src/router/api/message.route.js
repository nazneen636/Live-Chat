import express from "express";
const messageRouter = express.Router();

import { protectRoute } from "../../middleware/auth.js";
import {
  getMessages,
  getUserForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../../controller/message.controller.js";
messageRouter.get("/users", getUserForSidebar);
messageRouter.get("/:id", getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:receiverId", protectRoute, sendMessage);

export default messageRouter;
