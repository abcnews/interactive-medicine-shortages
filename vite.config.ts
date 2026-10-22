import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  server: {
    cors: true,
  },
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
      },
    },
  },
});
