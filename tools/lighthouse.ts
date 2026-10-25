import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { serve } from "./serve.ts";

interface Report {
  categories: Record<string, { score: number | null }>;
}

const MINIMUM = 1;
const ATTEMPTS = 2;
const [port, ...pages] = process.argv.slice(2);
const server = serve(Number(port));
const work = mkdtempSync(join(tmpdir(), "lighthouse-"));
const failures: string[] = [];
try {
  for (const page of pages) {
    const output = join(work, "report.json");
    const command = [
      "bunx",
      "lighthouse@12",
      new URL(page, server.url).href,
      "--quiet",
      "--chrome-flags=--headless=new",
      "--output=json",
      `--output-path=${output}`,
    ];
    let exitCode = 1;
    for (let attempt = 0; attempt < ATTEMPTS && exitCode !== 0; attempt += 1) {
      exitCode = await Bun.spawn(command, { stdout: "ignore", stderr: "ignore" }).exited;
    }
    if (exitCode !== 0) {
      failures.push(`${page}: lighthouse exited with ${String(exitCode)}`);
      continue;
    }
    const report = JSON.parse(readFileSync(output, "utf8")) as Report;
    const scores = Object.entries(report.categories).map(
      ([name, category]) => `${name} ${String(Math.round((category.score ?? 0) * 100))}`,
    );
    console.log(`${page}: ${scores.join(", ")}`);
    for (const [name, category] of Object.entries(report.categories)) {
      if ((category.score ?? 0) < MINIMUM) {
        failures.push(`${page}: ${name} ${String(category.score)}`);
      }
    }
  }
} finally {
  void server.stop();
  rmSync(work, { recursive: true, force: true });
}
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
