import { colors, fonts } from "../theme/theme";
import { footerCopyright, footerSocials } from "../data/siteContent";

const Footer = ({ T, isMobile }) => (
  <footer style={{
    padding: isMobile ? "32px 20px" : "40px 48px",
    borderTop: `1px solid ${T.border}`,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? 16 : 0,
  }}>
    <span style={{
      fontFamily: fonts.body,
      fontSize: 12,
      color: T.textFaint,
      letterSpacing: "0.05em",
    }}>
      {footerCopyright}
    </span>
    <div style={{ display: "flex", gap: 24 }}>
      {footerSocials.map(platform => (
        <a key={platform} href="#" style={{
          fontFamily: fonts.body,
          fontSize: 12,
          color: T.textFaint,
          textDecoration: "none",
          letterSpacing: "0.05em",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={e => e.target.style.color = colors.gold}
        onMouseLeave={e => e.target.style.color = T.textFaint}
        >
          {platform}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
