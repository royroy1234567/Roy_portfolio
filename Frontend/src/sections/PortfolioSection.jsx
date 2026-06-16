import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { PORTFOLIO_TABS, PORTFOLIO_ITEMS } from "../data/portfolioData.js";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="section-shell" style={{ background: "var(--page-bg-alt)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal variant="fadeUp">
          <SectionHeader title="Portfolio" />
        </ScrollReveal>

        {/* Tab bar */}
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="portfolio-tabs" style={{ display: "flex", gap: "4px", marginTop: "40px", marginBottom: "48px", flexWrap: "wrap" }}>
            {PORTFOLIO_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 20px",
                  background: activeTab === tab ? "var(--accent-color)" : "transparent",
                  color: activeTab === tab ? "var(--accent-text)" : "var(--text-subtle)",
                  border: "1px solid " + (activeTab === tab ? "var(--accent-color)" : "var(--border-color)"),
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px", letterSpacing: "1px",
                  fontWeight: activeTab === tab ? 700 : 400,
                  cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { if (activeTab !== tab) { e.currentTarget.style.borderColor = "var(--accent-color)"; e.currentTarget.style.color = "var(--accent-color)"; } }}
                onMouseLeave={(e) => { if (activeTab !== tab) { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-subtle)"; } }}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} variant="fadeUp" delay={i * 0.08}>
              <PortfolioCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(item.link)}
      style={{
        background: item.color,
        aspectRatio: "4/3",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--border-color)",
        transition: "transform 0.4s",
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--accent-color)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        gap: "8px",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: "var(--accent-text)", letterSpacing: "2px" }}>{item.title}</div>
        <div style={{ color: "var(--accent-text)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.category}</div>
        <div style={{ width: "40px", height: "40px", border: "2px solid var(--accent-text)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px" }}>
          <span style={{ color: "var(--accent-text)", fontSize: "18px" }}>→</span>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: "12px", left: "16px", right: "16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        opacity: hovered ? 0 : 1, transition: "opacity 0.3s",
      }}>
        <span style={{ color: "var(--text-soft)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif" }}>Name Project</span>
        <span style={{ color: "var(--accent-color)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif" }}>Category →</span>
      </div>
    </div>
  );
}