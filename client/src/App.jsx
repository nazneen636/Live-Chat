import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <div className="bg-[url(/src/assets/bgImage.svg)] bg-no-repeat bg-center bg-cover">
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
      ,
    </div>
  );
};

export default App;
