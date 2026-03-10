import { useState } from "react";
import { colors, fonts, rgba } from "../theme/theme";
import { categoryMeta } from "../data/projects";
import SectionLabel from "../components/SectionLabel";
import ProjectCard from "../components/ProjectCard";

const PreviewThumb = ({ src, onClick, isMobile, delay, isVisible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "4/5",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
        draggable={false}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 50%)",
        transition: "opacity 0.3s ease",
        opacity: hovered ? 0.6 : 1,
      }} />
    </div>
  );
};

const WorkPage = ({ sectionsRef, visibleSections, isMobile, T, onProjectClick }) => (
  <>
    {categoryMeta.map((category, catIndex) => (
      <section
        key={category.id}
        ref={el => sectionsRef.current[catIndex + 1] = el}
        style={{
          minHeight: "auto",
          padding: isMobile ? "40px 20px" : "60px 48px",
          position: "relative",
        }}
      >
        <SectionLabel
          index={catIndex}
          title={category.title}
          subtitle={category.subtitle}
          textMuted={T.textMuted}
          isVisible={visibleSections.has(catIndex + 1)}
        />

        {/* Project grid */}
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 16 : 20,
        }}>
          {category.items.map((item, i) => (
            <ProjectCard
              key={item.title}
              item={item}
              index={i}
              isVisible={visibleSections.has(catIndex + 1)}
              onClick={() => onProjectClick(item.id)}
            />
          ))}
        </div>

        {/* Sub-thumbnails for gallery projects */}
        {category.items.length === 1 && category.items[0].previewImages && category.items[0].previewImages.length > 0 && (
          <div style={{
            maxWidth: 1200,
            margin: "20px auto 0",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 10 : 20,
          }}>
            {category.items[0].previewImages.map((src, i) => (
              <PreviewThumb
                key={i}
                src={src}
                onClick={() => onProjectClick(category.items[0].id)}
                isMobile={isMobile}
                delay={0.15 + i * 0.1}
                isVisible={visibleSections.has(catIndex + 1)}
              />
            ))}
          </div>
        )}
      </section>
    ))}
  </>
);

export default WorkPage;
