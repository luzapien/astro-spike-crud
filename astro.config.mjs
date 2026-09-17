// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // <-- Activa el SSR
  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});