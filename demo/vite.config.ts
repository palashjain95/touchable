import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig(({ command }) => ({
  publicDir: path.resolve(__dirname, "../public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias:
      command === "serve"
        ? {
            "@palashjain/touchable": path.resolve(__dirname, "../src/index.ts"),
          }
        : {},
  },
  server: {
    port: 5173,
  },
}));
