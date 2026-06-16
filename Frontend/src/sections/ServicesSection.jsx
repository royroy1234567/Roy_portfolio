import SectionHeader from "../components/SectionHeader.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { SERVICES } from "../data/portfolioData.js";

export default function ServicesSection() {
  return (
    <section id="tools-&-technologies" className="section-shell" style={{ background: "var(--page-bg-alt)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal variant="fadeUp">
          <SectionHeader
            title="Tools & Technologies"
            subtitle="From responsive interfaces to scalable backend systems — delivering complete web solutions."
          />
        </ScrollReveal>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginTop: "60px" }}>
          {SERVICES.map((service, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <div
      style={{ background: "var(--surface-bg)", padding: "40px 32px", border: "1px solid var(--border-color)", transition: "all 0.4s ease", cursor: "default", position: "relative", overflow: "hidden", height: "100%" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-color)";
        e.currentTarget.style.background = "var(--card-hover)";
        e.currentTarget.querySelector(".card-accent").style.width = "100%";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.background = "var(--surface-bg)";
        e.currentTarget.querySelector(".card-accent").style.width = "0%";
      }}
    >
      <div className="card-accent" style={{ position: "absolute", top: 0, left: 0, height: "2px", background: "var(--accent-color)", width: "0%", transition: "width 0.4s ease" }} />
<img 
  src={service.icon}
  style={{
    width: service.width || "200px",
    height: service.height || "80px",
    marginBottom: "12px",
    objectFit: "cover",
    transform: `translate(${service.offsetX || "0px"}, ${service.offsetY || "0px"})`
  }}
/>
      <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: "var(--text-color)", letterSpacing: "2px", marginBottom: "12px" }}>{service.title}</h3>
      <p style={{ color: "var(--text-soft)", fontSize: "13px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{service.desc}</p>
    </div>
  );
}