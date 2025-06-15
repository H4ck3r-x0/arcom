// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://arcom.sa",
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    routing: {
      prefixDefaultLocale: true, // This ensures both /ar/ and /en/ are prefixed
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
