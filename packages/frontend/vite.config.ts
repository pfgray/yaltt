import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: __dirname,
  server: {
    port: 80,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://backend:3000/",
        changeOrigin: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/favicon.svg": {
        target: "http://backend:3000/",
        changeOrigin: false,
      },
      "/docs": {
        target: "http://backend:3000/",
        changeOrigin: false,
      },
    },
    host: true,
  },
});
