import type { Metadata } from "next";
import DocsChrome from "@/components/docs/DocsChrome";
import { docsNavSections, docsSearchIndex } from "@/lib/docs";
import "./docs.css";

export const metadata: Metadata = { title: { default: "Docs", template: "%s — Mantle Docs" } };

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return <DocsChrome sections={docsNavSections()} searchIndex={docsSearchIndex()}>{children}</DocsChrome>;
}
