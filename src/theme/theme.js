// Brand colors — change these to rebrand the entire site
export const colors = {
  gold: "#C4943D",
  goldLight: "#E8C876",
  dark: "#000000",
  darkCard: "#080808",
  cream: "#F5F0E8",
};

// Font families
export const fonts = {
  heading: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
};

// Google Fonts import URL
export const fontImportUrl =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap";

// Utility: create rgba from hex + alpha (so brand colors auto-propagate to all tints)
export const rgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

// Light / dark theme tokens
export const getTheme = (lightMode) =>
  lightMode
    ? {
        bg: "#faf9f6",
        bgNav: "rgba(250,249,246,0.92)",
        text: "#1a1007",
        textMuted: "rgba(26,16,7,0.5)",
        textFaint: "rgba(26,16,7,0.3)",
        border: "rgba(0,0,0,0.06)",
        card: "rgba(0,0,0,0.03)",
      }
    : {
        bg: colors.dark,
        bgNav: "rgba(0,0,0,0.85)",
        text: "#fff",
        textMuted: "rgba(255,255,255,0.5)",
        textFaint: "rgba(255,255,255,0.25)",
        border: "rgba(255,255,255,0.05)",
        card: "rgba(255,255,255,0.02)",
      };
