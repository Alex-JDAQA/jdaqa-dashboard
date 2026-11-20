import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** GitHub Pages project sites are served from /repo-name/ */
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    // Prefer the TypeScript source when a stale .js emit sits beside it.
    extensions: [".tsx", ".ts", ".jsx", ".mjs", ".js", ".json"],
  },
  // Bind IPv6 dual-stack (`::`) so both http://localhost:5173 and
  // http://127.0.0.1:5173 work. Binding IPv4-only (127.0.0.1) leaves
  // Chrome's IPv6 localhost lookup with connection refused.
  server: { host: "::", port: 5173, strictPort: true },
});
