import express from "express";
import userRouter from "./api/user.route.js";
const mainRoute = express.Router();

mainRoute.use("/auth", userRouter);

export default mainRoute;
