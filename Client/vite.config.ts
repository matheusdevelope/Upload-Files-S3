import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    outDir: resolve(__dirname, "..", "Server", "dist", "client"),
  },
  plugins: [react()],
});
