import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { PAGES } from "./pages.ts";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const MISSING = "/missing-page/";

interface Problems {
  console: string[];
  csp: string[];
}

async function open(page: Page, path: string): Promise<Problems> {
  const problems: Problems = { console: [], csp: [] };
  page.on("console", (message) => {
    if (message.type() === "error" && !(path === MISSING && message.text().includes("404"))) {
      problems.console.push(message.text());
    }
  });
  await page.exposeFunction("reportViolation", (directive: string) => {
    problems.csp.push(directive);
  });
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      void (window as unknown as { reportViolation: (directive: string) => Promise<void> }).reportViolation(
        `${event.violatedDirective} ${event.blockedURI}`,
      );
    });
  });
  const response = await page.goto(path, { waitUntil: "networkidle" });
  expect(response?.status()).toBe(path === MISSING ? 404 : 200);
  expect(response?.headers()["content-security-policy"]).toContain("default-src 'none'");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((done) => setTimeout(done, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  return problems;
}

for (const path of PAGES) {
  test.describe(path, () => {
    test("has no horizontal overflow", async ({ page }) => {
      await open(page, path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const clipped = await page.$$eval("p, h1, h2, h3, li, dt, dd", (elements) =>
        elements
          .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
          .map((element) => element.textContent.trim().slice(0, 40)),
      );
      expect(clipped).toEqual([]);
    });

    test("passes axe WCAG 2.2 AA", async ({ page }) => {
      await open(page, path);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      expect(
        results.violations.map(
          (violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
        ),
      ).toEqual([]);
    });

    test("has no console errors or CSP violations", async ({ page }) => {
      const problems = await open(page, path);
      expect(problems).toEqual({ console: [], csp: [] });
    });

    test("loads every image with alt text and dimensions", async ({ page }) => {
      await open(page, path);
      const broken = await page.$$eval("img", (images) =>
        images
          .filter(
            (image) =>
              !image.hasAttribute("alt") ||
              !image.hasAttribute("width") ||
              !image.hasAttribute("height") ||
              (image.checkVisibility() && image.naturalWidth === 0),
          )
          .map((image) => image.currentSrc || image.src),
      );
      expect(broken).toEqual([]);
    });

    test("matches the approved screenshot", async ({ page }) => {
      await open(page, path);
      const name = `${path.replaceAll("/", "-").replace(/^-|-$/g, "") || "home"}.png`;
      await expect(page).toHaveScreenshot(name);
    });
  });
}

test.describe("appearance toggle", () => {
  test("starts dark with both appearances already loaded", async ({ page }) => {
    await open(page, "/apps/bukku/");
    await expect(page.getByRole("radio", { name: "Dark" })).toBeChecked();
    await expect(page.locator(".hero-media img.shot-dark")).toBeVisible();
    await expect(page.locator(".hero-media img.shot-light")).toHaveJSProperty("complete", true);
    const unloaded = await page.$$eval(
      "img.shot-light",
      (images) => images.filter((image) => (image as HTMLImageElement).naturalWidth === 0).length,
    );
    expect(unloaded).toBe(0);
  });

  test("keeps the scroll position when switching", async ({ page }) => {
    await open(page, "/apps/bukku/");
    await page.evaluate(() => {
      window.scrollTo(0, 1500);
    });
    for (const id of ["#appearance-light", "#appearance-dark"]) {
      const box = await page.locator(id).boundingBox();
      expect(box).not.toBeNull();
      if (box !== null) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    }
    await expect(page.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(await page.evaluate(() => window.scrollY)).toBe(1500);
  });

  test("switches every screenshot to light", async ({ page }) => {
    await open(page, "/apps/bukku/");
    await page.getByRole("radio", { name: "Light" }).click();
    await expect(page.getByRole("radio", { name: "Light" })).toBeChecked();
    await expect(page.locator(".hero-media img.shot-light")).toBeVisible();
    await expect(page.locator(".hero-media img.shot-dark")).toBeHidden();
    await expect(page.locator(".hero-media img.shot-light")).toHaveJSProperty("complete", true);
    const visibleDark = await page.$$eval(
      "img.shot-dark",
      (images) => images.filter((image) => image.checkVisibility({ visibilityProperty: true })).length,
    );
    expect(visibleDark).toBe(0);
  });
});
