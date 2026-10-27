import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { chromium } from "playwright";
import { serve } from "./serve.ts";

const ROOT = join(import.meta.dir, "..");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "static", "og");
const MANIFEST = join(ROOT, "tools", "og-hashes.json");
const WIDTH = 1200;
const HEIGHT = 630;
const REDIRECT = /<meta http-equiv="?refresh"?/i;

interface Page {
  path: string;
  slug: string;
  hash: string;
}

function slug(path: string): string {
  return path.replace(/^\/|\/$/g, "").replaceAll("/", "_") || "home";
}

function pages(folder: string): Page[] {
  return readdirSync(folder).flatMap((entry) => {
    const file = join(folder, entry);
    if (statSync(file).isDirectory()) {
      return pages(file);
    }
    const html = entry === "index.html" ? readFileSync(file, "utf8") : "";
    if (html === "" || REDIRECT.test(html)) {
      return [];
    }
    const path = `/${relative(PUBLIC, folder)}/`.replace(/\/+/g, "/");
    return [{ path, slug: slug(path), hash: createHash("sha256").update(html).digest("hex") }];
  });
}

const force = process.env["FORCE"] === "1";
const previous = existsSync(MANIFEST) ? (JSON.parse(readFileSync(MANIFEST, "utf8")) as Record<string, string>) : {};
const all = pages(PUBLIC).sort((a, b) => a.slug.localeCompare(b.slug));
const changed = all.filter((page) => force || previous[page.slug] !== page.hash || !existsSync(join(OUT, `${page.slug}.png`)));
mkdirSync(OUT, { recursive: true });
const keep = new Set(all.map((page) => `${page.slug}.png`));
for (const file of readdirSync(OUT).filter((entry) => !keep.has(entry))) {
  rmSync(join(OUT, file));
  console.log(`removed ${file}`);
}
if (changed.length > 0) {
  const server = serve(0);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
    for (const { path, slug: name } of changed) {
      await page.goto(new URL(path, server.url).href, { waitUntil: "networkidle" });
      await page.screenshot({ path: join(OUT, `${name}.png`) });
      console.log(`static/og/${name}.png`);
    }
  } finally {
    await browser.close();
    void server.stop();
  }
}
writeFileSync(MANIFEST, `${JSON.stringify(Object.fromEntries(all.map((page) => [page.slug, page.hash])), null, 2)}\n`);
console.log(`${String(changed.length)} of ${String(all.length)} thumbnails updated`);
