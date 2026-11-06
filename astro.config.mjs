import { defineConfig } from 'astro/config';

// User site: served from the root of https://jmarcos-cano.github.io, so no `base` needed.
// If you add a custom domain, change `site` to it.
export default defineConfig({
  site: 'https://jmarcos-cano.github.io',
});
