import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    proxy: {
      "/baidu-api": {
        target: "https://aip.baidubce.com",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/baidu-api`), ""),
      },
    },
    warmup: {
      clientFiles: ["./index.html", "./src/{views,components}/*"],
    },
  },
});
