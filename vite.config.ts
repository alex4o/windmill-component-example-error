import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const __COMPONENT_NAME__ = "My Component";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    cssInjectedByJsPlugin({
      preRenderCSSCode: (cssCode) =>
        cssCode.replace(
          /__COMPONENT_NAME__/g,
          __COMPONENT_NAME__.replace(/-/g, "_").replace(/\s/g, "_")
        ),
    }),
  ],
  build: {
    lib: {
      entry: "src/lib.tsx",
      name: "wmc",
      fileName: (format) => `cc.${format}.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  define: {
    __COMPONENT_NAME__: JSON.stringify(
      __COMPONENT_NAME__.replace(/-/g, "_").replace(/\s/g, "_")
    ),
  },
}));
