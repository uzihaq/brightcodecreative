# BrightCode Creative — Portfolio Site

Jen Gargiulo's AI creative portfolio. Single-page React app with dark/light mode, horizontal section scrolling, and Instagram photo integration.

**Live URL:** https://mac-mini-1.tail61417e.ts.net:8443/ (Tailscale Funnel — publicly accessible, no Tailscale needed)  
**Local dev:** http://localhost:5177  
**Tailscale (LAN):** http://100.86.76.84:5177

---

## Stack

- React + Vite (no TypeScript)
- Inline styles only (no CSS files, no Tailwind)
- Google Fonts: Playfair Display + DM Sans
- Framer Motion not used — CSS transitions only

## Running It

```bash
cd ~/brightcodecreative-v2
pnpm dev
```

The dev server runs in tmux session `bcc2`:

```bash
SOCKET="${TMPDIR:-/tmp}/openclaw-tmux-sockets/openclaw.sock"
tmux -S "$SOCKET" attach -t bcc2
```

Vite config is set to `host: '0.0.0.0'` and `allowedHosts: ['mac-mini-1.tail61417e.ts.net', 'localhost']`.  
Tailscale Funnel proxies port 8443 → localhost:5177.

## File Structure

```
src/
  App.jsx        ← entire app, single file
public/
  jen/
    jen-1.jpg    ← Jen's Instagram photos (9 total)
    jen-2.jpg
    ...
    jen-9.jpg
index.html
vite.config.js
```

Everything lives in `src/App.jsx`. No component files, no separate CSS.

## Architecture

### Theme System
`lightMode` boolean state drives a `T` theme object:
```js
const T = lightMode
  ? { bg, bgNav, text, textMuted, textFaint, border, card }  // cream/dark text
  : { bg, bgNav, text, textMuted, textFaint, border, card }  // near-black/white text
```

**Important:** `T` is defined inside `BrightCodePortfolio()`. Subcomponents (`GlowOrb`, `NavDot`, `PortfolioCard`) are defined OUTSIDE the main component and cannot access `T`. Card overlays on photos always use hardcoded dark `rgba(0,0,0,...)` values.

### Mobile Responsive
`isMobile` boolean state (window.innerWidth < 768) with resize listener. Used inline everywhere — no media queries. Key mobile changes:
- Nav: simplified to logo + theme toggle only
- Sections: 20px side padding (vs 48px desktop)
- Portfolio grid: 1 column (vs 3)
- About section: stacked (vs 2-column)
- Side nav dots: hidden

### Portfolio Data
Defined in a `portfolioData` object at the top of the component. Categories:
1. Brand Films (jen-1, jen-2, jen-3)
2. AI Personas (jen-4, jen-5, jen-6)
3. Fashion & Editorial (jen-7, jen-8, jen-9)
4. Social & Reels (reuses jen-1..3 — placeholder)

Images are in `public/jen/` and referenced as `/jen/jen-N.jpg`.

### Sections (scroll-based)
7 sections tracked via `sectionsRef` array + IntersectionObserver-style scroll listener:
0. Hero
1–4. Portfolio categories
5. About
6. Contact

### Navigation
- Top nav bar (fixed): logo + links + "Start a Project" CTA (desktop only)
- Side nav dots (fixed right, desktop only): one dot per section
- `scrollToSection(index)` scrolls to `sectionsRef.current[index]`

## Updating Content

### Change text/copy
Edit the strings directly in `src/App.jsx`. Search for the text you want to change.

### Change portfolio photos
Replace files in `public/jen/`. Names must stay `jen-1.jpg` through `jen-9.jpg`, or update the references in `portfolioData`.

### Add/remove portfolio categories
Edit the `portfolioData.categories` array. Each category needs: `id`, `title`, `subtitle`, `description`, and `items` (array of `{ title, subtitle, image, tags }`).

### Change nav labels
Edit the `navLabels` array and the nav links array in the `<nav>` JSX.

### Contact email
Search for `hello@brightcodecreative.com` — appears in the Contact section and footer nav.

## Client

**Jennifer Gargiulo** — Founder, Adapted Co  
hello@brightcodecreative.com  
jen@adaptedco.com | 415-610-4339  
Instagram: @strawberriesandpalmtrees  
Palo Alto, CA

Her original design file: `~/Downloads/BrightCodeCreative_Portfolio.jsx` (sent via email `19ccaf7d2b105467`)  
Her Instagram photos were downloaded from her account and stored in `public/jen/`.

## Hosting

Hosted on Uzair's Mac Mini M4 via **Tailscale Funnel**.

```bash
# Check funnel status
tailscale funnel status

# The funnel is configured at port 8443 → localhost:5177
# It's persistent (survives reboots via Tailscale daemon)
```

If the dev server dies, restart it:
```bash
SOCKET="${TMPDIR:-/tmp}/openclaw-tmux-sockets/openclaw.sock"
tmux -S "$SOCKET" new -d -s bcc2 "cd ~/brightcodecreative-v2 && pnpm dev"
```

## Future: Jen Making Her Own Updates

Options being considered:
1. **OpenClaw instance for Jen** — Uzair to spin up a separate OpenClaw for her with access to this repo
2. **Simple CMS layer** — JSON file for portfolio data + photo upload endpoint
3. **Direct repo access** — GitHub + Vercel deploy (would need domain + move off Mac mini)
