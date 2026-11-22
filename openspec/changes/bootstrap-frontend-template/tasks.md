# Tasks — Bootstrap Frontend Template

## 1. Preparação do repositório

- [x] 1.1 Criar a branch da change (`feat/bootstrap-frontend-template`) e confirmar que o working tree contém apenas as remoções intencionais do seed ERP.
- [x] 1.2 Commitar a remoção do seed ERP (docs, apps, AGENTS.md e changes antigas), preservando `openspec/`, `.opencode/` e `adr/`.
- [x] 1.3 Atualizar `.gitignore`, `.gitattributes`, `.prettierignore` e `.editorconfig` para o novo workspace.

## 2. Workspace e configuração base

- [x] 2.1 Inicializar o workspace Angular 21+ com pnpm, TypeScript strict e sem aplicação inicial.
- [x] 2.2 Gerar o app `apps/frontend` com roteamento e estilo SCSS.
- [x] 2.3 Gerar as libs `libs/tokens`, `libs/uw-ui`, `libs/core`, `libs/data` e `libs/i18n` como source-mapped.
- [x] 2.4 Configurar os aliases `@app/*` nos `tsconfig` e validar que os imports entre app e libs resolvem.
- [x] 2.5 Configurar Tailwind CSS 4 no app, com `@source` apontando para as libs e para as histórias.
- [x] 2.6 Configurar ESLint flat config, Prettier e a regra `no-restricted-imports` da fronteira da `uw-ui`.
- [x] 2.7 Configurar Jest + `jest-preset-angular` por projeto e um teste de fumaça em cada lib.
- [x] 2.8 Configurar Playwright no app com projeto de navegador desktop e viewport mobile.
- [x] 2.9 Configurar Storybook em `libs/uw-ui` com build estático e addon de docs.
- [x] 2.10 Criar os ambientes (`local`, `staging`, `production`) com `apiUrl` e validação fail-fast da configuração.
- [x] 2.11 Criar o esqueleto de `libs/core` (auth, sessão, erros, interceptors) com contratos e testes de fumaça.
- [x] 2.12 Criar o esqueleto de `libs/data` (models e um repository de exemplo) com teste usando `HttpTestingController`.
- [x] 2.13 Criar a rota inicial de exemplo, a página 404 e o container que demonstra loading, empty, error e success.
- [x] 2.14 Escrever o teste de componente do container da rota inicial (sucesso e erro).
- [x] 2.15 Validar que `lint`, `typecheck`, `test` e `build` passam em app e libs antes de seguir.

## 3. Design system e tokens

- [x] 3.1 Portar `palette.css` e `colors.css` para `libs/tokens`, removendo tokens específicos de domínio.
- [x] 3.2 Portar `typography.css`, `borders.css` e `theme.css`, mantendo a arquitetura palette → semânticos.
- [x] 3.3 Self-hostar as fontes display/body/mono e o Material Symbols em `libs/tokens/src/assets/fonts/`.
- [x] 3.4 Documentar tokens, tipografia, layout, espaçamento e componentes em `docs/design/design-system.md`, sem duplicar CSS.
- [x] 3.5 Criar `docs/design/design-tokens.md` com nomes, uso e links para os arquivos de código.
- [x] 3.6 Verificar contraste mínimo 4.5:1 dos pares texto/superfície e registrar o resultado na documentação.
- [x] 3.7 Adicionar uma história que demonstra a troca de palette (rebranding) sem editar componentes.

## 4. Fundação da biblioteca uw-ui

- [x] 4.1 Inventariar os componentes do projeto de referência e classificar cada um nas faixas A, B ou C definidas no ADR-0012.
- [x] 4.2 Copiar a estrutura base da Faixa A (ts, html, scss, spec, stories) preservando o commit de origem no README do template.
- [x] 4.3 Renomear os seletores legados `app-*` para `uw-*` conforme a tabela do design (breadcrumb, header, sidebar, subheader, badge, perfil-badge, status-badge).
- [x] 4.4 Normalizar standalone, `OnPush` e `ViewEncapsulation.None`, com estilos namespaced por `.uw-<nome>`.
- [x] 4.5 Refatorar o layout administrativo para presentational (inputs/outputs) e mover o shell para `apps/frontend/src/app/layout/`.
- [x] 4.6 Criar `docs/design/uw-ui-catalog.md` com componente, selector, faixa e link para a história.
- [x] 4.7 Rodar o lint de fronteira e garantir zero imports de `core`, `data`, `i18n` ou features dentro de `uw-ui`.

## 5. Componentes da Faixa A — formulários

- [x] 5.1 Portar os componentes básicos de formulário (button, input, checkbox, radio-group, textarea, toggle, toggle-card, form-field, search-field).
- [x] 5.2 Criar histórias de todas as variantes e estados dos formulários básicos.
- [x] 5.3 Escrever os testes unitários e de componente dos formulários básicos, com cobertura de 100% em diretivas e pipes.
- [x] 5.4 Portar os componentes avançados de formulário (select, autocomplete, date-picker, input-tag, pick-list, slider, rating, otp-input, select-button-group, file-upload).
- [x] 5.5 Criar histórias de variantes, teclado e estados dos formulários avançados.
- [x] 5.6 Escrever os testes dos formulários avançados, incluindo navegação por teclado e anúncio de erro.

## 6. Componentes da Faixa A — dados e feedback

- [x] 6.1 Portar os componentes de dados (card, table, pagination, stat-card, chart-card, chart-legend, progress-bar, progress-track, timeline, status-badge, divider, section-heading, page-header, image, doc-viewer, badge, chip, tag, avatar, avatar-group).
- [x] 6.2 Criar histórias dos componentes de dados, incluindo tabela vazia, carregando e com erro.
- [x] 6.3 Escrever os testes dos componentes de dados, incluindo `uw-table` (ordenação, busca e paginação).
- [x] 6.4 Portar os componentes de feedback e utilidade (alert, empty-state, skeleton, spinner, toast, confirmation, copy-field, help, icon, language-switcher e diretivas).
- [x] 6.5 Criar histórias dos componentes de feedback e utilidade, com loading, empty, error e success.
- [x] 6.6 Escrever os testes dos componentes de feedback, incluindo foco do modal e ação de retry do toast.

## 7. Componentes da Faixa A — navegação e layout

- [x] 7.1 Portar os componentes de navegação e layout (tabs, accordion, stepper, breadcrumb, export-menu, filter-pills, action-card, panel, drawer, modal, popover, tooltip).
- [x] 7.2 Criar histórias dos componentes de navegação e layout, incluindo responsividade e teclado.
- [x] 7.3 Escrever os testes dos componentes de navegação e layout, incluindo Escape, foco e drawer full-screen.
- [x] 7.4 Revisar acessibilidade de todos os componentes da Faixa A (teclado, foco, ARIA, contraste) e registrar pendências.

## 8. Faixa B e exclusões

- [x] 8.1 Documentar em `docs/design/uw-ui-extending.md` as receitas opt-in de `html-editor` (Quill) e `scheduler` (rrule).
- [x] 8.2 Garantir que os componentes da Faixa B não estejam no `package.json` nem no bundle padrão.
- [x] 8.3 Registrar a lista da Faixa C (domínio) e validar que nenhum arquivo correspondente foi copiado.

## 9. Agentes, skills e orquestração

- [x] 9.1 Copiar os agentes `frontend`, `design`, `testing`, `security`, `requirements` e `architect` para `.agents/`.
- [x] 9.2 Copiar as skills de frontend, design system, `uw-ui`, Angular, prototipação, testes, qualidade, segurança, specs e ADRs.
- [x] 9.3 Genericizar agentes e skills, removendo referências a produto, domínio de eventos, ERP e caminhos antigos.
- [x] 9.4 Criar a skill `domain-context` como placeholder que lê `docs/domain/` e orienta o preenchimento.
- [x] 9.5 Criar `docs/domain/README.md` explicando como documentar o domínio do próximo produto.
- [x] 9.6 Escrever `AGENTS.md` com tabela de agentes, mapa de skills, fluxo de delegação e regra de arquivos separados de componente.
- [x] 9.7 Validar que toda skill referenciada no frontmatter dos agentes existe no repositório.

## 10. Constituição e configuração do template

- [x] 10.1 Reescrever `openspec/project.md` de forma genérica, sem apps fixos, produto ou modelo de tenancy.
- [x] 10.2 Adicionar a seção “Especificação do Frontend” com os placeholders de produto, domínio, público, módulos, identidade, API, idiomas e requisitos regulatórios.
- [x] 10.3 Reescrever `openspec/config.yaml` com contexto e regras genéricas para proposal, specs, design e tasks.
- [x] 10.4 Investigar e eliminar o aviso `Rules for 'tasks' must be an array of strings`; se for bug do CLI, registrar issue e documentar o contorno.
- [x] 10.5 Validar que todos os links internos de `project.md`, `config.yaml` e `AGENTS.md` apontam para arquivos existentes.
- [x] 10.6 Garantir que os artefatos do OpenSpec permanecem em pt-BR e seguem o schema `intent-driven`.

## 11. i18n e acessibilidade baseline

- [x] 11.1 Configurar `@ngx-translate/core` em `libs/i18n` com catálogos pt-BR, en e es.
- [x] 11.2 Criar as chaves base de ações, navegação, estados e erros comuns.
- [x] 11.3 Integrar o `uw-language-switcher` ao app e persistir a preferência de idioma.
- [x] 11.4 Adicionar teste que falha quando uma chave usada não existe no catálogo padrão.
- [x] 11.5 Adicionar testes de teclado, foco visível e contraste para a rota inicial e a página 404.

## 12. Qualidade, CI e entrega

- [x] 12.1 Configurar as metas de cobertura por camada (80% core/data, 70% features, 100% shared pipes/directives).
- [x] 12.2 Criar o pipeline de CI com lint, typecheck, test, build e build do Storybook.
- [x] 12.3 Criar `Dockerfile` multi-stage com runtime nginx.
- [x] 12.4 Configurar `nginx.conf` com fallback SPA, cache de assets e headers de segurança.
- [x] 12.5 Escrever o `README.md` do template com pré-requisitos, comandos, estrutura e commit de origem do projeto de referência.

## 13. Validação final

- [x] 13.1 Executar `lint`, `typecheck`, `test` e `build` em cada projeto afetado e corrigir falhas.
- [x] 13.2 Executar o build do Storybook e verificar que todos os componentes da Faixa A têm história.
- [x] 13.3 Construir a imagem Docker e validar o fallback de SPA e os headers de segurança.
- [x] 13.4 Executar `openspec validate bootstrap-frontend-template --strict` e corrigir qualquer inconsistência.
- [x] 13.5 Revisar a documentação final e confirmar que a seção de especificação do frontend permanece em aberto.

## 14. E2E

- [x] 14.1 Escrever o teste E2E da rota inicial (carregamento, sucesso e ação de retry).
- [x] 14.2 Escrever o teste E2E da página 404 e da navegação de volta.
- [x] 14.3 Executar a suíte E2E em viewport desktop e mobile e corrigir falhas.
