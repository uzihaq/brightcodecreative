import { colors, fonts } from "../theme/theme";
import { logoInitials, logoName, logoSubtitle } from "../data/siteContent";

const Logo = ({ textColor }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{
      width: 36,
      height: 36,
      borderRadius: 8,
      background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 50%, ${colors.gold} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: fonts.heading,
      fontSize: 16,
      fontWeight: 600,
      color: colors.darkCard,
    }}>
      {logoInitials}
    </div>
    <div>
      <div style={{
        fontFamily: fonts.body,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.08em",
        color: textColor,
      }}>
        {logoName}
      </div>
      <div style={{
        fontFamily: fonts.body,
        fontSize: 9,
        letterSpacing: "0.25em",
        color: `rgba(${parseInt(colors.gold.slice(1, 3), 16)},${parseInt(colors.gold.slice(3, 5), 16)},${parseInt(colors.gold.slice(5, 7), 16)},0.7)`,
        marginTop: -1,
      }}>
        {logoSubtitle}
      </div>
    </div>
  </div>
);

export default Logo;
