import SectionHeader from "../components/SectionHeader.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import ContactInput from "../components/shared/ContactInput.jsx";

export default function ContactSection() {
  return (
    <section id="contact-me" className="section-shell" style={{ background: "var(--page-bg)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScrollReveal variant="fadeUp">
          <SectionHeader title="Contact me" subtitle="Cultivating Connections: Reach Out And Connect With Me" />
        </ScrollReveal>

        <div style={{ marginTop: "60px" }}>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <ContactInput placeholder="Name" />
              <ContactInput placeholder="Email" />
              <ContactInput placeholder="Phone Number" />
              <ContactInput placeholder="Service (Optional)" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <textarea
              placeholder="Project Details..."
              rows={5}
              style={{
                width: "100%", background: "var(--input-bg)", border: "1px solid var(--input-border)",
                color: "var(--input-text)", padding: "16px", fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", resize: "none", outline: "none",
                boxSizing: "border-box", letterSpacing: "0.5px",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-color)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
            />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              <button
                style={{ background: "var(--accent-color)", color: "var(--accent-text)", border: "none", padding: "14px 52px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", cursor: "pointer", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)", transition: "all 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent-color)")}
              >
                SEND
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}