import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/favicon.png");
const outputPath = path.join(__dirname, "../public/favicon-output.png");

// Read into buffer first so we can overwrite input
const inputBuffer = await sharp(inputPath).toBuffer();
const { width, height } = await sharp(inputBuffer).metadata();

// 1. Trim black edges (removes black bar at top)
const trimmed = await sharp(inputBuffer)
  .trim({ threshold: 10 })
  .toBuffer();
const trimmedMeta = await sharp(trimmed).metadata();

// 2. Scale up 2x (way larger)
const scale = 2;
const scaledW = Math.round(trimmedMeta.width * scale);
const scaledH = Math.round(trimmedMeta.height * scale);
const scaled = await sharp(trimmed)
  .resize(scaledW, scaledH, { kernel: 'lanczos3' })
  .toBuffer();

// 3. Add minimal padding and resize to favicon size
await sharp(scaled)
  .resize(width, height, { kernel: 'lanczos3', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

// Overwrite original
fs.copyFileSync(outputPath, inputPath);
fs.unlinkSync(outputPath);

console.log("Icon processed: moved down, scaled larger");
