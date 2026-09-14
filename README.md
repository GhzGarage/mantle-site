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

## Project layout

- `app/` — routes, metadata, sitemap, robots, and site-wide configuration
- `components/` — reusable rendering components
- `lib/static-document.ts` — compatibility bridge that renders the approved HTML during the gradual React migration
- `public/assets/` — deployable image assets
