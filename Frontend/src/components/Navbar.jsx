import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/portfolioData.js";
import { Moon, Sun } from "lucide-react";
import { createTheme } from "../theme";

export default function Navbar({ darkMode, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const theme = createTheme(darkMode);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="site-navbar"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? (darkMode ? "rgba(10,10,10,0.95)" : "rgba(248,250,252,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.borderSoft}` : "none",
        padding: "0 40px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "28px",
          color: theme.accent,
          letterSpacing: "3px",
        }}
      >
        Carl Roy Gamilla
      </div>

      {/* Links */}
      <ul className="nav-links" style={{ display: "flex", gap: "36px", listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap", justifyContent: "center" }}>
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: theme.textMuted,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.5px",
                transition: "color 0.3s",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.accent)}
              onMouseLeave={(e) => (e.target.style.color = theme.textMuted)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={onToggleTheme}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: `1px solid ${theme.border}`,
            background: theme.surface,
            color: theme.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {darkMode ? <Sun style={{ width: "18px", height: "18px", color: theme.accent }} /> : <Moon style={{ width: "18px", height: "18px", color: theme.accent }} />}
        </button>

        <button
          style={{
            background: theme.accent,
            color: theme.accentText,
            border: "none",
            padding: "10px 28px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "1px",
            cursor: "pointer",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.accentHover;
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.accent;
            e.target.style.transform = "scale(1)";
          }}
        >
          Know More
        </button>
      </div>
    </nav>
  );
}