import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3012,
    proxy: {
      "/baidu-api": {
        target: "https://aip.baidubce.com",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/baidu-api`), ""),
      },
      "/backend-api": {
        target: "http://localhost:1301/api",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/backend-api`), ""),
      },
    },
    warmup: {
      clientFiles: ["./index.html", "./src/{views,components}/*"],
    },
  },
});
