import { STATS } from "../data/portfolioData.js";
import ScrollReveal from "../components/ScrollReveal.jsx";
import React, { useState } from "react";
import myCV from "../assets/Roy_CV.pdf";
import profileImg from "../assets/Roy_image.jpg"; 
import backImg from "../assets/Roy1_image.jpg";
export default function HeroSection() { const [isFlipped, setIsFlipped] = useState(false);

const SOCIAL_ICONS = [
  { icon: "F", link: "https://www.facebook.com/royyyy.ayaw" },
  { icon: "in", link: "https://www.linkedin.com/in/gamilla-carl-roy-" },
  { icon: "IG", link: "https://www.instagram.com/yor.gz" },
];  

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: "100vh",
        background: "var(--page-bg)",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "20%", right: "30%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(var(--accent-color) 1px, transparent 1px), linear-gradient(90deg, var(--accent-color) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div className="hero-layout" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1200px", margin: "0 auto", paddingTop: "80px", gap: "48px" }}>

        {/* Left */}
        <div className="hero-copy" style={{ flex: 1, zIndex: 2, minWidth: 0 }}>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <p style={{ color: "var(--accent-color)", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", marginBottom: "8px", letterSpacing: "2px" }}>Hi, I am</p>
            <h2 style={{ color: "var(--text-subtle)", fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 400, margin: "0 0 8px" }}>Roy Gamilla</h2>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(52px, 7vw, 88px)", color: "var(--accent-color)", margin: "0 0 24px", lineHeight: 0.95, letterSpacing: "2px" }}>
              Full Stack<br />Developer
            </h1>
          </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.25}>
  <div className="hero-socials" style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
    {SOCIAL_ICONS.map((item, i) => (
      <a
        key={i}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: "36px", height: "36px", border: "1px solid var(--border-color)",display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)",fontSize: "12px",cursor: "pointer", transition: "all 0.3s", textDecoration: "none"}}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-color)"; e.currentTarget.style.color = "var(--accent-color)";
        }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-subtle)";
        }}
      > {item.icon}
      </a> ))}
  </div>
</ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.35}>
            <div className="hero-actions" style={{ display: "flex", gap: "16px", marginBottom: "56px", flexWrap: "wrap" }}>
              <button style={{ background: "var(--accent-color)", color: "var(--accent-text)", border: "none", padding: "14px 36px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)", transition: "all 0.3s" }}>Know More</button>
         <a  href={myCV}
              download="My_CV.pdf"
              style={{
                background: "transparent", color: "var(--text-color)",border: "1px solid var(--border-color)",padding: "14px 36px",fontFamily: "'DM Sans', sans-serif",fontWeight: 400,fontSize: "13px", letterSpacing: "1.5px",cursor: "pointer",transition: "all 0.3s",textDecoration: "none",display: "inline-flex ", alignItems: "center", justifyContent: "center",

              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-color)";e.currentTarget.style.color = "var(--accent-color)";
              }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-color)";
              }} >
              DOWNLOAD CV
            </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.45}>
            <div className="  hero-stats" style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
              {STATS.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "40px", color: "var(--accent-color)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: "var(--text-soft)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", marginTop: "4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

   {/* Right Side Flip Card */}
      <div className="hero-visual" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
        <ScrollReveal
          variant="fadeLeft"
          delay={0.3}
          className="hero-card"
          style={{ width: "380px", height: "480px", maxWidth: "100%" }}
        >
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: "100%",
              height: "100%",
              perspective: "1000px",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
            >
              {/* FRONT IMAGE */}
              <img
                src={profileImg}  
                alt="Front"
                style={{ position: "absolute", width: "100%",  height: "100%", objectFit: "cover", backfaceVisibility: "hidden", border: "1px solid var(--border-color)", clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)"
                }}
              />

              {/* BACK IMAGE */}
              <img
                src={backImg}
                alt="Back"
                style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: "rotateY(180deg)", backfaceVisibility: "hidden", border: "1px solid var(--border-color)", clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)"
                }}
              />
            </div>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}