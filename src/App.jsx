import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HeroSection from "./components/HeroSection";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import Quiz from "./components/Quiz"; 
import BirthdayLetter from "./components/BirthdayLetter";
import GiftReveal from "./components/GiftReveal";
import CountdownLoader from "./components/CountdownLoader";

// AppContent component to handle navigation logic inside Router context
function AppContent() {
  const [showCountdown, setShowCountdown] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    navigate("/");
  };

  return (
    <div className="app">
      {showCountdown && (
        <CountdownLoader onComplete={handleCountdownComplete} />
      )}
      {!showCountdown && (
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/timeline" element={<Timeline />} />
          {/* <Route path="/quiz" element={<Quiz />} /> Add this route */}
          <Route path="/letter" element={<BirthdayLetter />} />
          {/* Fallback route */}
          <Route path="*" element={<HeroSection />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
