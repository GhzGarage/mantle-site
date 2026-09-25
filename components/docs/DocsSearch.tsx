"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry } from "@/lib/docs";

export default function DocsSearch({ entries, onClose }: { entries: SearchEntry[]; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return entries.filter((e) => !e.href.includes("#"));
    return entries
      .filter((e) => words.every((w) => `${e.title} ${e.context}`.toLowerCase().includes(w)))
      .sort((a, b) => Number(!a.title.toLowerCase().includes(words[0])) - Number(!b.title.toLowerCase().includes(words[0])))
      .slice(0, 12);
  }, [entries, query]);

  const go = (entry?: SearchEntry) => {
    if (!entry) return;
    onClose();
    router.push(entry.href);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[active]); }
    else if (e.key === "Escape") onClose();
  };

  return (
    <div className="docs-search-scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="docs-search" role="dialog" aria-modal="true" aria-label="Search docs">
        <input
          autoFocus
          type="search"
          placeholder="Search the docs"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          aria-controls="docs-search-results"
          aria-activedescendant={results[active] ? `docs-result-${active}` : undefined}
        />
        <ul id="docs-search-results" role="listbox">
          {results.map((r, i) => (
            <li key={r.href} id={`docs-result-${i}`} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onClick={() => go(r)}>
              <b>{r.title}</b><span>{r.context}</span>
            </li>
          ))}
          {!results.length && <li className="empty">No matches for “{query}”</li>}
        </ul>
        <div className="docs-search-foot"><kbd>↑</kbd><kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close</div>
      </div>
    </div>
  );
}
