import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5180;

// NOTE: The editor frontend loads a live preview iframe from http://localhost:5177
// (the Vite dev server). Make sure the Vite dev server is running alongside this
// editor server: npm run dev -- --port 5177
// When content is saved via the editor, the JSON files update on disk and Vite
// hot-reloads the preview automatically.
const PASSWORD = "gigiolive";
const SESSION_SECRET = crypto.randomBytes(32).toString("hex");

// Paths to JSON data files
const CONTENT_PATH = path.join(__dirname, "..", "src", "data", "siteContent.json");
const PROJECTS_PATH = path.join(__dirname, "..", "src", "data", "projects.json");
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");

// Simple session store (in-memory)
const sessions = new Map();

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, IMAGES_DIR),
  filename: (req, _file, cb) => {
    const projectId = req.body.projectId;
    if (!projectId) return cb(new Error("projectId is required"));
    cb(null, `${projectId}.jpg`);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth middleware
function requireAuth(req, res, next) {
  const sid = req.cookies.sid;
  if (sid && sessions.has(sid)) return next();
  if (req.path.startsWith("/api/")) return res.status(401).json({ error: "Not authenticated" });
  return res.redirect("/login.html");
}

// Login endpoint
app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    const sid = crypto.randomBytes(24).toString("hex");
    sessions.set(sid, { created: Date.now() });
    res.cookie("sid", sid, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.redirect("/");
  }
  return res.redirect("/login.html?error=1");
});

// Serve login page without auth
app.get("/login.html", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Protect everything else
app.use(requireAuth);

// Serve static editor frontend
app.use(express.static(path.join(__dirname, "public")));

// Serve project images from main site's public/images
app.use("/images", express.static(IMAGES_DIR));

// API: Site content
app.get("/api/content", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf-8"));
  res.json(data);
});

app.post("/api/content", (req, res) => {
  try {
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(req.body, null, 2) + "\n");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Projects
app.get("/api/projects", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf-8"));
  res.json(data);
});

app.post("/api/projects", (req, res) => {
  try {
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(req.body, null, 2) + "\n");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Upload image
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ ok: true, filename: req.file.filename });
});

// API: List images
app.get("/api/images", (_req, res) => {
  try {
    const files = fs.readdirSync(IMAGES_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Deploy to production (git commit + push → Netlify auto-deploys)
app.post("/api/deploy", (_req, res) => {
  import("child_process").then(({ execSync }) => {
    try {
      const projectRoot = path.join(__dirname, "..");
      const status = execSync("git status --porcelain", { cwd: projectRoot, encoding: "utf-8" }).trim();
      if (!status) return res.json({ ok: true, message: "Nothing to deploy — no changes found." });
      execSync("git add -A", { cwd: projectRoot });
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "short", timeStyle: "short" });
      execSync(`git commit -m "Content update — ${timestamp}"`, { cwd: projectRoot });
      execSync("git push origin main", { cwd: projectRoot, timeout: 30000 });
      res.json({ ok: true, message: "Published! Site will be live in ~30 seconds." });
    } catch (err) {
      res.status(500).json({ error: err.stderr?.toString() || err.message });
    }
  });
});

app.listen(PORT, () => {
  console.log(`BrightCode Editor running at http://localhost:${PORT}`);
});
