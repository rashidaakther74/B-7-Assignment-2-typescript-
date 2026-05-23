import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  target:"esnext",
  outDir: "dist",
  sourcemap: true,
  clean: true,
  dts: false,
  splitting: false
});