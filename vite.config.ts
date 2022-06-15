import { defineConfig, loadEnv, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base =
    mode === "production"
      ? env.VITE_MF_REACT_PROD_DOMAIN
      : env.VITE_MF_REACT_DOMAIN;

  const config: UserConfigExport = {
    base: base,
    root: "./src",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      assetsDir: "/assets",
      rollupOptions: {
        input: "./src/vite-single-spa-react.tsx",
        output: {
          format: "module",
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          // globals: {
          //   react: 'React'
          // }
        },
        preserveEntrySignatures: "strict",
        external: ["single-spa"],
      },
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
      ],
    },
    plugins: [react(), dynamicImport(), eslintPlugin()],
  };

  return config;
});
