import { defineConfig } from "vite";
import path from "path";

const alias = (x: string) => path.resolve(__dirname, x);

export default defineConfig({
  resolve: {
    alias: {
      "@env": alias("./src/env"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
