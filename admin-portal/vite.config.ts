import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    outDir: "dist",
    target: "es2020",
    cssCodeSplit: false,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5174, host: true },
  preview: { port: 5174, host: true },
});
