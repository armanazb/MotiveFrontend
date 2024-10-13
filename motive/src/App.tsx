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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
