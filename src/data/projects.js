// Helper: prepend Vite base URL so images work on GitHub Pages
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

export const categories = [
  { id: "brand-films", label: "Brand Films" },
  { id: "ai-personas", label: "AI Personas" },
  { id: "fashion", label: "Fashion & Editorial" },
  { id: "social", label: "Social & Reels" },
];

export const allProjects = [
  { id: "nascar-san-diego", category: "brand-films", title: "NASCAR San Diego", desc: "Cleared for Takeoff \u2014 Teaser Campaign", longDesc: "A cinematic AI-generated teaser campaign for NASCAR\u2019s historic first race on an active military base. Naval Base Coronado comes alive with fighter jets, aircraft carriers, and stock cars in this patriotic spectacle celebrating the 250th anniversary of the U.S. Navy.", type: "video", color: "#C4943D", image: img("nascar-san-diego"), year: "2026", client: "NASCAR San Diego Weekend", role: "Creative Direction, AI Video Production, Prompt Engineering", tools: "Higgsfield AI, Seedream 4.5, FLUX.2 Pro, Cinema Studio 2.0", deliverables: "4 teaser videos, 12 promotional stills, social media content package" },
  { id: "anduril-250", category: "brand-films", title: "Anduril 250", desc: "Race Day Promo Series", longDesc: "High-energy promotional content for the Anduril 250 Cup Series race, blending defense technology aesthetics with motorsport intensity.", type: "video", color: "#8B7355", image: img("anduril-250"), year: "2026", client: "Anduril Industries", role: "AI Video Production", tools: "Higgsfield AI, Kling 3.0", deliverables: "3 promo videos" },
  { id: "navy-heritage", category: "brand-films", title: "Navy 250th Anniversary", desc: "Heritage & Honor", longDesc: "A tribute to 250 years of the United States Navy, combining archival imagery with AI-generated cinematic sequences.", type: "video", color: "#4A6741", image: img("navy-heritage"), year: "2026", client: "U.S. Navy", role: "Creative Direction, AI Production", tools: "Higgsfield AI, Seedream 4.5", deliverables: "2 tribute films" },
  { id: "sports-sd", category: "brand-films", title: "Sports San Diego", desc: "City of Champions Campaign", longDesc: "A vibrant campaign showcasing San Diego as the ultimate sports destination.", type: "video", color: "#5B7B9A", image: img("sports-sd"), year: "2026", client: "Sports San Diego", role: "AI Video Production", tools: "Higgsfield AI", deliverables: "5 campaign videos" },
  { id: "valentina", category: "ai-personas", title: "Valentina", desc: "Luxury lifestyle influencer", longDesc: "A fully AI-generated digital persona for luxury lifestyle content creation, complete with consistent character identity across hundreds of posts.", type: "image", color: "#9B6B8E", image: img("valentina"), year: "2025", client: "Personal Project", role: "Character Design, AI Generation", tools: "Higgsfield Soul, FLUX.2 Pro", deliverables: "60+ images, 12 videos" },
  { id: "marcus", category: "ai-personas", title: "Marcus", desc: "Fitness & wellness creator", longDesc: "A digital fitness influencer with athletic build and motivational presence, designed for wellness brand partnerships.", type: "image", color: "#6B8E9B", image: img("marcus"), year: "2025", client: "Personal Project", role: "Character Design", tools: "Higgsfield Soul", deliverables: "40+ images, 8 videos" },
  { id: "aria", category: "ai-personas", title: "Aria", desc: "Travel & culture storyteller", longDesc: "A globe-trotting AI persona capturing world cultures through a cinematic lens.", type: "image", color: "#8E9B6B", image: img("aria"), year: "2025", client: "Personal Project", role: "Character Design, AI Generation", tools: "Higgsfield Soul, Seedream 4.5", deliverables: "80+ images" },
  { id: "the-collective", category: "ai-personas", title: "The Collective", desc: "Multi-character brand campaign", longDesc: "A roster of AI-generated characters for a unified brand storytelling campaign.", type: "video", color: "#9B8E6B", image: img("the-collective"), year: "2026", client: "Brand Campaign", role: "Creative Direction", tools: "Higgsfield AI", deliverables: "Campaign package" },
  { id: "noir-collection", category: "fashion", title: "Noir Collection", desc: "AI haute couture editorial", longDesc: "A dark, moody editorial series featuring AI-generated haute couture fashion in dramatic studio lighting.", type: "image", color: "#3D3D3D", image: img("noir-collection"), year: "2025", client: "Editorial", role: "Art Direction, AI Generation", tools: "FLUX.2 Pro, Seedream 4.5", deliverables: "20 editorial images" },
  { id: "chromatic", category: "fashion", title: "Chromatic", desc: "Color study in motion", longDesc: "An exploration of color theory through AI-generated fashion video, with flowing fabrics and vivid palettes.", type: "video", color: "#C44A4A", image: img("chromatic"), year: "2025", client: "Editorial", role: "Creative Direction", tools: "Higgsfield AI", deliverables: "4 fashion films" },
  { id: "glass-gold", category: "fashion", title: "Glass & Gold", desc: "Luxury accessories campaign", longDesc: "Premium product visuals for luxury accessories, blending glass textures with gold accents.", type: "image", color: "#C4943D", image: img("glass-gold"), year: "2026", client: "Brand Campaign", role: "Product Photography, AI Generation", tools: "Seedream 4.5", deliverables: "15 product images" },
  { id: "ethereal", category: "fashion", title: "Ethereal", desc: "Fantasy fashion film", longDesc: "A dreamlike fashion film blending surrealist environments with couture garments.", type: "video", color: "#7B6B9B", image: img("ethereal"), year: "2025", client: "Editorial", role: "AI Video Production", tools: "Higgsfield AI", deliverables: "1 fashion film" },
  { id: "viral-series", category: "social", title: "Viral Series", desc: "Trending format adaptations", longDesc: "Quick-turnaround AI content built for trending social media formats and viral moments.", type: "video", color: "#4A8EC4", image: img("viral-series"), year: "2026", client: "Various", role: "Content Creation", tools: "Higgsfield AI", deliverables: "20+ reels" },
  { id: "product-drops", category: "social", title: "Product Drops", desc: "Launch day content packages", longDesc: "High-impact visual content packages timed to product launches and announcements.", type: "video", color: "#C47A4A", image: img("product-drops"), year: "2026", client: "Various", role: "AI Video Production", tools: "Higgsfield AI", deliverables: "Content packages" },
  { id: "brand-moments", category: "social", title: "Brand Moments", desc: "Event & culture content", longDesc: "Capturing cultural moments and events through AI-generated visual storytelling.", type: "image", color: "#4AC49B", image: img("brand-moments"), year: "2025", client: "Various", role: "Content Creation", tools: "Higgsfield AI, FLUX.2 Pro", deliverables: "50+ posts" },
  { id: "story-arcs", category: "social", title: "Story Arcs", desc: "Serialized social narratives", longDesc: "Multi-part storytelling campaigns designed for serialized social media release.", type: "video", color: "#C44A7A", image: img("story-arcs"), year: "2026", client: "Various", role: "Creative Direction", tools: "Higgsfield AI", deliverables: "3 series" },
];

export const categoryMeta = [
  {
    id: "brand-films",
    title: "Brand Films",
    subtitle: "Cinematic AI video for the world\u2019s boldest brands",
    items: [
      { id: "nascar-san-diego", title: "NASCAR San Diego", desc: "Cleared for Takeoff \u2014 Teaser Campaign", type: "video", color: "#C4943D", photo: img("nascar-san-diego") },
      { id: "anduril-250", title: "Anduril 250", desc: "Race Day Promo Series", type: "video", color: "#8B7355", photo: img("anduril-250") },
      { id: "navy-heritage", title: "Navy 250th Anniversary", desc: "Heritage & Honor", type: "video", color: "#4A6741", photo: img("navy-heritage") },
      { id: "sports-sd", title: "Sports San Diego", desc: "City of Champions Campaign", type: "video", color: "#5B7B9A", photo: img("sports-sd") },
    ],
  },
  {
    id: "ai-personas",
    title: "AI Personas",
    subtitle: "Digital characters with soul, story, and style",
    items: [
      { id: "valentina", title: "Valentina", desc: "Luxury lifestyle influencer", type: "image", color: "#9B6B8E", photo: img("valentina") },
      { id: "marcus", title: "Marcus", desc: "Fitness & wellness creator", type: "image", color: "#6B8E9B", photo: img("marcus") },
      { id: "aria", title: "Aria", desc: "Travel & culture storyteller", type: "image", color: "#8E9B6B", photo: img("aria") },
      { id: "the-collective", title: "The Collective", desc: "Multi-character brand campaign", type: "video", color: "#9B8E6B", photo: img("the-collective") },
    ],
  },
  {
    id: "fashion-editorial",
    title: "Fashion & Editorial",
    subtitle: "High fashion meets artificial intelligence",
    items: [
      { id: "noir-collection", title: "Noir Collection", desc: "AI haute couture editorial", type: "image", color: "#3D3D3D", photo: img("noir-collection") },
      { id: "chromatic", title: "Chromatic", desc: "Color study in motion", type: "video", color: "#C44A4A", photo: img("chromatic") },
      { id: "glass-gold", title: "Glass & Gold", desc: "Luxury accessories campaign", type: "image", color: "#C4943D", photo: img("glass-gold") },
      { id: "ethereal", title: "Ethereal", desc: "Fantasy fashion film", type: "video", color: "#7B6B9B", photo: img("ethereal") },
    ],
  },
  {
    id: "social-content",
    title: "Social & Reels",
    subtitle: "Scroll-stopping content engineered to perform",
    items: [
      { id: "viral-series", title: "Viral Series", desc: "Trending format adaptations", type: "video", color: "#4A8EC4", photo: img("viral-series") },
      { id: "product-drops", title: "Product Drops", desc: "Launch day content packages", type: "video", color: "#C47A4A", photo: img("product-drops") },
      { id: "brand-moments", title: "Brand Moments", desc: "Event & culture content", type: "image", color: "#4AC49B", photo: img("brand-moments") },
      { id: "story-arcs", title: "Story Arcs", desc: "Serialized social narratives", type: "video", color: "#C44A7A", photo: img("story-arcs") },
    ],
  },
];
