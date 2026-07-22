import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// A reserved, non-local fallback keeps static artifacts free of development URLs.
// Deployment must override this with the verified public site URL.
const site = process.env.PUBLIC_SITE_URL ?? 'https://andy-public.example';
const viteCacheMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx(), react(), sitemap()],
  // Vite's React optimizer resolves different JSX runtimes in dev and build.
  // Separate caches prevent a production build from poisoning later hydration.
  vite: {
    cacheDir: `node_modules/.vite-${viteCacheMode}`,
  },
});
