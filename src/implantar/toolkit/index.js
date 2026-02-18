// Backwards-compatible entry points for consumers.
// This package is ESM (package.json "type": "module").
// Export minimal references so requiring/importing the package won't throw.
export default {
  eslintConfig: "./configs/eslint/base.js",
  prettierConfig: "./configs/prettier/.prettierrc",
};
