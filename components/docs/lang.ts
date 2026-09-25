"use client";

import { useSyncExternalStore } from "react";

export const LANGUAGES = [
  { id: "luau", label: "Luau" },
  { id: "ts", label: "TypeScript" },
  { id: "js", label: "JavaScript" },
  { id: "py", label: "Python" },
] as const;

const STORAGE_KEY = "mantle-docs-lang";
const DEFAULT_LANG = "luau";
const listeners = new Set<() => void>();
let current: string | null = null;

const isLanguage = (value: string | null): value is string => LANGUAGES.some((l) => l.id === value);

function readLang() {
  if (current) return current;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {}
  return DEFAULT_LANG;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

export function setLang(lang: string) {
  current = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  listeners.forEach((listener) => listener());
}

export const useLang = () => useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);
