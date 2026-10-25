import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { serve } from "./serve.ts";
import { PAGES, WIDTHS } from "../tests/pages.ts";

const OUT = join(import.meta.dir, "..", "test-results", "screens");
mkdirSync(OUT, { recursive: true });
const server = serve(0);
const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    for (const path of PAGES) {
      await page.goto(new URL(path, server.url).href, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo(0, y);
          await new Promise((done) => setTimeout(done, 50));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      const name = `${path.replaceAll("/", "_").replace(/^_|_$/g, "") || "home"}_${String(width)}.png`;
      await page.screenshot({ path: join(OUT, name), fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
  void server.stop();
}
console.log(OUT);
