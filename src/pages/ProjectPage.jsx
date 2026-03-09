import { useState, useEffect } from "react";
import { colors, fonts, rgba } from "../theme/theme";
import { allProjects, categories } from "../data/projects";
import {
  backButtonText,
  playVideoText,
  galleryTitle,
  viewAllText,
  projectDetailLabels,
  galleryItemLabels,
} from "../data/siteContent";
import ProjectCard from "../components/ProjectCard";

const ProjectPage = ({ projectId, onBack, isMobile }) => {
  const [loaded, setLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const project = allProjects.find(p => p.id === projectId) || allProjects[0];
  useEffect(() => { setLoaded(true); setVideoPlaying(false); window.scrollTo(0, 0); }, [projectId]);

  const relatedProjects = allProjects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 3);

  return (
    <section style={{ paddingTop: isMobile ? 90 : 120, minHeight: "100vh", background: colors.dark, color: colors.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px" }}>
        <button onClick={onBack} style={{
          fontFamily: fonts.body, fontSize: 12, letterSpacing: "0.1em",
          textTransform: "uppercase", color: `rgba(245,240,232,0.5)`, background: "none",
          border: "none", cursor: "pointer", padding: "8px 0", marginBottom: 32,
          display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.color = colors.gold}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.5)"}
        >{backButtonText}</button>
      </div>

      {/* Hero */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", position: "relative",
          background: videoPlaying ? "#000" : (project.image ? `url(${project.image}) center/cover` : `linear-gradient(135deg, ${project.color}44 0%, #0a0a0a 100%)`),
          marginBottom: 60,
        }}>
          {videoPlaying && project.vimeoId ? (
            /* Vimeo embed — replaces thumbnail when play is clicked */
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&color=C4943D`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          ) : (
            <>
              <div style={{ position: "absolute", inset: 0, background: project.image ? "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))" : `radial-gradient(circle at 40% 40%, ${project.color}33 0%, transparent 60%)` }} />
              {/* Show play button only for video projects with a vimeoId */}
              {project.type === "video" && (
                <div
                  onClick={() => project.vimeoId && setVideoPlaying(true)}
                  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: project.vimeoId ? "pointer" : "default", opacity: project.vimeoId ? 1 : 0.4 }}
                >
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: rgba(colors.gold, 0.15), backdropFilter: "blur(10px)", border: `1px solid ${rgba(colors.gold, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease" }}
                    onMouseEnter={e => project.vimeoId && (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `20px solid ${rgba(colors.gold, 0.9)}`, marginLeft: 4 }} />
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>{playVideoText}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info grid */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px",
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 32 : 80,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>
        <div>
          <span style={{ fontFamily: fonts.body, fontSize: 12, letterSpacing: "0.2em", color: colors.gold, textTransform: "uppercase" }}>
            {project.year} — {categories.find(c => c.id === project.category)?.label}
          </span>
          <h1 style={{ fontFamily: fonts.heading, fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 400, margin: "12px 0 16px", lineHeight: 1.1, color: colors.cream }}>{project.title}</h1>
          <p style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 400, fontStyle: "italic", color: "rgba(245,240,232,0.5)", margin: "0 0 32px" }}>{project.desc}</p>
          <p style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.8, letterSpacing: "0.02em", maxWidth: 600 }}>{project.longDesc}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            { label: projectDetailLabels.client, value: project.client },
            { label: projectDetailLabels.role, value: project.role },
            { label: projectDetailLabels.tools, value: project.tools },
            { label: projectDetailLabels.deliverables, value: project.deliverables },
          ].map(detail => (
            <div key={detail.label}>
              <div style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.gold, marginBottom: 6 }}>{detail.label}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.6 }}>{detail.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery placeholder */}
      <div style={{ maxWidth: 1200, margin: "80px auto", padding: "0 48px" }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 400, marginBottom: 24, color: colors.cream }}>
          Project <em style={{ color: colors.gold, fontStyle: "italic" }}>{galleryTitle}</em>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ aspectRatio: i <= 2 ? "16/9" : "4/5", borderRadius: 10, overflow: "hidden", background: `linear-gradient(135deg, ${project.color}33 0%, #0a0a0a 100%)`, gridColumn: i <= 2 ? "span 1" : "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fonts.body, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>{i <= 3 ? galleryItemLabels.video : galleryItemLabels.still} {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 48px 80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 400, margin: 0, color: colors.cream }}>
              More <em style={{ color: colors.gold, fontStyle: "italic" }}>{categories.find(c => c.id === project.category)?.label}</em>
            </h3>
            <button onClick={onBack} style={{ fontFamily: fonts.body, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.gold, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{viewAllText}</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {relatedProjects.map((p, i) => {
              const item = { id: p.id, title: p.title, desc: p.desc, type: p.type, color: p.color, photo: p.image };
              return <ProjectCard key={p.id} item={item} index={i} isVisible={true} onClick={() => { window.dispatchEvent(new CustomEvent('navigate-project', { detail: p.id })); }} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectPage;
