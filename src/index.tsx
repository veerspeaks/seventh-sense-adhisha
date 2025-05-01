import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Onboarding } from "./screens/Onboarding";
import { Privacy } from "./screens/Privacy/Privacy";
import { Terms } from "./screens/Terms/Terms";
import { About } from "./screens/About/About";
import { AnimatePresence } from "framer-motion";

// AnimationWrapper component for Routes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
);
