/**
 * ESLint Browser Configuration
 * Configuração para projetos web/browser
 * @module @morallus-software/shared-config/eslint/browser
 */

import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        MutationObserver: "readonly",
        ResizeObserver: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        FormData: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Event: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        AbortController: "readonly",
        Blob: "readonly",
        performance: "readonly",
        Notification: "readonly",
      },
    },

    rules: {
      // === Browser Specific ===
      "no-alert": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  prettierConfig,
];
