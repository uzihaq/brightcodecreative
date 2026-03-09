// Helper: prepend Vite base URL so images work on GitHub Pages
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

// Default focal point for image cropping
const DEFAULT_FOCUS = "center center";

import projectsData from "./projects.json";

export const categories = projectsData.categories.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));

export const allProjects = projectsData.allProjects.map((p) => ({
  ...p,
  image: img(p.image),
  imageFocus: p.imageFocus || DEFAULT_FOCUS,
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
