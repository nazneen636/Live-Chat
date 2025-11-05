import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("");
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
        <form className="bg-[#1e1f2b]/80 text-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-gray-600">
          <h2 className="text-2xl font-semibold mb-6 text-center text-violet-300">
            Create an Account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none"
              required
            />
          </div>

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
            Sign Up
          </button>

          {/* Already Have an Account */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-violet-400 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
