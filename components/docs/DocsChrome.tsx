"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection, SearchEntry } from "@/lib/docs";
import DocsSearch from "./DocsSearch";
import { useLang } from "./lang";


function copyCode(e: MouseEvent) {
  const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-copy]");
  const pre = button?.parentElement?.querySelector("pre");
  if (!button || !pre) return;
  const done = (label: string) => { button.textContent = label; setTimeout(() => { button.textContent = "Copy"; }, 1400); };
  if (!navigator.clipboard) return done("Select & copy");
  navigator.clipboard.writeText(pre.textContent ?? "").then(() => done("Copied"), () => done("Select & copy"));
}

export default function DocsChrome({ sections, searchIndex, children }: { sections: NavSection[]; searchIndex: SearchEntry[]; children: ReactNode }) {
  const lang = useLang();
  const pathname = usePathname().replace(/\/?$/, "/");
  const activeSection = sections.find((s) => pathname.startsWith(`/docs/${s.id}/`));
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="docs" data-lang={lang}>
      <div className="docs-glow" aria-hidden="true" />
      <header className="docs-bar">
        <div className="docs-bar-row">
          <button type="button" className="docs-menu-btn" aria-expanded={menuOpen} aria-controls="docs-sidebar" onClick={() => setMenuOpen((o) => !o)}>
            <span aria-hidden="true">☰</span><span className="sr-only">Menu</span>
          </button>
          <Link className="docs-brand" href="/">
            <Image src="/assets/mantle-logo.png" alt="" width={22} height={26} unoptimized />
            MANTLE
          </Link>
          <Link className="docs-bar-label" href="/docs/">Docs</Link>
          <button type="button" className="docs-search-btn" onClick={() => setSearchOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span>Search docs</span>
            <kbd>Ctrl K</kbd>
          </button>
          <Link className="docs-back" href="/">Back to site</Link>
        </div>
        <nav className="docs-tabs" aria-label="Documentation sections">
          <Link href="/docs/" className={!activeSection ? "active" : undefined} aria-current={!activeSection ? "page" : undefined}>Overview</Link>
          {sections.map((s) => s.href
            ? <Link key={s.id} href={s.href} className={activeSection?.id === s.id ? "active" : undefined} aria-current={activeSection?.id === s.id ? "true" : undefined}>{s.title}</Link>
            : <span key={s.id} className="soon" title="Coming soon">{s.title}<small>Soon</small></span>)}
        </nav>
      </header>

      <div className="docs-shell">
        <aside id="docs-sidebar" className={`docs-sidebar${menuOpen ? " open" : ""}`}>
          <nav aria-label={activeSection ? `${activeSection.title} pages` : "Documentation"}>
            {activeSection ? (
              <>
                <p className="docs-sidebar-title">{activeSection.title}</p>
                {activeSection.groups.map((group) => (
                  <details key={group.title} className="docs-nav-group" open>
                    <summary>{group.title}</summary>
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : undefined} aria-current={pathname === link.href ? "page" : undefined} onClick={closeMenu}>{link.title}</Link>
                    ))}
                  </details>
                ))}
              </>
            ) : (
              <>
                <p className="docs-sidebar-title">Sections</p>
                {sections.map((s) => s.href
                  ? <Link key={s.id} href={s.href} onClick={closeMenu}>{s.title}</Link>
                  : <span key={s.id} className="soon">{s.title}<small>Soon</small></span>)}
              </>
            )}
          </nav>
        </aside>
        {menuOpen && <div className="docs-scrim" onClick={closeMenu} aria-hidden="true" />}
        <main id="main-content" className="docs-main" onClick={copyCode}>{children}</main>
      </div>

      <footer className="docs-footer">© 2026 QBCore Studios. Mantle is in active development. · <Link href="/privacy/">Privacy</Link></footer>
      {searchOpen && <DocsSearch entries={searchIndex} onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
