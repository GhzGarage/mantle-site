import { readFileSync } from "node:fs";
import { join } from "node:path";

type StaticDocument = { body: string; styles: string };

/** Preserves design-approved HTML while Next owns routing and static generation. */
export function readStaticDocument(filename: "index.html" | "privacy.html"): StaticDocument {
  const document = readFileSync(join(process.cwd(), filename), "utf8");
  const styles = [...document.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n");
  const body = document.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) throw new Error(`Could not find a body in ${filename}`);
  return {
    styles: styles.replace(/'?Inter'?/g, "var(--font-inter)").replace(/'?Space Grotesk'?/g, "var(--font-space-grotesk)"),
    body: body
      .replace(/<main(?![^>]*\bid=)/i, '<main id="main-content"')
      .replaceAll('src="assets/', 'src="/assets/')
      .replaceAll('href="privacy.html"', 'href="/privacy/"')
      .replaceAll('href="index.html"', 'href="/"'),
  };
}
