import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import EditSlide from "./pages/editSlide/EditSlide";
import SlideManager from "./pages/SlideManager/SlideManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditSlide />} />
        <Route path="/play" element={<SlideManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
