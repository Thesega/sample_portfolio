import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuroraSky from './components/AuroraSky';
import GlucoText from './components/GlucoText';
import AboutUs from './components/AboutUs'; // import your About page

// Wrapper to handle swipe and scroll navigation
const SwipeNavigationWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  useEffect(() => {
    // Touch start
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    // Touch move
    const handleTouchMove = (e) => {
      touchEndY.current = e.touches[0].clientY;
    };

    // Touch end (swipe)
    const handleTouchEnd = () => {
      const start = touchStartY.current;
      const end = touchEndY.current;
      const delta = start - end;

      if (Math.abs(delta) > 50) {
        if (delta > 0 && location.pathname === '/') {
          navigate('/about');
        } else if (delta < 0 && location.pathname === '/about') {
          navigate('/');
        }
      }

      touchStartY.current = null;
      touchEndY.current = null;
    };

    // Wheel scroll (for desktop)
    let lastScrollTime = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 1000) return; // prevent rapid navigation
      lastScrollTime = now;

      if (e.deltaY > 50 && location.pathname === '/') {
        navigate('/about');
      } else if (e.deltaY < -50 && location.pathname === '/about') {
        navigate('/');
      }
    };

    // Add event listeners
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('wheel', handleWheel);

    return () => {
      // Clean up
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [navigate, location]);

  return children;
};

// Home page layout
const Home = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AuroraSky />
      <GlucoText />
    </div>
  );
};

// Main App with routing and swipe/scroll wrapper
function App() {
  return (
    <Router>
      <SwipeNavigationWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </SwipeNavigationWrapper>
    </Router>
  );
}

export default App;
