"use client";

import { LANGUAGES, setLang, useLang } from "./lang";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  return (
    <div className={`docs-lang ${className}`} role="group" aria-label="Show code in">
      <span className="docs-lang-label">Show code in</span>
      <div className="docs-seg">
        {LANGUAGES.map((l) => (
          <button key={l.id} type="button" aria-pressed={lang === l.id} onClick={() => setLang(l.id)}>{l.label}</button>
        ))}
      </div>
    </div>
  );
}
