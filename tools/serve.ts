import { existsSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import netlify from "../netlify.toml";

interface HeaderRule {
  for: string;
  values: Record<string, string>;
}

const ROOT = join(import.meta.dir, "..", "public");
const rules = (netlify as { headers?: HeaderRule[] }).headers ?? [];

const COMPRESSIBLE = /^(text\/|application\/(json|xml|rss\+xml|javascript))/;
const LOCAL_ONLY = /;?\s*upgrade-insecure-requests/;

function headersFor(path: string): Record<string, string> {
  const headers = Object.assign(
    {},
    ...rules.filter((rule) => rule.for === "/*" || rule.for === path).map((rule) => rule.values),
  ) as Record<string, string>;
  const policy = headers["Content-Security-Policy"];
  return policy === undefined ? headers : { ...headers, "Content-Security-Policy": policy.replace(LOCAL_ONLY, "") };
}

function resolve(pathname: string): string | undefined {
  const target = normalize(join(ROOT, decodeURIComponent(pathname)));
  if (!target.startsWith(ROOT)) {
    return undefined;
  }
  if (existsSync(target) && statSync(target).isDirectory()) {
    const index = join(target, "index.html");
    return existsSync(index) ? index : undefined;
  }
  return existsSync(target) ? target : undefined;
}

export function serve(port: number): ReturnType<typeof Bun.serve> {
  return Bun.serve({
    port,
    async fetch(request) {
      const { pathname } = new URL(request.url);
      const file = resolve(pathname);
      const headers = headersFor(pathname);
      if (file === undefined) {
        return new Response(Bun.file(join(ROOT, "404.html")), {
          status: 404,
          headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
        });
      }
      const body = Bun.file(file);
      const accepts = request.headers.get("accept-encoding") ?? "";
      if (accepts.includes("gzip") && COMPRESSIBLE.test(body.type)) {
        const compressed = Bun.gzipSync(await body.bytes());
        return new Response(compressed, {
          headers: { ...headers, "Content-Type": body.type, "Content-Encoding": "gzip", Vary: "Accept-Encoding" },
        });
      }
      return new Response(body, { headers });
    },
  });
}

if (import.meta.main) {
  const server = serve(Number(process.env["PORT"] ?? "4321"));
  console.log(`serving public/ on ${server.url.href}`);
}
