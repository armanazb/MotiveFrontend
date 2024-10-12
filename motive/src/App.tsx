import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home";
import MotivePricingPage from "./pages/pricing";
import RouteGuard from "./libs/routeGuard";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<MotivePricingPage />} />
      </Routes>
    </div>
  );
}

export default App;
