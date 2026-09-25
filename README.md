# Mantle website

Mantle is a statically exported Next.js site. The current marketing HTML remains the design source while it is rendered through the App Router, so the framework migration does not change the approved visual design.

## Development

```bash
npm install
npm run dev
```

## Verification and release

```bash
npm run lint
npm run build
```

The production-ready static site is written to `out/`. The GitHub Actions workflow runs both verification commands for pull requests and changes to `main`.

## Production hosting

The site deploys to GitHub Pages on every push to `main`. `public/CNAME` pins the generated artifact to `mantleplatform.com`; GitHub Pages must also be configured with that custom domain. Cloudflare is the DNS/CDN layer. Add `CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_API_TOKEN` as repository secrets to enable the post-deploy cache purge.

## Project layout

- `app/` — routes, metadata, sitemap, robots, and site-wide configuration
- `components/` — reusable rendering components
- `lib/static-document.ts` — compatibility bridge that renders the approved HTML during the gradual React migration
- `public/assets/` — deployable image assets
- `app/docs/` — the `/docs` section (layout, styles, page routes)
- `content/docs/` — docs page content as HTML fragments
- `lib/docs.ts` — docs navigation, search index and content processing

## Adding a docs page

1. Write the page body as HTML in `content/docs/<section>/<page>.html` (a section's landing page is `content/docs/<section>/index.html`). Start sections with `<h2 id="...">`; `h2`/`h3` headings feed the "On this page" rail and search.
2. Add an entry to `docsNav` in `lib/docs.ts`. The sidebar, search, prev/next links and sitemap update automatically.

`href="#some-id"` links to headings on other docs pages are rewritten to the right page at build time. Code blocks use `<div class="code" data-v="luau|ts|js|py">` inside a `<div class="v">` group to follow the language switcher.
