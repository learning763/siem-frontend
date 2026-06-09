import eslint from "@eslint/js";
import { tanstackConfig } from "@tanstack/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tanstackConfig,
  {
    ignores: ["**/.output/**", "src/routeTree.gen.ts"],
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
  },
  {
    rules: {
      "import/order": "off",
      "sort-imports": "off",
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-hooks/rules-of-hooks": "error",
    },
  },
);
