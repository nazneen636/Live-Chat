import asyncHandler from "../helpers/asyncHandler.js";
import apiResponse from "../helpers/apiResponse.js";
import customError from "../helpers/customError.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getUserForSiderbar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
    "-password"
  );
  const unseenMessage = {};
  const promises = filteredUsers.map(async (user) => {
    const messages = await Message.find({
      senderId: user._id,
      receiverId: userId,
      seen: false,
    });
    if (messages.length > 0) {
      unseenMessage[user._id] = messages.length;
    }
  });
  await Promise.all(promises);
  if (!filteredUsers) {
    throw new customError(401, "message user not found");
  }
  apiResponse.sendSuccess(res, 201, "unseen messages", {
    users: filteredUsers,
    unseenMessage,
  });
});

// get all messages for selected user
