import { defineConfig } from "vite";
import yaml from "@rollup/plugin-yaml";
import { cloudflare } from "@cloudflare/vite-plugin";
export default defineConfig({
  slidev: {
    vue: {
      /* vue options */
    },
    markdown: {
      /* markdown-it options */
      markdownItSetup(md) {
        /* custom markdown-it plugins */
      },
    },
    /* options for other plugins */
  },
  plugins: [
    yaml(),
    ...(process.env.NODE_ENV === "production" ? [cloudflare()] : []),
  ],
});
