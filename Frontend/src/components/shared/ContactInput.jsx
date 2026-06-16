export default function ContactInput({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      style={{
        background: "var(--input-bg)",
        border: "1px solid var(--input-border)",
        color: "var(--input-text)",
        padding: "14px 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        letterSpacing: "0.5px",
        transition: "border-color 0.3s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--accent-color)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
    />
  );
}