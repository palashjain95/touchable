import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@radix-ui/react-tabs"],
  onSuccess: async () => {
    mkdirSync("dist", { recursive: true });
    copyFileSync("src/styles/tokens.css", "dist/styles.css");
  },
});
