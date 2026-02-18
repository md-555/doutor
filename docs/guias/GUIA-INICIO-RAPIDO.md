# 🚀 Guia de Início Rápido do Doutor

> Proveniência e Autoria: Este documento integra o projeto Doutor (licença MIT).
> Última atualização: 15 de janeiro de 2026

---

## O que é o Doutor?

O **Doutor** é uma ferramenta de linha de comando (CLI) para analisar, diagnosticar e manter projetos JavaScript/TypeScript (e com suporte heurístico para outras linguagens). Ele identifica problemas de código, verifica integridade de arquivos e sugere melhorias estruturais.

**Requisitos:** Node.js >=25.0.0

Sugerimos usar um gerenciador de versões (nvm/fnm/volta). Exemplo com nvm:

```bash
nvm install 25
nvm use 25
# Confirme
node --version  # deve ser v25.x
```

O projeto também inclui um arquivo `.nvmrc` com o valor `25`. Ao clonar, execute `nvm use` para ativar automaticamente a versão correta.

---

## Instalação

### Opção 1: Instalação Global (Recomendada)

```bash
# Clone o repositório
git clone https://github.com/ossmoralus/doutor.git
cd doutor

# Instale as dependências e compile
npm install
npm run build

# Link global (permite usar 'doutor' de qualquer diretório)
npm link
```

### Opção 2: Instalação Local

```bash
# No diretório do seu projeto
npm install --save-dev /caminho/para/doutor

# Use via npx
npx doutor diagnosticar
```

### Opção 3: Teste Rápido (sem instalar)

```bash
# Requer Node.js 24+
npx github:ossmoralus/doutor diagnosticar --help
```

---

## Primeiro Diagnóstico

Execute o comando básico no diretório do seu projeto:

```bash
doutor diagnosticar
```

O Doutor irá:

1. 📁 **Varrer** todos os arquivos do projeto
2. 🔍 **Analisar** código em busca de problemas
3. 📊 **Exibir** um resumo com ocorrências encontradas

### Saída Típica

```
✅ Varredura concluída: 120 arquivos em 15 diretórios

📊 Resumo das 25 ocorrências:

  📋 Principais tipos:
     • problemas-teste: 18
     • tipo-inseguro-any: 4
     • problema-documentacao: 3

  📁 Top arquivos:
     • src/services/api.ts (5)
     • src/utils/helpers.ts (3)
     • tests/unit/api.test.ts (2)

✔ Diagnóstico concluído.
```

---

## Comandos Essenciais

### 1. Diagnóstico do Projeto

```bash
# Diagnóstico básico (modo compacto)
doutor diagnosticar

# Diagnóstico detalhado
doutor diagnosticar --full

# Apenas visualizar arquivos (sem análise)
doutor diagnosticar --scan-only
```

### 2. Exportar Resultados

```bash
# Saída JSON para CI/CD
doutor diagnosticar --json

# Exportar relatório para arquivo
doutor diagnosticar --export
```

### 3. Filtrar Análise

```bash
# Analisar apenas pasta src/
doutor diagnosticar --include "src/**"

# Excluir testes
doutor diagnosticar --exclude "**/*.test.ts"

# Combinação
doutor diagnosticar --include "src/**" --exclude "**/*.test.ts"
```

### 4. Correção Automática

```bash
# Correção conservadora (segura)
doutor diagnosticar --auto-fix --auto-fix-mode conservative

# Preview das correções (sem aplicar)
doutor diagnosticar --auto-fix --dry-run
```

### 5. Verificação de Integridade (Guardian)

```bash
# Criar baseline de hashes
doutor guardian

# Verificar alterações
doutor guardian --diff

# Aceitar alterações atuais
doutor guardian --accept
```

---

## Configuração Rápida

### Criar arquivo de configuração

```bash
# Criar doutor.config.json na raiz do projeto
cat > doutor.config.json << 'EOF'
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalExcludeGlob": [
      "node_modules/**",
      "dist/**",
      "coverage/**"
    ]
  },
  "coverageGate": {
    "lines": 80,
    "functions": 80,
    "branches": 75,
    "statements": 80
  }
}
EOF
```

### Suprimir falsos positivos

Use comentários inline para suprimir ocorrências específicas:

```typescript
// @doutor-disable-next-line tipo-inseguro-any
const dados: any = respostaExterna;

// @doutor-disable hardcoded-secrets
const configKey = "chave_configuracao_publica";
```

---

## Opções de Linha de Comando

### Flags Principais

| Flag          | Descrição                           |
| ------------- | ----------------------------------- |
| `--full`      | Modo detalhado com mais informações |
| `--compact`   | Modo compacto (padrão)              |
| `--json`      | Saída em formato JSON               |
| `--export`    | Exportar relatório para arquivo     |
| `--scan-only` | Apenas varrer arquivos, sem análise |

### Filtros

| Flag                 | Descrição                                 |
| -------------------- | ----------------------------------------- |
| `--include "padrão"` | Incluir arquivos que correspondem ao glob |
| `--exclude "padrão"` | Excluir arquivos que correspondem ao glob |
| `--exclude-tests`    | Excluir arquivos de teste                 |

### Correções

| Flag              | Descrição                                      |
| ----------------- | ---------------------------------------------- |
| `--auto-fix`      | Ativar correções automáticas                   |
| `--auto-fix-mode` | Modo: `conservative`, `balanced`, `aggressive` |
| `--dry-run`       | Preview das correções sem aplicar              |

### Níveis de Log

| Flag                | Descrição     |
| ------------------- | ------------- |
| `--log-level info`  | Nível padrão  |
| `--log-level debug` | Mais detalhes |
| `--log-level warn`  | Apenas avisos |
| `--log-level error` | Apenas erros  |

---

## Casos de Uso Comuns

### Integração com CI/CD

```yaml
# .github/workflows/doutor.yml
name: Doutor CI

on: [push, pull_request]

jobs:
  diagnostico:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Instalar Doutor
        run: |
          npm install
          npm run build

      - name: Executar Diagnóstico
        run: npx doutor diagnosticar --json --export
```

### Monorepo

```bash
# Analisar um pacote específico
doutor diagnosticar --include "packages/my-package/**"

# Analisar múltiplos pacotes
doutor diagnosticar \
  --include "packages/core/**" \
  --include "packages/utils/**"
```

### Código Legado

```json
// doutor.config.json
{
  "rules": {
    "tipo-inseguro": {
      "exclude": ["src/legacy/**"]
    }
  }
}
```

---

## Próximos Passos

1. 📖 Leia o [Guia de Comandos](guias/GUIA-COMANDOS.md) completo
2. ⚙️ Configure o [Guia de Configuração](guias/GUIA-CONFIGURACAO.md)
3. 🔒 Entenda a [Segurança](arquitetura/SEGURANCA.md) do sistema
4. 🧪 Explore o [Sistema de Type Safety](arquitetura/TYPE-SAFETY.md)

---

## Ajuda Rápida

```bash
# Ver todos os comandos disponíveis
doutor --help

# Ajuda de um comando específico
doutor diagnosticar --help

# Listar analistas disponíveis
doutor analistas --listar
```

---

## Problemas Comuns

### "Comando não encontrado"

```bash
# Certifique-se de ter feito o link global
npm link

# Ou use npx
npx doutor diagnosticar
```

### "Muitos falsos positivos"

1. Use `--exclude` para filtrar arquivos de teste
2. Configure `testPatterns.allowAnyType: true` para testes
3. Use `// @doutor-disable-next-line` para casos específicos

### "Análise muito lenta"

```bash
# Use modo rápido
doutor diagnosticar --fast

# Limite o escopo
doutor diagnosticar --include "src/**"

# Aumente workers (paralelização)
WORKER_POOL_MAX_WORKERS=4 doutor diagnosticar
```

---

**Versão:** 0.2.0 | **Licença:** MIT
