import type { MetadataRoute } from "next";
import { docHref, docsNav } from "@/lib/docs";
export const dynamic = "force-static";
const siteUrl = "https://mantleplatform.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const docs: MetadataRoute.Sitemap = [{ url: `${siteUrl}/docs/`, lastModified: new Date("2026-09-23"), changeFrequency: "weekly", priority: 0.8 }, ...docsNav.flatMap((section) => section.groups.flatMap((g) => g.pages).map((page) => ({ url: `${siteUrl}${docHref(page.slug)}`, lastModified: new Date("2026-09-23"), changeFrequency: "weekly" as const, priority: 0.6 })))];
  return [{ url: siteUrl, lastModified: new Date("2026-09-14"), changeFrequency: "weekly", priority: 1 }, { url: `${siteUrl}/privacy/`, lastModified: new Date("2026-09-14"), changeFrequency: "yearly", priority: 0.3 }, ...docs];
}
