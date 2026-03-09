// ============================================================
// ALL USER-FACING STRINGS
// Edit siteContent.json to change any text on the site.
// This file re-exports everything so components don't need changes.
// ============================================================

import data from "./siteContent.json";

// -- Hero --
export const heroTagline = data.heroTagline;
export const heroHeadlinePre = data.heroHeadlinePre;
export const heroHeadlineAccent = data.heroHeadlineAccent;
export const heroHeadlinePost = data.heroHeadlinePost;
export const heroDescription = data.heroDescription;
export const heroButtonText = data.heroButtonText;
export const showreelUrl = data.showreelUrl || "";
export const scrollIndicatorText = data.scrollIndicatorText;

// -- Navigation --
// navSectionLabels is built dynamically: "Home" + category labels + "About" + "Contact"
// This way renaming a category automatically updates the nav.
import projectsData from "./projects.json";
export const navSectionLabels = [
  "Home",
  ...projectsData.categories.map((c) => c.label),
  "About",
  "Contact",
];
export const navLinks = data.navLinks;
export const navCtaText = data.navCtaText;

// -- Logo --
export const logoInitials = data.logoInitials;
export const logoName = data.logoName;
export const logoSubtitle = data.logoSubtitle;

// -- About --
export const aboutLabel = data.aboutLabel;
export const aboutHeadingPre = data.aboutHeadingPre;
export const aboutHeadingAccent = data.aboutHeadingAccent;
export const aboutDescription1 = data.aboutDescription1;
export const aboutDescription2 = data.aboutDescription2;
export const aboutStats = data.aboutStats;

// -- Contact --
export const contactLabel = data.contactLabel;
export const contactHeadingPre = data.contactHeadingPre;
export const contactHeadingAccent = data.contactHeadingAccent;
export const contactDescription = data.contactDescription;
export const contactCtaText = data.contactCtaText;
export const startProjectUrl = data.startProjectUrl || "";
export const contactEmail = data.contactEmail;

// -- Footer --
export const footerCopyright = data.footerCopyright;
export const footerSocials = data.footerSocials;

// -- Project detail page --
export const backButtonText = data.backButtonText;
export const playVideoText = data.playVideoText;
export const galleryTitle = data.galleryTitle;
export const viewAllText = data.viewAllText;
export const projectDetailLabels = data.projectDetailLabels;
export const mediaTypeBadges = data.mediaTypeBadges;
export const galleryItemLabels = data.galleryItemLabels;
