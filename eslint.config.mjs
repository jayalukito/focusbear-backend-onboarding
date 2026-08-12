import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["node_modules/", "package-lock.json"],
  }
];