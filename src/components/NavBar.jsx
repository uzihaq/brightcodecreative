import { colors, fonts } from "../theme/theme";
import { navLinks, navCtaText } from "../data/siteContent";
import Logo from "./Logo";

const NavBar = ({ T, scrollY, isMobile, scrollToSection }) => (
  <nav style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: isMobile ? "16px 20px" : "24px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    background: scrollY > 100 ? T.bgNav : "transparent",
    backdropFilter: scrollY > 100 ? "blur(20px)" : "none",
    borderBottom: scrollY > 100 ? `1px solid ${T.border}` : "none",
    transition: "all 0.4s ease",
  }}>
    <Logo textColor={T.text} />

    <div style={{ display: "flex", gap: isMobile ? 12 : 36, alignItems: "center" }}>
      {!isMobile && navLinks.map(({ label, sectionIndex }) => (
        <a key={label} href="#"
          onClick={e => { e.preventDefault(); scrollToSection(sectionIndex); }}
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: T.textMuted,
            textDecoration: "none",
            transition: "color 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={e => e.target.style.color = colors.gold}
          onMouseLeave={e => e.target.style.color = T.textMuted}
        >
          {label}
        </a>
      ))}
      {!isMobile && <button
        onClick={() => scrollToSection(6)}
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: colors.darkCard,
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
          border: "none",
          padding: "10px 24px",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 500,
        }}>
        {navCtaText}
      </button>}
    </div>
  </nav>
);

export default NavBar;
