// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'server', // <-- Activa el SSR
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), mdx()]
});