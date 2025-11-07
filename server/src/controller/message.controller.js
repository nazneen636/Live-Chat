import asyncHandler from "../helpers/asyncHandler.js";
import apiResponse from "../helpers/apiResponse.js";
import customError from "../helpers/customError.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUserForSidebar = asyncHandler(async (req, res) => {
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
  apiResponse.sendSuccess(res, 201, "messages get successfully", {
    users: filteredUsers,
    unseenMessage,
  });
});

// get all messages for selected user
export const getMessages = asyncHandler(async (req, res) => {
  const { id: selectedUserId } = req.params;
  const myId = req.user._id;
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: selectedUserId },
      {
        senderId: selectedUserId,
        receiverId: myId,
      },
    ],
  });
  await Message.updateMany(
    { senderId: selectedUserId, receiverId: myId },
    { seen: true }
  );
  if (!messages) {
    throw new customError("something went wrong to get message");
  }
  apiResponse.sendSuccess(res, 201, "message seen", messages);
});

// api to mark message as seen using message id
export const markMessageAsSeen = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findByIdAndUpdate(id, { seen: true });
  if (!message) {
    throw new customError(401, "message not seen");
  }
  apiResponse.sendSuccess(res, 201, "message seen successfully");
});
