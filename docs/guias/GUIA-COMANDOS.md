# 📚 Guia Completo de Comandos do Doutor

> Proveniência e Autoria: Este documento integra o projeto Doutor (licença MIT).
> Última atualização: 15 de janeiro de 2026

## 🎯 Visão Geral

O Doutor oferece diversos comandos para análise, diagnóstico e manutenção de projetos. Este guia detalha cada comando, suas opções e casos de uso.

**Requisitos:** Node.js >=25.0.0

## 📋 Índice de Comandos

1. [diagnosticar](#diagnosticar) - Análise completa do projeto
2. [guardian](#guardian) - Verificação de integridade
3. [podar](#podar) - Remoção de arquivos órfãos
4. [reestruturar](#reestruturar) - Reorganização de estrutura
5. [formatar](#formatar) - Formatação de código
6. [fix-types](#fix-types) - Correção de tipos inseguros
7. [metricas](#metricas) - Visualização de métricas
8. [perf](#perf) - Análise de performance
9. [analistas](#analistas) - Catálogo de analistas
10. [otimizar-svg](#otimizar-svg) - Otimização de SVGs
11. [atualizar](#atualizar) - Atualização segura
12. [reverter](#reverter) - Reversão de mudanças

---

## diagnosticar

Comando principal para análise completa do projeto.

### Uso Básico

```bash
doutor diagnosticar
```

Durante a execução, o Doutor exibe um indicador visual “🔎 Diagnóstico em execução...” para sinalizar processamento.

### Opções Principais

#### Modos de Execução

```bash
# Modo detalhado (mais informações)
doutor diagnosticar --full

# Modo compacto (padrão): consolida progresso e mostra o essencial
doutor diagnosticar --compact

# Modo executivo: apenas problemas críticos/alta prioridade
doutor diagnosticar --executive

# Apenas varredura (não prepara AST, sem análise completa)
doutor diagnosticar --scan-only
```

#### Formatos de Saída

```bash
# Saída JSON para ferramentas/automação
doutor diagnosticar --json

# Exportar resumo/manifest
doutor diagnosticar --export

# Exportar dump completo (fragmentado em shards)
doutor diagnosticar --export-full

# JSON ASCII (compat legada)
doutor diagnosticar --json-ascii
```

#### Filtros

```bash
# Incluir padrões
doutor diagnosticar --include "src/**" --include "scripts/**"

# Excluir padrões
doutor diagnosticar --exclude "**/*.test.*" --exclude "**/__tests__/**"

# Excluir testes rapidamente
doutor diagnosticar --exclude-tests
```

#### Auto-Fix

```bash
# Ativar auto-fix
doutor diagnosticar --auto-fix

# Modo conservador / agressivo / equilibrado
doutor diagnosticar --auto-fix-mode conservative
doutor diagnosticar --auto-fix-mode aggressive
doutor diagnosticar --auto-fix-mode balanced

# Atalhos
doutor diagnosticar --fix            # alias de --auto-fix
doutor diagnosticar --fix-safe       # alias de --auto-fix --auto-fix-mode conservative

# Dry-run (preview sem modificar)
DOUTOR_ALLOW_MUTATE_FS=1 doutor diagnosticar --auto-fix --dry-run
```

#### Timeout e Performance

```bash
# Modo rápido (menos checks)
doutor diagnosticar --fast

# Confiar no compilador (reduz falsos positivos comuns)
doutor diagnosticar --trust-compiler

# Verificar ciclos com heurística extra
doutor diagnosticar --verify-cycles

# Ajustes de timeout via ambiente (por analista)
DOUTOR_ANALISE_TIMEOUT_POR_ANALISTA_MS=60000 doutor diagnosticar
```

### Exemplos de Uso

```bash
# Padrão compacto com resumo útil
doutor diagnosticar --compact

# Detalhado (inclui amostra maior e blocos completos)
doutor diagnosticar --full

# Para CI/CD estruturado
doutor diagnosticar --json --export

# Correção automática segura
DOUTOR_ALLOW_MUTATE_FS=1 doutor diagnosticar --fix-safe --dry-run
```

---

## guardian

Verificação de integridade dos arquivos via hashes.

### Uso Básico

```bash
# Criar baseline inicial
doutor guardian

# Verificar alterações
doutor guardian --diff
```

### Opções

```bash
# Saída JSON
doutor guardian --json

# Modo verbose
doutor guardian --verbose

# Aceitar alterações como novo baseline
doutor guardian --accept

# Forçar recriação do baseline
doutor guardian --force
```

### Status de Retorno

- `ok` - Nenhuma alteração detectada
- `baseline-criado` - Baseline criado pela primeira vez
- `baseline-aceito` - Alterações aceitas como novo baseline
- `alteracoes-detectadas` - Arquivos modificados detectados
- `erro` - Erro durante verificação

### Exemplos

```bash
# Verificação rápida no CI
doutor guardian --diff --json

# Criar baseline após mudanças válidas
doutor guardian --accept

# Debug detalhado
doutor guardian --diff --verbose
```

---

## podar

Remoção segura de arquivos órfãos (não referenciados).

### Uso Básico

```bash
# Dry-run (preview sem remover)
doutor podar --dry-run

# Remoção efetiva
doutor podar
```

### Opções

```bash
# Modo interativo (confirma cada arquivo)
doutor podar --interactive

# Saída JSON
doutor podar --json

# Verbose (mostrar análise detalhada)
doutor podar --verbose
```

### Exemplos

```bash
# Análise de arquivos órfãos
doutor podar --dry-run --verbose

# Limpeza automática
doutor podar --json

# Limpeza com confirmação
doutor podar --interactive
```

---

## metricas

Visualização de métricas e histórico agregado.

### Uso Básico

```bash
# Exibir métricas atuais
doutor metricas

# Formato JSON
doutor metricas --json
```

### Opções

```bash
# Exibir histórico
doutor metricas --history

# Comparar com período anterior
doutor metricas --compare

# Exportar para arquivo
doutor metricas --export metricas.json
```

### Exemplos

```bash
# Dashboard de métricas
doutor metricas --verbose

# Análise de tendências
doutor metricas --history --json

# Comparação temporal
doutor metricas --compare --full
```

---

## perf

Análise de performance e comparação de snapshots.

### Uso Básico

```bash
# Criar snapshot de performance
doutor perf snapshot

# Comparar snapshots
doutor perf compare
```

### Opções

```bash
# Comparar com baseline
doutor perf compare --baseline

# Saída JSON
doutor perf --json

# Limites personalizados
doutor perf compare --threshold 10
```

### Exemplos

```bash
# Benchmark antes de mudanças
doutor perf snapshot --name "antes-refactor"

# Benchmark depois e comparar
doutor perf snapshot --name "depois-refactor"
doutor perf compare antes-refactor depois-refactor

# Análise de regressão no CI
doutor perf compare --baseline --json
```

---

## analistas

Listar e documentar analistas disponíveis.

### Uso Básico

```bash
# Listar todos os analistas
doutor analistas

# Formato JSON
doutor analistas --json
```

### Opções

```bash
# Gerar documentação
doutor analistas --doc docs/ANALISTAS.md

# Mostrar apenas ativos
doutor analistas --active-only

# Incluir metadados
doutor analistas --full
```

### Exemplos

```bash
# Catálogo completo
doutor analistas --full --json

# Documentação automática
doutor analistas --doc docs/ANALISTAS-GERADO.md

# Debug de analistas
doutor diagnosticar --listar-analistas
```

---

## fix-types

Correção interativa de tipos inseguros (any/unknown).

### Uso Básico

```bash
# Modo interativo
doutor fix-types --interactive

# Auto-fix conservador
doutor fix-types --auto-fix --auto-fix-mode conservative
```

### Opções

```bash
# Mostrar diff antes de aplicar
doutor fix-types --show-diff

# Dry-run
doutor fix-types --dry-run

# Validar sintaxe após correção
doutor fix-types --validate-only

# Focar em tipo específico
doutor fix-types --tipo any
doutor fix-types --tipo unknown
```

### Exemplos

```bash
# Correção segura e interativa
doutor fix-types --interactive --show-diff

# Correção automática de 'any'
doutor fix-types --tipo any --auto-fix --dry-run

# Validação pós-correção
doutor fix-types --validate-only
```

---

## reestruturar

Reorganização de estrutura do projeto com plano de moves.

### Uso Básico

```bash
# Ver plano sem aplicar
doutor reestruturar --somente-plano

# Aplicar reestruturação
doutor reestruturar --auto
```

### Opções

```bash
# Organização por domains
doutor reestruturar --domains

# Organização flat
doutor reestruturar --flat

# Usar preset específico
doutor reestruturar --preset doutor
doutor reestruturar --preset node-community
doutor reestruturar --preset ts-lib

# Override de categoria
doutor reestruturar --categoria controller=handlers

# Filtros
doutor reestruturar --include "src/**" --exclude "**/*.test.*"
```

### Exemplos

```bash
# Preview de reestruturação
doutor reestruturar --somente-plano --verbose

# Aplicar com preset
doutor reestruturar --preset doutor --auto

# Reestruturar apenas uma pasta
doutor reestruturar --include "src/old-module/**" --auto
```

---

## formatar

Aplica formatação de código com Prettier ou motor interno.

### Uso Básico

```bash
# Verificar formatação
doutor formatar --check

# Aplicar formatação
doutor formatar --write
```

### Opções

```bash
# Escolher motor
doutor formatar --engine auto      # padrão (tenta Prettier, fallback interno)
doutor formatar --engine prettier  # força Prettier
doutor formatar --engine interno   # usa motor interno

# Filtros de arquivos
doutor formatar --include "src/**/*.ts"
doutor formatar --exclude "**/*.generated.*"
```

### Arquivos Suportados

- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`
- Markup: `.html`, `.xml`
- Estilos: `.css`
- Dados: `.json`, `.yaml`, `.yml`
- Documentação: `.md`, `.markdown`
- Outros: `.py`, `.php`

### Exemplos

```bash
# Verificar tudo antes de commit
doutor formatar --check

# Formatar apenas arquivos TypeScript
doutor formatar --write --include "**/*.ts"

# CI: verificar formatação
doutor formatar --check || exit 1
```

---

## otimizar-svg

Otimiza arquivos SVG usando otimizador interno (compatível com svgo).

### Uso Básico

```bash
# Preview sem modificar
doutor otimizar-svg --dry

# Aplicar otimizações
doutor otimizar-svg --write
```

### Opções

```bash
# Diretório específico
doutor otimizar-svg --dir assets/icons

# Filtros
doutor otimizar-svg --include "**/*.svg"
doutor otimizar-svg --exclude "**/node_modules/**"
```

### Exemplos

```bash
# Analisar potencial de otimização
doutor otimizar-svg --dry --verbose

# Otimizar pasta de ícones
doutor otimizar-svg --dir src/assets/icons --write

# Otimizar SVGs específicos
doutor otimizar-svg --include "public/**/*.svg" --write
```

---

## atualizar

Atualiza o Doutor com verificação de integridade prévia via Guardian.

### Uso Básico

```bash
# Atualização local
doutor atualizar

# Atualização global
doutor atualizar --global
```

### Fluxo de Execução

1. Executa análise do projeto
2. Verifica integridade via Guardian
3. Se OK, executa `npm install doutor@latest`
4. Reporta sucesso/falha

### Exemplos

```bash
# Atualização segura
doutor atualizar

# Se Guardian detectar alterações, primeiro aceite:
doutor guardian --diff
doutor guardian --accept-baseline
doutor atualizar
```

---

## reverter

Gerencia o mapa de reversão para operações de reestruturação.

### Subcomandos

```bash
# Listar todos os moves registrados
doutor reverter listar

# Reverter arquivo específico
doutor reverter arquivo <caminho>

# Reverter move por ID
doutor reverter move <id>

# Limpar histórico de reversão
doutor reverter limpar
doutor reverter limpar --force
```

### Exemplos

```bash
# Ver histórico de moves
doutor reverter listar

# Reverter um arquivo movido
doutor reverter arquivo src/new-location/file.ts

# Reverter move específico
doutor reverter move abc123def

# Limpar tudo (cuidado!)
doutor reverter limpar --force
```

---

## histórico

Utilitários globais para gerenciar o histórico de interações do Doutor.

### Flags

```bash
doutor --historico         # Exibe resumo do histórico
doutor --limpar-historico  # Limpa o histórico persistido
```

O histórico é persistido em `~/.doutor/history.json`. Cada execução do CLI registra os argumentos usados.

## 🌍 Variáveis de Ambiente Globais

Aplicam-se a todos os comandos:

```bash
# Performance
export WORKER_POOL_MAX_WORKERS=4
export WORKER_POOL_BATCH_SIZE=10
export WORKER_POOL_TIMEOUT_MS=30000

# Logs
export LOG_ESTRUTURADO=true
export REPORT_SILENCE_LOGS=true
export LOG_LEVEL=info

# Segurança
export SAFE_MODE=true
export ALLOW_PLUGINS=false
export ALLOW_EXEC=false

# Pontuação
export PONTUACAO_MODO=conservador
export PONTUACAO_FATOR_ESCALA=2.0
```

---

## 🎯 Workflows Comuns

### Workflow de Desenvolvimento

```bash
# 1. Análise inicial
doutor diagnosticar --verbose

# 2. Correção de tipos
doutor fix-types --interactive

# 3. Verificação de integridade
doutor guardian --diff

# 4. Limpeza de órfãos
doutor podar --dry-run
doutor podar

# 5. Análise final
doutor diagnosticar --full --export relatorio-final.md
```

### Workflow de CI/CD

```bash
# 1. Build e análise
npm run build
doutor diagnosticar --json --silence > diagnostico.json

# 2. Verificação de integridade
doutor guardian --diff --json > guardian.json

# 3. Métricas
doutor metricas --json > metricas.json

# 4. Análise de performance
doutor perf compare --baseline --json > perf.json
```

### Workflow de Refatoração

```bash
# 1. Snapshot antes
doutor perf snapshot --name "antes-refactor"
doutor guardian

# 2. Fazer mudanças...

# 3. Análise após mudanças
doutor diagnosticar --full
doutor guardian --diff

# 4. Performance comparison
doutor perf compare antes-refactor --json

# 5. Aceitar se OK
doutor guardian --accept
```

---

## 🔧 Troubleshooting

### Erro: "Comando não encontrado"

```bash
# Recompilar
npm run build

# Usar caminho completo
node dist/bin/index.js diagnosticar

# Instalar globalmente
npm install -g .
```

### Erro: "Timeout de análise"

```bash
# Aumentar timeout
doutor diagnosticar --timeout 120

# Via variável
export DOUTOR_ANALISE_TIMEOUT_POR_ANALISTA_MS=120000
doutor diagnosticar
```

### Performance Lenta

```bash
# Reduzir workers
export WORKER_POOL_MAX_WORKERS=1
doutor diagnosticar

# Restringir escopo
doutor diagnosticar --include "src/**" --exclude "**/*.test.*"
```

---

## 📖 Referências

- [README Principal](../README.md)
- [Sistema de Type Safety](TYPE-SAFETY-SYSTEM.md)
- [Filtros Include/Exclude](GUIA_FILTROS_DOUTOR.md)
- [Configuração Local](CONFIGURAR-DOUTOR-LOCAL.md)

---

**Última atualização:** 15 de janeiro de 2026
**Versão:** 0.3.0
