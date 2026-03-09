import { colors, fonts, rgba } from "../theme/theme";

const SectionLabel = ({ index, title, subtitle, textMuted, isVisible }) => (
  <div style={{
    maxWidth: 1200,
    margin: "0 auto 60px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  }}>
    <div style={{
      display: "flex",
      alignItems: "baseline",
      gap: 16,
      marginBottom: 8,
    }}>
      <span style={{
        fontFamily: fonts.body,
        fontSize: 12,
        color: colors.gold,
        letterSpacing: "0.2em",
      }}>
        0{index + 1}
      </span>
      <div style={{
        width: 40,
        height: 1,
        background: rgba(colors.gold, 0.3),
      }} />
    </div>
    <h2 style={{
      fontFamily: fonts.heading,
      fontSize: "clamp(32px, 4vw, 52px)",
      fontWeight: 400,
      margin: "0 0 12px",
      lineHeight: 1.1,
    }}>
      {title}
    </h2>
    <p style={{
      fontFamily: fonts.body,
      fontSize: 15,
      fontWeight: 300,
      color: textMuted,
      letterSpacing: "0.03em",
      margin: 0,
    }}>
      {subtitle}
    </p>
  </div>
);

export default SectionLabel;
