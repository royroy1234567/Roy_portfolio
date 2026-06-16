import { useScrollReveal } from "../hooks/useScrollReveal.js";

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, transform: "translateY(40px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  fadeDown: {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, transform: "translateX(-60px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, transform: "translateX(60px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  fadeIn: {
    hidden: { opacity: 0, transform: "scale(0.95)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  slideUp: {
    hidden: { opacity: 0, transform: "translateY(80px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  threshold = 0.15,
  style = {},
  className = "",
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });
  const { hidden, visible } = VARIANTS[variant] || VARIANTS.fadeUp;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...hidden,
        ...(isVisible ? visible : {}),
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}