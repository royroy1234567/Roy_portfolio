import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./index.css";
import ChatBot from "./components/ChatBot";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import PortfolioSection from "./sections/PortfolioSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import InventoryApp from "./mini_inventory/inventory";
import api from './api/axios';
import { createTheme, THEME_STORAGE_KEY } from "./theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light') return false;
    if (savedTheme === 'dark') return true;
    return true;
  });

  const theme = createTheme(darkMode);

  useEffect(() => {
    api.get('/test')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div style={{ background: theme.page, minHeight: "100vh", color: theme.text, transition: "background 0.3s ease, color 0.3s ease" }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
              <HeroSection darkMode={darkMode} />
              <ServicesSection darkMode={darkMode} />
              <AboutSection darkMode={darkMode} />
              <PortfolioSection darkMode={darkMode} />
              <ContactSection darkMode={darkMode} />
              <ChatBot darkMode={darkMode} />
              <Footer darkMode={darkMode} />
            </>
          }
        />

        <Route path="/inventory" element={<InventoryApp darkMode={darkMode} onToggleTheme={toggleTheme} />} />
      </Routes>
    </div>
  );
}