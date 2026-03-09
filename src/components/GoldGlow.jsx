import { rgba } from "../theme/theme";
import { colors } from "../theme/theme";

const GoldGlow = ({ x, y }) => (
  <div
    style={{
      position: "fixed",
      left: x - 200,
      top: y - 200,
      width: 400,
      height: 400,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${rgba(colors.gold, 0.06)} 0%, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 0,
      transition: "left 0.3s ease-out, top 0.3s ease-out",
    }}
  />
);

export default GoldGlow;
