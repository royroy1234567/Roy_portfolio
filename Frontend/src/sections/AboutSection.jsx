
import { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import myImage from "../assets/Roy_image.jpg";
import myCV from "../assets/Roy_CV.pdf";
import { SKILLS } from "../data/portfolioData.js";

export default function AboutSection() {
  return (
    <section id="about-me" className="section-shell" style={{ background: "var(--page-bg)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal variant="fadeUp">
          <SectionHeader title="About Me" subtitle="User Interface And User Experience And Also Adobe Editing" />
        </ScrollReveal>

        <div className="about-layout" style={{ display: "flex", gap: "80px", alignItems: "flex-start", marginTop: "30px",  }}>
          {/* Image */}
          <ScrollReveal variant="fadeRight" delay={0.1} className="about-image-shell" style={{ flex: "0 0 320px",    transform: "translateY(-100px)"  }}>
            <div className="about-image" style={{ width: "320px", height: "420px", background: "linear-gradient(145deg, var(--surface-bg), var(--surface-bg-alt))", border: "1px solid var(--border-color)", clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.04))" }} />
              <img src={myImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) brightness(90%)" }} />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal variant="fadeLeft" delay={0.2} className="about-bio" style={{ flex: 1 }}>
            <p style={{ color: "var(--text-subtle)", fontSize: "14px", lineHeight: 2, fontFamily: "'DM Sans', sans-serif", marginBottom: "28px" }}>
             I’m  Roy Gamilla, a Full Stack Developer with over 3 years of hands-on experience in designing and building web applications. I specialize in creating responsive and intuitive frontend interfaces while developing scalable and efficient backend systems. My work blends solid technical architecture with clean, user-friendly design principles, allowing me to deliver seamless digital experiences from concept to deployment. Passionate about continuous learning, I enjoy exploring new technologies and applying best practices to solve complex problems effectively.
            </p>
            <p style={{ color: "var(--text-soft)", fontSize: "14px", lineHeight: 2, fontFamily: "'DM Sans', sans-serif", marginBottom: "36px" }}>
             With experience across 10+ technologies and multiple academic projects, I continuously refine my skills to deliver efficient, user-centered digital solutions.
            </p>
            <a href={myCV} 
               style={{
                background: "transparent", color: "var(--text-color)",border: "1px solid var(--border-color)",padding: "14px 36px",fontFamily: "'DM Sans', sans-serif",fontWeight: 400,fontSize: "13px", letterSpacing: "1.5px",cursor: "pointer",transition: "all 0.3s",textDecoration: "none",display: "inline-block"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-color)"; e.currentTarget.style.color = "var(--accent-text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent-color)"; }}
            >
              ↓ DOWNLOAD CV
            </a>
          </ScrollReveal>
        </div>

        {/* Skill circles — each staggered */}
        <div className="skill-grid" style={{ display: "flex", gap: "100px", marginTop: "10px", flexWrap: "wrap", marginLeft: "140px"  }}>
          {SKILLS.map((skill, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
              <SkillCircle skill={skill} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function SkillCircle({ skill }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  // 👀 Detect when element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once only
        }
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🎯 Animate when visible
  useEffect(() => {
    if (isVisible) {
      const progressOffset =
        circumference - (skill.level / 100) * circumference;
      setOffset(progressOffset);
    }
  }, [isVisible, skill.level, circumference]);

  return (
    <div
      ref={circleRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div style={{ position: "relative", width: "100px", height: "100px" }}>
        <svg
          width="100"
          height="100"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="4"
          />

          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "20px",
              color: "var(--accent-color)",
              lineHeight: 1,
            }}
          >
            {skill.level}%
          </span>
        </div>
      </div>

      <span
        style={{
          color: "var(--text-subtle)",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "1px",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}