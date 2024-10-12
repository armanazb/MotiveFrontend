import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={<Home />} 
   

      </Routes>
    </div>
  );
}

export default App;
