/**
 * ESLint TypeScript Configuration
 * Configuração rigorosa para projetos TypeScript
 * @module @morallus-software/shared-config/eslint/typescript
 */

import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import securityPlugin from "eslint-plugin-security";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import { existsSync } from "node:fs";
import { join } from "node:path";
import tseslint from "typescript-eslint";

const tsconfigPath = join(process.cwd(), "tsconfig.json");
const hasTsconfig = existsSync(tsconfigPath);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "**/*.d.ts", "**/*.min.*"],
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ...(hasTsconfig
          ? {
              project: tsconfigPath,
              tsconfigRootDir: process.cwd(),
            }
          : {}),
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
    },

    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".ts", ".tsx"] },
        typescript: true,
      },
    },

    rules: {
      // === TypeScript Strict Rules ===
      "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: false }],
      "@typescript-eslint/no-unused-vars": "off", // delegado para unused-imports
      "@typescript-eslint/explicit-module-boundary-types": "off", // TypeScript infere
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // === Type Safety (exige type info) ===
      ...(hasTsconfig
        ? {
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": [
              "error",
              {
                checksVoidReturn: {
                  attributes: false,
                  arguments: false,
                },
              },
            ],
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/promise-function-async": "warn",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-unsafe-member-access": "error",
            "@typescript-eslint/no-unsafe-call": "error",
            "@typescript-eslint/no-unsafe-return": "error",
            "@typescript-eslint/no-unsafe-argument": "error",
          }
        : {}),

      // === Code Quality ===
      "@typescript-eslint/no-unnecessary-condition": "off", // muitos falsos positivos
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "off", // || vs ?? é estilo
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/strict-boolean-expressions": "off", // muito restritivo
      "@typescript-eslint/prefer-readonly": "warn",
      "@typescript-eslint/require-await": "off", // pode ser intencional
      "@typescript-eslint/no-redundant-type-constituents": "error",

      // === Naming Conventions ===
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],

      // === Import Organization ===
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-cycle": "error",

      // === Security Rules ===
      "security/detect-object-injection": "off", // muitos falsos positivos
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-unsafe-regex": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-pseudoRandomBytes": "error",

      // === SonarJS - Code Quality ===
      "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }],
      "sonarjs/cognitive-complexity": ["warn", 20],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/prefer-immediate-return": "warn",
      "sonarjs/prefer-single-boolean-return": "warn",

      // === Unicorn - Modern Practices ===
      "unicorn/better-regex": "error",
      "unicorn/catch-error-name": "error",
      "unicorn/error-message": "error",
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "unicorn/no-array-for-each": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-modern-math-apis": "error",
      "unicorn/prefer-string-starts-ends-with": "error",

      // === General ===
      "no-console": "off",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // === Test Files Override ===
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },

  prettierConfig,
];
