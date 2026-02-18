/**
 * ESLint Node.js Configuration
 * Configuração para projetos Node.js/Backend
 * @module @morallus-software/shared-config/eslint/node
 */

import prettierConfig from "eslint-config-prettier";
import nodePlugin from "eslint-plugin-n";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: {
        // Node.js globals
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        console: "readonly",
      },
    },

    plugins: {
      n: nodePlugin,
    },

    rules: {
      // === Node.js Specific ===
      "n/no-deprecated-api": "error",
      "n/no-unpublished-import": "off",
      "n/no-missing-import": "off",
      "n/no-unsupported-features/es-syntax": "off",
      "n/no-process-exit": "warn",

      // === Console ===
      "no-console": ["warn", { allow: ["log", "warn", "error", "info"] }],

      // === Best Practices ===
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // CommonJS files
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  prettierConfig,
];
