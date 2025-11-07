import express from "express";
import userRouter from "./api/user.route.js";
import messageRouter from "./api/message.route.js";
const mainRoute = express.Router();

mainRoute.use("/auth", userRouter);
mainRoute.use("/messages", messageRouter);

export default mainRoute;
