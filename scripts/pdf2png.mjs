import { createCanvas } from 'canvas';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = 'C:/Users/thiag/Downloads/Logotipo mentec 2025.pdf';
const outPath = path.join(__dirname, '../public/logo-mentec.png');

const data = new Uint8Array(fs.readFileSync(pdfPath));
const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true });
const pdf = await loadingTask.promise;
const page = await pdf.getPage(1);
const viewport = page.getViewport({ scale: 3 });

const canvas = createCanvas(viewport.width, viewport.height);
const ctx = canvas.getContext('2d');

await page.render({ canvasContext: ctx, viewport }).promise;

fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`Salvo: ${viewport.width}x${viewport.height}px → ${outPath}`);
