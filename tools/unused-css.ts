import { Glob } from "bun";
import { PurgeCSS } from "purgecss";

const GENERATED = "assets/css/15-code.css";
const stylesheets = [...new Glob("assets/css/*.css").scanSync()].filter((file) => file !== GENERATED).sort();
const results = await new PurgeCSS().purge({
  content: ["public/**/*.html"],
  css: stylesheets,
  rejected: true,
  variables: true,
});
const unused = results.flatMap((result) =>
  (result.rejected ?? []).map((selector) => `${result.file ?? "?"}: ${selector}`),
);
console.log(`checked ${String(stylesheets.length)} stylesheets against public/**/*.html`);
if (unused.length > 0) {
  console.error(unused.join("\n"));
  process.exit(1);
}
