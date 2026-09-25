"use client";

import { useEffect, useState } from "react";
import type { DocHeading } from "@/lib/docs";

export default function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const targets = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: "-80px 0px -70% 0px" });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav className="docs-toc-list" aria-label="On this page">
      <p>On this page</p>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`} className={`lvl-${h.level}${active === h.id ? " active" : ""}`}>{h.text}</a>
      ))}
    </nav>
  );
}
