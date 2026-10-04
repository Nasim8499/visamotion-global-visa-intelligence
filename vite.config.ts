import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Visamotion client web app.
 *
 * `CAPACITOR=1` produces a fixed-viewport, relative-asset build suitable for
 * Capacitor and Trusted Web Activity (TWA / APK) wrapping. In that mode the
 * single-file inlining plugin is skipped so `public/` assets (manifest, icons,
 * service worker) ship as real files next to a portable index.html.
 *
 * Default `npm run build` keeps the single-file output used for static hosting.
 */
export default defineConfig(({ mode }) => {
  const isCapacitor = process.env.CAPACITOR === "1" || mode === "capacitor";

  return {
    base: isCapacitor ? "./" : "/",
    plugins: [react(), tailwindcss(), ...(isCapacitor ? [] : [viteSingleFile()])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      target: isCapacitor ? "es2015" : "es2020",
      assetsInlineLimit: isCapacitor ? 0 : 4096,
      cssCodeSplit: !isCapacitor,
      sourcemap: false,
      rollupOptions: {
        maxParallelFileOps: 64,
        output: isCapacitor
          ? { entryFileNames: "assets/[name].js", chunkFileNames: "assets/[name].js", assetFileNames: "assets/[name][extname]" }
          : {},
      },
    },
    server: { host: true },
  };
});
