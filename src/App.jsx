import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; // Ensure file extension matches
import "./styles/Navbar.css";  
import "./styles/BlogList.css";  
import "./styles/ContactUs.css";  



// Lazy loading for performance optimization
const BlogList = lazy(() => import("./components/BlogList.jsx"));
const ContactUs = lazy(() => import("./components/ContactUs.jsx"));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
