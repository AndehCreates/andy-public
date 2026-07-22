import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// A reserved, non-local fallback keeps static artifacts free of development URLs.
// Deployment must override this with the verified public site URL.
const site = process.env.PUBLIC_SITE_URL ?? 'https://andy-public.example';

export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx(), react(), sitemap()],
});
