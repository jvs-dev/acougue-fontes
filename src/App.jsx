import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import EditSlide from "./pages/editSlide/EditSlide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditSlide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
