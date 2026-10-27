import { mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { chromium } from "playwright";
import { serve } from "./serve.ts";

const ROOT = join(import.meta.dir, "..");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "static", "og");
const WIDTH = 1200;
const HEIGHT = 630;
const REDIRECT = /<meta http-equiv="?refresh"?/i;

function pages(folder: string): string[] {
  return readdirSync(folder).flatMap((entry) => {
    const path = join(folder, entry);
    if (statSync(path).isDirectory()) {
      return pages(path);
    }
    if (entry !== "index.html" || REDIRECT.test(readFileSync(path, "utf8"))) {
      return [];
    }
    return [`/${relative(PUBLIC, folder)}/`.replace(/\/+/g, "/")];
  });
}

export function slug(path: string): string {
  return path.replace(/^\/|\/$/g, "").replaceAll("/", "_") || "home";
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const server = serve(0);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  for (const path of pages(PUBLIC).sort()) {
    await page.goto(new URL(path, server.url).href, { waitUntil: "networkidle" });
    const file = join(OUT, `${slug(path)}.png`);
    await page.screenshot({ path: file });
    console.log(relative(ROOT, file));
  }
} finally {
  await browser.close();
  void server.stop();
}
