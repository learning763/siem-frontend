/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^.*\\.css$",
    "",
    "<TYPES>",
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "",
    "^@/(utils|features|helpers)/(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderCaseSensitive: false,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  tailwindStylesheet: "./src/styles/global.css",
  tailwindFunctions: ["clsx", "cva", "cn"],
};
export default config;
