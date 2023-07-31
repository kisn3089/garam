import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 3000 },
  // resolve: {
  //   alias: {
  //     "/json/": path.resolve("SCRAPMARKET_FRONT", "public/json/"),
  //   },
  // },
});
