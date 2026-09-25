import type { Metadata } from "next";
import Link from "next/link";
import { docHref, docsNav } from "@/lib/docs";

export const metadata: Metadata = {
  title: { absolute: "Mantle Docs" },
  description: "Guides for playing on Mantle and for building, scripting and publishing your own worlds.",
  alternates: { canonical: "/docs/" },
};

export default function DocsHome() {
  const live = docsNav.filter((s) => s.groups.length);
  const planned = docsNav.filter((s) => !s.groups.length);

  return (
    <div className="docs-home">
      <p className="docs-eyebrow">Mantle / Docs</p>
      <h1>Mantle documentation</h1>
      <p className="docs-lede">Guides for playing on Mantle and for building, scripting and publishing your own worlds. Press <kbd>Ctrl K</kbd> to search anything.</p>

      {live.map((section) => (
        <section key={section.id} className="docs-home-section">
          <h2>{section.title}</h2>
          <p className="docs-home-desc">{section.description}</p>
          <div className="docs-cards">
            {section.groups.flatMap((g) => g.pages).map((page) => (
              <Link key={page.slug.join("/")} href={docHref(page.slug)} className="docs-card">
                <b>{page.title}</b>
                <span>{page.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {planned.length > 0 && (
        <section className="docs-home-section">
          <h2>Coming soon</h2>
          <div className="docs-cards">
            {planned.map((s) => (
              <div key={s.id} className="docs-card soon">
                <b>{s.title}</b>
                <span>{s.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
