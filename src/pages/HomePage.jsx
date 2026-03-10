import { useState, useEffect, useRef } from "react";
import { colors, fonts, rgba, getTheme } from "../theme/theme";
import {
  heroTagline,
  heroHeadlinePre,
  heroHeadlineAccent,
  heroHeadlinePost,
  heroDescription,
  heroButtonText,
  showreelUrl,
  scrollIndicatorText,
  navSectionLabels,
  aboutLabel,
  aboutHeadingPre,
  aboutHeadingAccent,
  aboutDescription1,
  aboutDescription2,
  aboutStats,
  contactLabel,
  contactHeadingPre,
  contactHeadingAccent,
  contactDescription,
  contactCtaText,
  startProjectUrl,
  contactEmail,
} from "../data/siteContent";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import WorkPage from "./WorkPage";

const NavDot = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px 0",
      transition: "all 0.3s ease",
    }}
  >
    <div style={{
      width: active ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: active ? colors.gold : "rgba(255,255,255,0.2)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }} />
    <span style={{
      fontFamily: fonts.body,
      fontSize: 11,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: active ? colors.gold : "rgba(255,255,255,0.3)",
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : "translateX(-8px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  </button>
);

const HomePage = ({ lightMode, setLightMode, isMobile, setPage, setSelectedProjectId }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  const [heroLoaded, setHeroLoaded] = useState(false);
  const sectionsRef = useRef([]);

  const T = getTheme(lightMode);

  useEffect(() => {
    setHeroLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sectionOffsets = sectionsRef.current.map(el => el?.offsetTop || 0);
      const current = sectionOffsets.findIndex((offset, i) => {
        const next = sectionOffsets[i + 1] || Infinity;
        return window.scrollY + window.innerHeight / 2 >= offset && window.scrollY + window.innerHeight / 2 < next;
      });
      if (current >= 0) setActiveSection(current);

      const newVisible = new Set();
      sectionsRef.current.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) newVisible.add(i);
        }
      });
      setVisibleSections(newVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProjectClick = (id) => {
    setSelectedProjectId(id);
    setPage("project");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      color: T.text,
      position: "relative",
      overflowX: "hidden",
      transition: "background 0.4s ease, color 0.4s ease",
    }}>

      {/* Light/dark toggle */}
      <button
        onClick={() => setLightMode(l => !l)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: lightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
          border: `1px solid ${lightMode ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"}`,
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
        title={lightMode ? "Dark mode" : "Light mode"}
      >
        {lightMode ? "\uD83C\uDF19" : "\u2600\uFE0F"}
      </button>

      {/* Fixed navigation dots */}
      <div style={{
        position: "fixed",
        right: 32,
        top: "50%",
        transform: "translateY(-50%)",
        display: isMobile ? "none" : "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 100,
      }}>
        {navSectionLabels.map((label, i) => (
          <NavDot
            key={label}
            label={label}
            active={activeSection === i}
            onClick={() => scrollToSection(i)}
          />
        ))}
      </div>

      {/* Top nav bar */}
      <NavBar T={T} scrollY={scrollY} isMobile={isMobile} scrollToSection={scrollToSection} />

      {/* HERO SECTION */}
      <section
        ref={el => sectionsRef.current[0] = el}
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: isMobile ? "0 20px" : "0 48px",
        }}
      >
        {/* Hero background glow */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${rgba(colors.gold, 0.08)} 0%, transparent 60%)`,
          filter: "blur(40px)",
        }} />

        <div style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{
            fontFamily: fonts.body,
            fontSize: 12,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: colors.gold,
            marginBottom: 24,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}>
            {heroTagline}
          </div>

          <h1 style={{
            fontFamily: fonts.heading,
            fontSize: "clamp(40px, 7vw, 88px)",
            fontWeight: 400,
            lineHeight: 1.05,
            margin: 0,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}>
            {heroHeadlinePre}<em style={{ color: colors.gold, fontStyle: "italic" }}>{heroHeadlineAccent}</em>
            <br />{heroHeadlinePost}
          </h1>

          <p style={{
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 300,
            color: T.textMuted,
            maxWidth: 480,
            margin: "28px auto 0",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}>
            {heroDescription}
          </p>


        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: heroLoaded ? 0.4 : 0,
          transition: "opacity 1s ease 1.2s",
        }}>
          <span style={{
            fontFamily: fonts.body,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: T.textMuted,
          }}>{scrollIndicatorText}</span>
          <div style={{
            width: 1,
            height: 40,
            background: `linear-gradient(${rgba(colors.gold, 0.5)}, transparent)`,
          }} />
        </div>
      </section>

      {/* PORTFOLIO SECTIONS */}
      <WorkPage
        sectionsRef={sectionsRef}
        visibleSections={visibleSections}
        isMobile={isMobile}
        T={T}
        onProjectClick={handleProjectClick}
      />

      {/* ABOUT SECTION */}
      <section
        ref={el => sectionsRef.current[5] = el}
        style={{
          minHeight: "80vh",
          padding: isMobile ? "80px 20px" : "120px 48px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80,
          alignItems: "center",
          opacity: visibleSections.has(5) ? 1 : 0,
          transform: visibleSections.has(5) ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          width: "100%",
        }}>
          <div>
            <span style={{
              fontFamily: fonts.body,
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: colors.gold,
            }}>{aboutLabel}</span>
            <h2 style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: "16px 0 24px",
            }}>
              {aboutHeadingPre}
              <br />meets <em style={{ color: colors.gold, fontStyle: "italic" }}>{aboutHeadingAccent}</em>
            </h2>
            <p style={{
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 300,
              color: T.textMuted,
              lineHeight: 1.8,
              letterSpacing: "0.02em",
              maxWidth: 480,
            }}>
              {aboutDescription1}
            </p>
            <p style={{
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 300,
              color: T.textMuted,
              lineHeight: 1.8,
              letterSpacing: "0.02em",
              maxWidth: 480,
              marginTop: 16,
            }}>
              {aboutDescription2}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}>
            {aboutStats.map((stat) => (
              <div key={stat.label} style={{
                padding: 28,
                borderRadius: 12,
                background: T.card,
                border: `1px solid ${T.border}`,
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: fonts.heading,
                  fontSize: 36,
                  fontWeight: 500,
                  color: colors.gold,
                  marginBottom: 8,
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: T.textFaint,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        ref={el => sectionsRef.current[6] = el}
        style={{
          minHeight: "60vh",
          padding: isMobile ? "80px 20px" : "120px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${rgba(colors.gold, 0.06)} 0%, transparent 60%)`,
          filter: "blur(40px)",
        }} />

        <div style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          opacity: visibleSections.has(6) ? 1 : 0,
          transform: visibleSections.has(6) ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <span style={{
            fontFamily: fonts.body,
            fontSize: 12,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: colors.gold,
          }}>{contactLabel}</span>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: "16px 0 24px",
          }}>
            {contactHeadingPre}
            <br /><em style={{ color: colors.gold, fontStyle: "italic" }}>{contactHeadingAccent}</em>
          </h2>
          <p style={{
            fontFamily: fonts.body,
            fontSize: 15,
            fontWeight: 300,
            color: T.textMuted,
            maxWidth: 420,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            {contactDescription}
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href={startProjectUrl || `mailto:${contactEmail}`} style={{
              fontFamily: fonts.body,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.darkCard,
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
              border: "none",
              padding: "16px 40px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
            }}>
              {contactCtaText}
            </a>
            <a href={`mailto:${contactEmail}`} style={{
              fontFamily: fonts.body,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.gold,
              background: "transparent",
              border: `1px solid ${rgba(colors.gold, 0.3)}`,
              padding: "16px 40px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
            }}>
              {contactEmail}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer T={T} isMobile={isMobile} />
    </div>
  );
};

export default HomePage;
