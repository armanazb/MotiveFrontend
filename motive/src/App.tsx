import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home";
import MotivePricingPage from "./pages/pricing";
import "./App.css";
import ChatbotSearch from "./pages/maps";
import ContactPage from "./pages/contact";
import FeaturesPage from "./pages/features";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<MotivePricingPage />} />
        <Route path="/maps" element={<ChatbotSearch />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
