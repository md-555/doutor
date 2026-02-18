Se a documentação ta ok eu não sei, atualizei os nomes pra não ficar como se eu tivesse preguiça ate de arrumar um nome.

# @ascentusoss/shared-config

Configurações compartilhadas de lint e formatadores para manter consistência entre projetos da Morallus Software.

Inclui presets para:

- ESLint (Flat Config)
- Prettier
- Stylelint
- PostCSS
- SVGO
- EditorConfig
- Markdown (remark / markdownlint)
- YAML (yamllint)
- SQL (sqlfluff / sqlformat)

## Instalação

```bash
npm i -D @ascentusoss/shared-config
```

Observação: este pacote expõe apenas configurações. As ferramentas (eslint, prettier, stylelint, etc.) entram como peerDependencies; instale as que você for usar.

## Uso

### ESLint (Flat config)

```js
// eslint.config.js
import base from "@ascentusoss/shared-config/eslint/base";
import typescript from "@ascentusoss/shared-config/eslint/typescript";
import react from "@ascentusoss/shared-config/eslint/react";

export default [
  ...base,
  ...typescript, // se usar TypeScript
  ...react, // se usar React
];
```

### Prettier

Padrão:

```json
"@ascentusoss/shared-config/prettier"
```

Variante Tailwind:

```json
"@ascentusoss/shared-config/prettier/tailwind"
```

### Stylelint

```json
{
  "extends": "@ascentusoss/shared-config/stylelint"
}
```

### PostCSS

```js
// postcss.config.js
export { default } from "@ascentusoss/shared-config/postcss";
```

### SVGO

```js
// svgo.config.js
export { default } from "@ascentusoss/shared-config/svgo";
```

### EditorConfig

```bash
cp node_modules/@ascentusoss/shared-config/configs/.editorconfig ./.editorconfig
```

## Export paths

Principais entrypoints disponíveis via `exports`:

- `@ascentusoss/shared-config/eslint/base`
- `@ascentusoss/shared-config/eslint/typescript`
- `@ascentusoss/shared-config/eslint/react`
- `@ascentusoss/shared-config/eslint/node`
- `@ascentusoss/shared-config/eslint/browser`
- `@ascentusoss/shared-config/prettier`
- `@ascentusoss/shared-config/prettier/tailwind`
- `@ascentusoss/shared-config/stylelint`
- `@ascentusoss/shared-config/postcss`
- `@ascentusoss/shared-config/svgo`
- `@ascentusoss/shared-config/editorconfig`
- `@ascentusoss/shared-config/sql/postgres`
- `@ascentusoss/shared-config/sql/sqlite`
- `@ascentusoss/shared-config/sql/sqlformat`
- `@ascentusoss/shared-config/sql/sqliterc`
- `@ascentusoss/shared-config/yaml/yamllint`
- `@ascentusoss/shared-config/yaml/yaml-lint-json`
- `@ascentusoss/shared-config/markdown/remark`
- `@ascentusoss/shared-config/markdown/markdownlint`

## Licença

MIT-0. Veja [LICENSE](LICENSE).

## 🔐 Publicação privada (GitHub Packages)

1. Configure npm para usar GitHub Packages com seu usuário/organização

```bash
npm login --registry=https://npm.pkg.github.com
```

2. Publique (versão patch/minor/major conforme necessidade)

```bash
npm publish
```

## 🤝 Contribuições

Sugestões e melhorias — abra uma issue no repositório interno.

## 📄 Licença

MIT © Morallus Software

## 🛡 Publicar como pacote privado (apenas seu acesso)

Se você quer publicar esse pacote como privado para uso apenas no seu perfil/organização (sem risco de outras pessoas instalarem acidentalmente), siga estas recomendações:

1. Crie um Personal Access Token (PAT) no GitHub com os escopos: `write:packages`, `read:packages` e `repo` (se necessário para um repo privado). Guarde o token com segurança — ele será usado apenas pela action.

2. Adicione o PAT como secret no repositório GitHub: `NPM_TOKEN` (Settings → Secrets → Actions).

3. O workflow `.github/workflows/publish-to-github-packages.yml` já criado publica apenas para tags que começam com `v` (ex.: `v1.0.0`). Isso previne publicações acidentais — somente quando você criar uma tag/release o pacote será publicado.

4. Para publicar manualmente (local):

```powershell
# no Windows PowerShell - defina uma variavel de ambiente temporária NPM_TOKEN e rode publish
$env:NPM_TOKEN = 'ghp_xxxYOUR_PAT'
npm publish --registry=https://npm.pkg.github.com

# ou configure seu ~/.npmrc para usar o PAT:
@morallus-software:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

5. Para instalar o pacote nos seus projetos (autenticado):

Crie um `.npmrc` no projeto alvo contendo (ou configure seu ~/.npmrc):

```text
@morallus-software:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

E depois rode:

```bash
npm install --save-dev @ascentusoss/shared-config
```

Observações de segurança:

- Se a sua conta/repositório estiver em modo privado, o pacote publicado no GitHub Packages ficará restrito ao seu acesso. Ninguém conseguirá instalar sem o token apropriado.
- O workflow publica apenas quando você criar uma tag `v*`, o que reduz risco de publicação acidental.

- **.editorconfig**: Configuração do editor
- **.stylelintrc.json**: Configuração Stylelint (CSS)

## Licença

MIT © Italo C Lopes
