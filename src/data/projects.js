// Helper: prepend Vite base URL so images work on GitHub Pages
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

// Default focal point for image cropping
const DEFAULT_FOCUS = "center center";

// Extract numeric Vimeo ID from any format:
// "123456789" | "https://vimeo.com/123456789" | "https://player.vimeo.com/video/123456789"
const parseVimeoId = (input) => {
  if (!input) return "";
  const match = String(input).match(/(\d{6,})/);
  return match ? match[1] : "";
};

import projectsData from "./projects.json";

export const categories = projectsData.categories.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));

// Filter out hidden projects (visible: false) so they don't render on the site
export const allProjects = projectsData.allProjects
  .filter((p) => p.visible !== false)
  .map((p) => ({
    ...p,
    image: img(p.image),
    imageFocus: p.imageFocus || DEFAULT_FOCUS,
    vimeoId: parseVimeoId(p.vimeoId),
  }));

// Generate categoryMeta from allProjects + category subtitles
export const categoryMeta = projectsData.categories.map((cat) => ({
  id: cat.metaId,
  title: cat.label,
  subtitle: cat.subtitle,
  items: allProjects
    .filter((p) => p.category === cat.id)
    .map((p) => ({
      id: p.id,
      title: p.title,
      desc: p.desc,
      type: p.type,
      color: p.color,
      photo: p.image,
      imageFocus: p.imageFocus,
    })),
}));
