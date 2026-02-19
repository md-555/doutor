---
Proveniência e Autoria: Este documento integra o projeto Sensei (licença MIT).
Nada aqui implica cessão de direitos morais/autorais.
Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.
---


# Plano de Desacoplamento - Projeto Sensei

Este documento descreve o diagnóstico atual de acoplamento do projeto e as estratégias propostas para tornar a arquitetura mais modular, testável e extensível.

## 1. Diagnóstico do Estado Atual

### 1.1 Acoplamento Core ➔ Analistas (Violação de DIP)

O motor de execução (`src/core/execution/inquisidor.ts`) importa diretamente o registro global de analistas. Isso cria uma dependência circular conceitual onde o núcleo do sistema conhece todas as suas extensões específicas.

### 1.2 Registro Centralizado ("God Registry")

O arquivo `src/analistas/registry/registry.ts` atua como um gargalo. A adição de qualquer novo analista exige a modificação manual deste arquivo, o que fere o Princípio do Aberto/Fechado (Open/Closed).

### 1.3 Acoplamento de Mensagens e Internacionalização

Os detectores importam classes de mensagens específicas (ex: `DetectorArquiteturaMessages`), acoplando a lógica de detecção à representação visual/textual dos erros.

### 1.4 Dependência de Estado Global (Config)

Muitos módulos dependem diretamente do singleton `config`, dificultando a injeção de configurações variadas durante testes unitários.

---

## 2. Estratégias de Desacoplamento

### 2.1 Inversão de Controle (IoC) no Motor

- **Ação:** Refatorar `iniciarInquisicao` para receber a lista de `Tecnica[]` como argumento.
- **Responsabilidade:** A camada de CLI ou o ponto de entrada da aplicação deve orquestrar quais analistas carregar e passar para o Core.

### 2.2 Sistema de Autodiscovery de Plugins

- **Ação:** Implementar um carregamento dinâmico baseado em sistema de arquivos ou convenção de nomes.
- **Resultado:** Novos analistas podem ser adicionados à pasta `plugins` e serão detectados automaticamente sem alterar o código do registro.

### 2.3 Abstração de Notificações (Reporter Pattern)

- **Ação:** Introduzir uma interface de `Reporter` que é passada para os analistas via contexto.
- **Mudança:** Em vez de `log.erro(Mensagem.x)`, o analista fará `contexto.report({ tipo: 'erro', code: 'X101', data: { ... } })`.

### 2.4 Comunicação Baseada em Eventos

- **Ação:** Fazer com que o `Executor` emita eventos (`file:processed`, `analysis:complete`) usando um `EventEmitter`.
- **Benefício:** Permite que diferentes frontends (CLI, Web, VSCode Extension) reajam ao progresso sem que o Core saiba quem os está observando.

---

## 3. Próximos Passos Sugeridos

1. **Sprint 1:** Refatorar `inquisidor.ts` para usar Injeção de Dependência.
2. **Sprint 2:** Implementar o Loader dinâmico para a pasta de plugins.
3. **Sprint 3:** Migrar os detectores para o novo modelo de mensagens via contexto.

---
*Documento gerado em 18/02/2026 como base para evolução arquitetural.*
