import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: { type: String },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const user = mongoose.models.User || mongoose.model("User", userSchema);
export default user;
