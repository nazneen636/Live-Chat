import express from "express";
const userRouter = express.Router();
import {
  allUsers,
  checkAuth,
  login,
  signUp,
  updateProfile,
} from "../../controller/user.controller.js";
import { protectRoute } from "../../middleware/auth.js";
userRouter.post("/signup", signUp);
userRouter.get("/all-user", allUsers);
userRouter.post("/login", login);
userRouter.get("/check", protectRoute, checkAuth);
userRouter.put("/update-profile", protectRoute, updateProfile);

export default userRouter;
