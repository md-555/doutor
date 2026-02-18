/**
 * SVGO Configuration
 * Otimiza e padroniza SVGs mantendo qualidade e legibilidade
 * @module @morallus-software/shared-config/svgo
 * @see https://github.com/svg/svgo
 */

export default {
  multipass: true, // Múltiplas passagens para melhor otimização

  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Manter IDs para referências CSS/JS
          cleanupIds: {
            preserve: [],
            preservePrefixes: [],
            minify: false,
          },

          // Não remover atributos desconhecidos (pode quebrar animações)
          removeUnknownsAndDefaults: {
            keepRoleAttr: true,
            keepAriaAttrs: true,
          },
        },
      },
    },

    // IMPORTANTE: viewBox é necessário para responsividade
    {
      name: "removeViewBox",
      active: false,
    },

    // Remover comentários e metadados
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",

    // Otimizar estrutura
    "convertStyleToAttrs",
    "mergePaths",
    "convertShapeToPath",

    // Otimizar valores numéricos
    {
      name: "cleanupNumericValues",
      params: {
        floatPrecision: 2, // Precisão de 2 casas decimais
      },
    },

    // Remover atributos vazios e inúteis
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "removeUnusedNS",

    // Ordenar atributos alfabeticamente (consistência)
    "sortAttrs",

    // Adicionar xmlns se não existir
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
      },
    },

    // Remover título e descrição (metadados desnecessários)
    // Comente se precisar de acessibilidade
    "removeTitle",
    "removeDesc",

    // Converter cores para formato mais curto
    "convertColors",

    // Remover atributos de estilo inline vazios
    "removeStyleElement",

    // Otimizar transformações
    "convertTransform",
    "removeUselessStrokeAndFill",
  ],

  // Configurações de output
  js2svg: {
    indent: 2, // Indentação de 2 espaços
    pretty: true, // Manter legível
  },
};
