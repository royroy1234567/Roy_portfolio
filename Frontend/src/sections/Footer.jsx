import { NAV_LINKS } from "../data/portfolioData.js";
import ScrollReveal from "../components/ScrollReveal.jsx";

const SOCIAL_ICONS = ["𝕏", "in", "Be", "Dr"];

export default function Footer() {
  return (
    <footer style={{ background: "var(--page-bg-alt)", borderTop: "1px solid var(--border-color)", padding: "60px 80px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal variant="fadeUp">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
            {/* Left */}
            <div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", color: "var(--accent-color)", letterSpacing: "4px", marginBottom: "16px" }}>MAHMOOD</div>
              <div style={{ display: "flex", gap: "24px" }}>
                {NAV_LINKS.map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    style={{ color: "var(--text-soft)", fontSize: "12px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--accent-color)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-soft)")}
                  >{link}</a>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                {SOCIAL_ICONS.map((icon, i) => (
                  <div key={i}
                    style={{ width: "32px", height: "32px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-soft)", fontSize: "11px", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-color)"; e.currentTarget.style.color = "var(--accent-color)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-soft)"; }}
                  >{icon}</div>
                ))}
              </div>
              <p style={{ color: "var(--text-soft)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", margin: "4px 0 0" }}>MahmoodFazile786@gmail.com</p>
              <p style={{ color: "var(--text-soft)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>+93 729 307 085</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeIn" delay={0.2}>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ color: "var(--text-soft)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", margin: 0, letterSpacing: "1px" }}>
              © 2024 MAHMOOD FAZILE — DESIGNED & BUILT WITH ♥
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}