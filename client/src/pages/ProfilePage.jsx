import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!profileImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(profileImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };
  if (!authUser) {
    console.log("authUser is still loading...");
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="flex flex-col max-sm:flex-col-reverse md:flex-row bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden shadow-lg w-5/6 max-w-2xl items-center justify-center ">
        {/* Left Side - Edit Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full  p-8 flex flex-col justify-center "
        >
          <h2 className="text-2xl font-semibold text-violet-300 mb-6 ">
            Edit Profile
          </h2>

          {/* Profile Upload */}
          <div className=" mb-6">
            <label
              htmlFor="profileImage"
              className="cursor-pointer text-base text-white mb-1 flex gap-2 items-center "
            >
              {" "}
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : authUser.profilePic
                    ? authUser.profilePic
                    : assets.avatar_icon
                }
                alt="Profile"
                className={`w-12 h-12 rounded-full object-cover  hover:opacity-80 transition`}
              />
              <input
                type="file"
                id="profileImage"
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                  console.log(profileImage);
                }}
                accept=".png, .jpeg, .jpg"
                hidden
              />
              <p className="text-gray-400 text-sm mt-2">Upload Profile Image</p>
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            {/* <label className="block text-sm mb-1">Full Name</label> */}
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            {/* <label className="block text-sm mb-1">Bio</label> */}
            <textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                console.log(bio);
              }}
              placeholder="Tell something about yourself"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2 bg-linear-to-r from-[#4a4ab1] to-[#1e1e55] cursor-pointer hover:opacity-75 rounded-full font-medium text-white  transition duration-200"
          >
            Save Changes
          </button>
        </form>

        {/* <img
          src={authUser.profilePic || assets.logo_icon}
          alt=""
          className={`h-24 w-24  aspect-square rounded-full mx-10 max-sm:mt-10 ${
            profileImage && "rounded-full"
          }`}
        /> */}
        {/* Right Side - Preview Section */}
        <div className="w-full h-full  flex flex-col items-center justify-center py-6 rounded-md bg-[#6e5bb1]/20 mr-5">
          <h3 className="text-xl font-semibold mb-4 text-violet-300">
            Preview
          </h3>
          <img
            src={authUser?.profilePic || assets.avatar_icon}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-violet-500/40 mb-4"
          />
          <h4 className="text-lg font-bold capitalize">
            {name || "Your Name"}
          </h4>
          <p className="text-gray-400 text-center mt-2 max-w-sm">
            {bio || "Your bio will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
