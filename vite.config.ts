import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";

const host = `${os.hostname().toLowerCase().split(".")[0]}.aus.aunty.abc.net.au`;
const certDir = path.join(os.homedir(), ".aunty", "ssl", host);

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  server: {
    https: {
      key: fs.readFileSync(path.join(certDir, "server.key")),
      cert: fs.readFileSync(path.join(certDir, "server.crt")),
    },
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
