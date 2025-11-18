import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the /images folder
app.use("/images", express.static(path.join(__dirname, "..", "images")));

// API: return categories + file list
app.get("/api/gallery", (req, res) => {
  const imagesDir = path.join(__dirname, "..", "images");

  const categories = fs.readdirSync(imagesDir).map(cat => {
    const folder = path.join(imagesDir, cat);

    const files = fs.readdirSync(folder)
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .map(f => `/images/${cat}/${f}`);

    return { name: cat, images: files };
  });

  res.json(categories);
});

// Serve Vite build
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => console.log("Server running at " + PORT));
