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
import RouteGuard from "./libs/routeGuard";
import RouteGuard2 from "./libs/routeGaurd2";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<MotivePricingPage />} />
        <Route
          path="/maps"
          element={
            <RouteGuard>
              <ChatbotSearch />
            </RouteGuard>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/login"
          element={
            <RouteGuard2>
              <LoginPage />
            </RouteGuard2>
          }
        />
        <Route
          path="/signup"
          element={
            <RouteGuard2>
              <SignupPage />
            </RouteGuard2>
          }
        />
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
