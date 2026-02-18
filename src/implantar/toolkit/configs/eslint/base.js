/**
 * ESLint Base Configuration
 * Configuração base para projetos JavaScript/TypeScript
 * @module @morallus-software/shared-config/eslint/base
 */

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unicornPlugin from "eslint-plugin-unicorn";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".cache/**",
      "coverage/**",
      "**/*.min.js",
      "**/*.min.css",
      "**/*.d.ts",
    ],
  },

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },

    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin,
    },

    rules: {
      // === Core Quality ===
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // === Best Practices ===
      "no-alert": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-param-reassign": ["error", { props: false }],
      "no-return-assign": "error",
      "no-self-compare": "error",
      "no-throw-literal": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "prefer-promise-reject-errors": "error",
      radix: "error",
      "require-await": "error",

      // === Code Style ===
      "array-callback-return": "error",
      "consistent-return": "error",
      "default-case-last": "error",
      "dot-notation": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-lonely-if": "error",
      "no-nested-ternary": "error",
      "no-useless-constructor": "error",
      "prefer-arrow-callback": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "prefer-template": "error",
      "object-shorthand": ["error", "always"],

      // === Import Rules ===
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "import/no-cycle": "error",

      // === Unicorn - Modern Best Practices ===
      "unicorn/better-regex": "error",
      "unicorn/catch-error-name": "error",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-array-for-each": "off", // forEach é legível
      "unicorn/no-array-reduce": "off", // reduce tem usos legítimos
      "unicorn/no-console-spaces": "warn",
      "unicorn/no-for-loop": "warn",
      "unicorn/no-instanceof-array": "error",
      "unicorn/no-null": "off", // null é necessário em alguns casos
      "unicorn/no-typeof-undefined": "error",
      "unicorn/no-unnecessary-await": "error",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-modern-math-apis": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/throw-new-error": "error",
    },
  },

  // Desativa conflitos com Prettier (deve ser último)
  prettierConfig,
];
