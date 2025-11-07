import customError from "../helpers/customError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, resizeBy, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      throw new customError(401, "user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new customError(401, "user not found");
  }
};
