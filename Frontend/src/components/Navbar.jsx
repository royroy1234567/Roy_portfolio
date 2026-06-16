import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/portfolioData.js";
import { Menu, Moon, Sun, X } from "lucide-react";
import { createTheme } from "../theme";

export default function Navbar({ darkMode, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = createTheme(darkMode);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

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
        Roy Gamilla
      </div>

      <button
        type="button"
        className="nav-burger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        style={{
          display: "none",
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          border: `1px solid ${theme.border}`,
          background: theme.surface,
          color: theme.text,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {menuOpen ? <X style={{ width: "18px", height: "18px", color: theme.accent }} /> : <Menu style={{ width: "18px", height: "18px", color: theme.accent }} />}
      </button>

      {/* Links */}
      <ul className="nav-links" style={{ display: "flex", gap: "36px", listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap", justifyContent: "center" }}>
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={handleNavClick}
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
          type="button"
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
          type="button"
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
          onClick={() => {
            setMenuOpen(false);
            document.querySelector("#about-me")?.scrollIntoView({ behavior: "smooth" });
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

      {menuOpen && (
        <div
          className="nav-mobile-panel"
          style={{
            display: "none",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: scrolled ? (darkMode ? "rgba(10,10,10,0.98)" : "rgba(248,250,252,0.98)") : (darkMode ? "rgba(10,10,10,0.98)" : "rgba(248,250,252,0.98)"),
            borderBottom: `1px solid ${theme.borderSoft}`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
            padding: "16px 16px 20px",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={handleNavClick}
                style={{
                  color: theme.textMuted,
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  padding: "10px 0",
                  borderBottom: `1px solid ${theme.borderSoft}`,
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              document.querySelector("#about-me")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background: theme.accent,
              color: theme.accentText,
              border: "none",
              padding: "12px 18px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "1px",
              cursor: "pointer",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              transition: "all 0.3s",
            }}
          >
            Know More
          </button>
        </div>
      )}
    </nav>
  );
}