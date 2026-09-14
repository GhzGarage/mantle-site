import type { MetadataRoute } from "next";
export const dynamic = "force-static";
const siteUrl = "https://mantleplatform.com";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteUrl, lastModified: new Date("2026-09-14"), changeFrequency: "weekly", priority: 1 }, { url: `${siteUrl}/privacy/`, lastModified: new Date("2026-09-14"), changeFrequency: "yearly", priority: 0.3 }]; }
