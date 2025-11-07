import asyncHandler from "../helpers/asyncHandler.js";
import apiResponse from "../helpers/apiResponse.js";
import customError from "../helpers/customError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import cloudinary from "../utils/cloudinary.js";

export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  if (!fullName || !email || !password || !bio) {
    throw new customError(401, "input field missing");
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new customError(401, "Account already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    fullName,
    email,
    password: hashPassword,
    bio,
  });
  const token = generateToken(newUser._id);
  newUser.token = token;
  await newUser.save();
  apiResponse.sendSuccess(res, 201, "user create successfully", {
    user: newUser,
    token,
  });
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect) {
    throw new customError(401, "Invalid Credentials");
  }
  const token = generateToken(userData._id);
  apiResponse.sendSuccess(res, 201, "Login successfully", { userData, token });
});

// controller to check if the user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { profilePic, bio, fullName } = req.body;
  const userId = req.user._id;
  let updateUser;
  if (!profilePic) {
    updateUser = await User.findByIdAndUpdate(
      userId,
      { bio, fullName },
      { new: true }
    );
  } else {
    const upload = await cloudinary.uploader.upload(profilePic);
    updateUser = await User.findByIdAndUpdate(userId, {
      fullName,
      bio,
      profilePic: upload.secure_url,
    });
  }
  if (!updateUser) {
    throw new customError(401, "updated profile failed");
  }
  apiResponse.sendSuccess(res, 201, "updated profile", updateUser);
});
