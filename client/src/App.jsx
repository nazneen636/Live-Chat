import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <div className="bg-[url(/src/assets/bgImage.svg)] bg-no-repeat bg-center bg-cover">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      ,
    </div>
  );
};

export default App;
