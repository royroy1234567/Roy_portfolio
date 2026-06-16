export default function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(36px, 5vw, 56px)",
          color: "var(--text-color)",
          letterSpacing: "4px",
          margin: "0 0 16px",
          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
        <span
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "2px",
            background: "var(--accent-color)",
          }}
        />
      </h2>

      {subtitle && (
        <p
          style={{
            color: "var(--text-soft)",
            fontSize: "13px",
            maxWidth: "480px",
            margin: "24px auto 0",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.7,
            letterSpacing: "0.3px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}