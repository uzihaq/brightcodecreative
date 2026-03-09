import { useState } from "react";
import { colors, fonts, rgba } from "../theme/theme";
import { mediaTypeBadges } from "../data/siteContent";

const ProjectCard = ({ item, index, isVisible, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: index === 0 ? "16/10" : "4/5",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        gridColumn: index === 0 ? "1 / -1" : "auto",
      }}
    >
      {item.photo ? (
        <img
          src={item.photo}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: item.imageFocus || "center center",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          draggable={false}
        />
      ) : (
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${item.color}44 0%, ${item.color}11 50%, #0a0a0a 100%)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }} />
      )}

      {/* Dark overlay on photos for text legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: item.photo
          ? "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)"
          : `radial-gradient(circle at ${hovered ? '30% 30%' : '50% 50%'}, ${item.color}22 0%, transparent 60%)`,
        transition: "all 0.6s ease",
      }} />

      <div style={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "4px 10px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{
          fontFamily: fonts.body,
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}>
          {item.type === "video" ? mediaTypeBadges.video : mediaTypeBadges.image}
        </span>
      </div>

      {item.type === "video" && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${hovered ? 1.1 : 1})`,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: rgba(colors.gold, 0.15),
          backdropFilter: "blur(10px)",
          border: `1px solid ${rgba(colors.gold, 0.3)}`,
          display: index === 0 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s ease",
          opacity: hovered ? 1 : 0.7,
        }}>
          <div style={{
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderLeft: `14px solid ${rgba(colors.gold, 0.9)}`,
            marginLeft: 3,
          }} />
        </div>
      )}

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: index === 0 ? "40px 28px 28px" : "30px 20px 20px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
      }}>
        <h3 style={{
          fontFamily: fonts.heading,
          fontSize: index === 0 ? 28 : 18,
          fontWeight: 500,
          color: "#fff",
          margin: 0,
          lineHeight: 1.2,
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: fonts.body,
          fontSize: index === 0 ? 14 : 12,
          color: "rgba(255,255,255,0.5)",
          margin: "6px 0 0",
          letterSpacing: "0.03em",
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
