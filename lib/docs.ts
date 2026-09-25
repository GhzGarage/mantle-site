import { readFileSync } from "node:fs";
import { join } from "node:path";

export type DocPage = { slug: string[]; title: string; description: string };
export type DocGroup = { title: string; pages: DocPage[] };
export type DocSection = { id: string; title: string; description: string; groups: DocGroup[] };
export type DocHeading = { id: string; text: string; level: 2 | 3 };
export type NavLink = { title: string; href: string };
export type SearchEntry = { title: string; context: string; href: string };
export type NavSection = { id: string; title: string; href?: string; groups: { title: string; links: NavLink[] }[] };

// Each section is a top-bar tab. To add a page: create content/docs/<slug>.html and list it in a group.
// A section with no pages shows as a "coming soon" tab.
export const docsNav: DocSection[] = [
  {
    id: "scripting",
    title: "Scripting",
    description: "Write gameplay in Luau, TypeScript, JavaScript, Python or visual graphs.",
    groups: [
      {
        title: "Basics",
        pages: [
          { slug: ["scripting"], title: "Get started", description: "Scripts are plain files beside your level. The folder decides where a script runs, tags connect it to things in the world, and the file extension picks the language." },
          { slug: ["scripting", "concepts"], title: "Core concepts", description: "How scripts run on the server and on players' machines, and how tags, events, timers, values and modules fit together." },
          { slug: ["scripting", "visual-scripting"], title: "Visual scripting", description: "Build gameplay by connecting nodes in a graph instead of writing code." },
        ],
      },
      {
        title: "Reference",
        pages: [
          { slug: ["scripting", "api"], title: "API reference", description: "Every service at a glance, tween easing, common errors, script limits and setting up your editor." },
        ],
      },
      {
        title: "Guides",
        pages: [
          { slug: ["scripting", "recipes"], title: "Recipes", description: "Ready-to-use scripts for kill bricks, coins, doors, round timers, buttons, cloning and saving progress." },
          { slug: ["scripting", "migrating"], title: "Coming from other engines", description: "How Roblox, FiveM and Unreal concepts map to Mantle." },
        ],
      },
    ],
  },
  {
    id: "creators",
    title: "Creators",
    description: "Set up the editor, build a place, publish your world and manage it. Each feature is marked Live, In progress or Planned.",
    groups: [
      {
        title: "Build",
        pages: [
          { slug: ["creators", "quick-start"], title: "Quick start: your first world", description: "From installing the Mantle plugin to a published world your friends can join, step by step." },
          { slug: ["creators"], title: "Editor setup and tools", description: "What you need, signing in, the Mantle editor tools, checking your place and testing it." },
          { slug: ["creators", "building"], title: "Building a place", description: "What you can put in a place, place settings, what gets published, your own meshes and materials, and the sky." },
        ],
      },
      {
        title: "Ship",
        pages: [
          { slug: ["creators", "publishing"], title: "Publishing and managing worlds", description: "How publishing works, what can stop it, going back to an earlier version, and helping players find your world." },
          { slug: ["creators", "hosting-data"], title: "Hosting, data and monetisation", description: "Official and community hosting, upload limits, saving player data, your creator page, stats, avatar items and plans for earning." },
        ],
      },
      {
        title: "Guides",
        pages: [
          { slug: ["creators", "custom-assets"], title: "Custom meshes and materials", description: "Use meshes, materials and textures from your own project or a Fab pack in a world: publishing them, what players see, the limits, and fixing common problems." },
          { slug: ["creators", "avatar-items"], title: "Making avatar items", description: "The Cosmetics panel from start to finish: what you can make, checking and uploading an item, screening, and what happens after." },
          { slug: ["creators", "clothing"], title: "Clothing, hair and accessories", description: "Build 3D clothing, 2D clothing, hair and accessories in Unreal that pass Mantle's checks and fit every avatar: skeletons, slots, sockets, budgets and the messages you'll see." },
          { slug: ["creators", "avatars-emotes"], title: "Avatars and emotes", description: "Make whole avatars on a supported skeleton, and emotes players can play from the emote wheel." },
          { slug: ["creators", "vehicles"], title: "Vehicles", description: "How the vehicle converter will bring a Chaos Vehicles car into Mantle: getting it ready, what you get and what's different." },
        ],
      },
    ],
  },
  {
    id: "players",
    title: "Players",
    description: "Install Mantle, join worlds, and learn the controls, friends, chat and safety tools. Each feature is marked Live, In progress or Planned.",
    groups: [
      {
        title: "Basics",
        pages: [
          { slug: ["players"], title: "Getting started", description: "Installing Mantle, signing in, finding worlds, community servers and joining a world." },
          { slug: ["players", "playing"], title: "Playing", description: "Controls, moving around, your avatar and emotes, tools, vehicles, settings and what to expect in a world." },
        ],
      },
      {
        title: "Community",
        pages: [
          { slug: ["players", "social"], title: "Friends, chat and voice", description: "Friends, seeing what they're playing, chat, voice, blocking and Discord." },
          { slug: ["players", "safety"], title: "Safety and account", description: "Reporting, how moderation works, your account, privacy and age settings." },
        ],
      },
      {
        title: "Help",
        pages: [
          { slug: ["players", "troubleshooting"], title: "Troubleshooting and help", description: "What your PC needs, fixes for common problems joining worlds, voice and chat, and how to contact us or find the community." },
        ],
      },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    description: "Joining worlds, player limits, hosting your own server, updates, limits and keeping content safe.",
    groups: [
      {
        title: "Runtime",
        pages: [
          { slug: ["platform"], title: "Servers and sessions", description: "What happens when you press Play, how many players a world can hold, how servers performed in testing and the specs to host one." },
          { slug: ["platform", "community-servers"], title: "Community-hosted servers", description: "Setting up and running your own server, what players see, and how everyone stays safe." },
        ],
      },
      {
        title: "Operations",
        pages: [
          { slug: ["platform", "releases"], title: "Updates", description: "How Mantle updates reach you and how servers update without interrupting play." },
          { slug: ["platform", "backend"], title: "Services and trust", description: "Your account, limits, what gets screened, who can see chat and voice, and how long data is kept." },
        ],
      },
    ],
  },
];

const sectionPages = (section: DocSection) => section.groups.flatMap((g) => g.pages);
const allPages = docsNav.flatMap((section) => sectionPages(section).map((page) => ({ ...page, section: section.title })));
export const docHref = (slug: string[]) => `/docs/${slug.join("/")}/`;
export const docsStaticParams = () => allPages.map((page) => ({ slug: page.slug }));

const stripTags = (html: string) => html.replace(/<span class="status[^"]*">[\s\S]*?<\/span>/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function withHeadingIds(html: string) {
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => `<h${level} id="${slugify(stripTags(inner))}">${inner}</h${level}>`);
}

function headingsOf(html: string): DocHeading[] {
  return [...html.matchAll(/<h([23])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: Number(m[1]) as 2 | 3, id: m[2], text: stripTags(m[3]) }));
}

const rawCache = new Map<string, string>();
function rawHtml(slug: string[]) {
  const key = slug.join("/");
  if (!rawCache.has(key) || process.env.NODE_ENV === "development") {
    const file = slug.length === 1 ? join(slug[0], "index.html") : `${key}.html`;
    rawCache.set(key, withHeadingIds(readFileSync(join(process.cwd(), "content", "docs", file), "utf8")));
  }
  return rawCache.get(key)!;
}

let idIndex: Map<string, string> | undefined;
function pageForId(id: string) {
  if (!idIndex || process.env.NODE_ENV === "development") {
    idIndex = new Map();
    for (const page of allPages) for (const m of rawHtml(page.slug).matchAll(/\bid="([^"]+)"/g)) if (!idIndex.has(m[1])) idIndex.set(m[1], docHref(page.slug));
  }
  return idIndex.get(id);
}

const KEYWORDS: Record<string, string> = {
  luau: "local|function|end|if|then|else|elseif|for|in|do|while|return|not|and|or|nil|true|false|break|repeat|until|continue",
  js: "const|let|var|function|export|return|if|else|for|of|in|while|new|true|false|undefined|null|declare|type|typeof|as|void|continue|break|import|from|async|await",
  py: "def|return|if|elif|else|for|in|while|import|from|as|True|False|None|and|or|not|lambda|yield|class|pass|break|continue|with|try|except",
};
const API = "(?:World|Players|State|Net|UI|Events|Script|Vector3|task)(?:[.:][A-Za-z_]+)*";
const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const decodeHtml = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

function highlight(code: string, lang: string) {
  const comment = lang === "luau" ? "(--[^\\n]*)" : lang === "py" ? "(#[^\\n]*)" : "(\\/\\/[^\\n]*)";
  const re = new RegExp(`${comment}|("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`[^\`]*\`)|\\b(${API})\\b|\\b(${KEYWORDS[lang]})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, "g");
  let out = "";
  let last = 0;
  for (const m of code.matchAll(re)) {
    const cls = m[1] ? "c" : m[2] ? "s" : m[3] ? "a" : m[4] ? "k" : "n";
    out += `${escapeHtml(code.slice(last, m.index))}<span class="${cls}">${escapeHtml(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + escapeHtml(code.slice(last));
}

function enhanceCode(html: string) {
  return html.replace(/<div class="code"( data-v="(\w+)")?>(\s*<span class="tag">([\s\S]*?)<\/span>)?(\s*)<pre([^>]*)>([\s\S]*?)<\/pre>/g, (_, dv, v = "", tagBlock = "", tag = "", space, attrs, body) => {
    const hint = `${v} ${tag.toLowerCase()}`;
    const lang = /luau|\.lua/.test(hint) ? "luau" : /\bpy|python|\.py/.test(hint) ? "py" : /\bjs|\bts|javascript|typescript|\.js|\.ts/.test(hint) ? "js" : null;
    const code = lang && !attrs.includes('data-example-kind="graph"') ? highlight(decodeHtml(body), lang) : body;
    return `<div class="code"${dv ?? ""}>${tagBlock}${space}<pre${attrs}>${code}</pre><button type="button" class="copy" data-copy>Copy</button>`;
  });
}

function rewriteHashLinks(html: string) {
  const localIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  return html.replace(/href="#([^"]+)"/g, (match, id) => {
    if (localIds.has(id)) return match;
    const target = pageForId(id);
    return target ? `href="${target}#${id}"` : match;
  });
}

export function getDoc(slug: string[]) {
  const index = allPages.findIndex((page) => page.slug.join("/") === slug.join("/"));
  if (index < 0) return undefined;
  const page = allPages[index];
  const raw = rawHtml(page.slug);
  const link = (p?: DocPage): NavLink | undefined => (p ? { title: p.title, href: docHref(p.slug) } : undefined);
  return {
    ...page,
    html: rewriteHashLinks(enhanceCode(raw)),
    headings: headingsOf(raw),
    hasLanguageVariants: raw.includes("data-v="),
    prev: link(allPages[index - 1]),
    next: link(allPages[index + 1]),
  };
}

export function docsSearchIndex(): SearchEntry[] {
  return allPages.flatMap((page) => {
    const href = docHref(page.slug);
    return [
      { title: page.title, context: page.section, href },
      ...headingsOf(rawHtml(page.slug)).map((h) => ({ title: h.text, context: `${page.section} · ${page.title}`, href: `${href}#${h.id}` })),
    ];
  });
}

export function docsNavSections(): NavSection[] {
  return docsNav.map((section) => {
    const first = sectionPages(section)[0];
    return {
      id: section.id,
      title: section.title,
      href: first && docHref(first.slug),
      groups: section.groups.map((g) => ({ title: g.title, links: g.pages.map((p) => ({ title: p.title, href: docHref(p.slug) })) })),
    };
  });
}
