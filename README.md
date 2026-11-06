# Portfolio

Source for my portfolio site, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321, reloads on save
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

Requires Node 22.23.4 or newer.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/data/site.ts` | All the text: profile, case studies, teaching, stack. Edit this to change content. |
| `src/pages/index.astro` | The page layout. |
| `src/components/` | `CaseStudy`, `Flow` (the generic platform diagram) and `ItemGrid`. |
| `src/layouts/Base.astro` | `<head>`, fonts, favicon and link-preview tags. |
| `src/styles/global.css` | Design tokens (light and dark) and all styles. |
| `public/` | Files served as-is, such as `favicon.svg`. |
| `astro.config.mjs` | The site URL. Change `site` if the address changes. |

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
In the repo go to Settings → Pages and set **Source** to **GitHub Actions** (one time).

## Content rules

The case studies describe patterns and decisions only. No internal system names, no company code, and no exact spend figures.
