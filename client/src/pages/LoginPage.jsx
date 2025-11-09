import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      console.log(isDataSubmitted);
      console.log(email);
      console.log(fullName);
      console.log(password);

      if (currState === "Sign Up" && !isDataSubmitted) {
        setIsDataSubmitted(true);
        return;
      }
      login(currState == "Sign Up" ? "signup" : "login");
    } catch (error) {
      console.log(error?.response);
    }
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img
        src={assets.logo_big}
        alt=""
        className="w-[min(40vw,250px)] max-sm:w-40"
      />

      {/* form */}
      {/* Right Form */}
      <div className=" flex justify-center items-center">
        <form
          onSubmit={onSubmitHandler}
          className="bg-black/20 md:w-[400px] text-white p-8 rounded-2xl shadow-md w-full max-w-lg border border-gray-600"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-violet-300 flex justify-between items-center">
            {currState}
            {isDataSubmitted && (
              <img
                onClick={() => setIsDataSubmitted(false)}
                src={assets.arrow_icon}
                alt=""
                className="w-5 cursor-pointer"
              />
            )}
          </h2>

          {currState === "Sign Up" && !isDataSubmitted && (
            // full name
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                  console.log(fullName);
                }}
                value={fullName}
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
                required
              />
            </div>
          )}

          {/* email & password */}
          {!isDataSubmitted && (
            <div>
              {/* email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(email);
                  }}
                  value={email}
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
              {/* password */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(password);
                  }}
                  value={password}
                  placeholder="Create a password"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* bio */}
          {currState === "Sign Up" && isDataSubmitted && (
            // full name
            <div className="mb-4">
              {/* <label htmlFor="bio" className="block text-sm mb-1">
                Bio
              </label> */}
              <textarea
                rows={4}
                id="bio"
                placeholder="Provide a short bio"
                onChange={(e) => {
                  setBio(e.target.value);
                  console.log(bio);
                }}
                value={bio}
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
                required
              ></textarea>
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="terms"
              className="accent-violet-500 w-4 h-4"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-violet-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-linear-to-r from-purple-400 to-violet-600 rounded-full font-medium text-white hover:opacity-90 transition duration-200"
          >
            {currState === "Sign Up" ? "Create an account" : "Login"}
          </button>

          {/* Already Have an Account */}
          <div className="text-center text-sm text-gray-400 mt-4">
            {currState === "Sign Up" ? (
              <div className="">
                <p className="">
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setCurrState("Login");
                      setIsDataSubmitted(false);
                    }}
                    className="text-violet-400 hover:underline"
                  >
                    Login
                  </span>
                </p>
              </div>
            ) : (
              <div className="">
                <p className="">
                  Create an account{" "}
                  <span
                    onClick={() => {
                      setCurrState("Sign Up");
                      setIsDataSubmitted(false);
                    }}
                    className="text-violet-400 hover:underline"
                  >
                    Click here
                  </span>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
