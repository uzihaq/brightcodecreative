import { categoryMeta } from "../data/projects";
import SectionLabel from "../components/SectionLabel";
import ProjectCard from "../components/ProjectCard";

const WorkPage = ({ sectionsRef, visibleSections, isMobile, T, onProjectClick }) => (
  <>
    {categoryMeta.map((category, catIndex) => (
      <section
        key={category.id}
        ref={el => sectionsRef.current[catIndex + 1] = el}
        style={{
          minHeight: "100vh",
          padding: isMobile ? "80px 20px" : "120px 48px",
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
      </section>
    ))}
  </>
);

export default WorkPage;
