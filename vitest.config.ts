import type { ViteUserConfig as VitestUserConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

const vitestConfig = {
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
} satisfies VitestUserConfig;

export default getViteConfig(vitestConfig);
