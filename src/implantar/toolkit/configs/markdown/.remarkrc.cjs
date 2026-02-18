module.exports = {
  // Usa presets recomendados e estilos consistentes
  plugins: [
    "remark-preset-lint-recommended",
    "remark-preset-lint-consistent",
    "remark-preset-lint-markdown-style-guide",
    // Limite de linha para legibilidade
    ["lint-maximum-line-length", { maximum: 120 }],
  ],
};
