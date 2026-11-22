## 1. Preparação e decisões

- [x] 1.1 Confirmar com o time se o mock de demonstração exige ADR-0016 complementar ao ADR-0014 (recomendado) ou se o ADR-0014 deve ser supersedido; registrar a decisão antes de implementar a autenticação.
- [x] 1.2 Validar os protótipos `docs/design/prototypes/login/` e `docs/design/prototypes/shell-home/` (screenshot, código e README) e registrar a aprovação.
- [x] 1.3 Confirmar as questões abertas do design: exibição das credenciais demo e comportamento dos itens de menu sem rota.
- [x] 1.4 Revisar os componentes `uw-ui` existentes e confirmar que nenhum componente novo é necessário.

## 2. Tipos e contratos

- [x] 2.1 Criar `LoginCredentials` e a interface `LoginRepository` com token `LOGIN_REPOSITORY` em `features/login/data/`.
- [x] 2.2 Criar `login.mock-fixtures.ts` com as credenciais de demonstração, o usuário mockado e a mensagem de erro tipada, reutilizando `SessionUser` de `@app/core`.
- [x] 2.3 Revisar `SessionUser` em `libs/core` e definir no shell a derivação de papel traduzido e iniciais a partir da sessão.
- [x] 2.4 Definir os modelos de dados da home (`DashboardMetric`, `ActivityItem`, `HomeState`) e reutilizar `UwNavItem`/`BreadcrumbItem` para o shell.

## 3. Repositório mock, sessão e guard

- [x] 3.1 Implementar `MockLoginRepository` com latência simulada, validação das credenciais e erro tipado.
- [x] 3.2 Adicionar `authGuard` em `libs/core/src/lib/auth/auth.guard.ts` e exportá-lo em `libs/core/src/public-api.ts`.
- [x] 3.3 Escrever testes unitários do `MockLoginRepository` (sucesso, credenciais inválidas, latência/erro).
- [x] 3.4 Escrever testes unitários do `authGuard` (com e sem sessão).

## 4. Login

- [x] 4.1 Criar `LoginPageComponent` standalone com `templateUrl`/`styleUrl`, Reactive Forms e provider do `LOGIN_REPOSITORY`.
- [x] 4.2 Implementar validação de e-mail/senha, estado de carregamento, bloqueio de envio duplicado e foco no primeiro campo inválido.
- [x] 4.3 Implementar erro de credenciais com `uw-alert variant="danger"` e `role="alert"`, mantendo o usuário em `/login`.
- [x] 4.4 Implementar o sucesso: `AuthService.setSession`, toast e navegação para `/` com `replaceUrl`.
- [x] 4.5 Redirecionar usuários já autenticados que acessarem `/login` para a home.
- [x] 4.6 Montar o template com `uw-form-field`, `uw-input`, `uw-button`, `uw-alert`, `uw-spinner` e `uw-language-switcher`, incluindo o hint de credenciais demo.
- [x] 4.7 Aplicar estilos e responsividade do protótipo sem hardcoded colors, usando tokens do design system.
- [x] 4.8 Escrever testes de componente do login (campos obrigatórios, e-mail inválido, loading, credenciais inválidas e sucesso).

## 5. Shell

- [x] 5.1 Criar `AppShellLayoutComponent` com `uw-admin-layout` e `router-outlet`, calculando usuário, título, breadcrumb e notificações a partir da sessão e da rota.
- [x] 5.2 Criar o menu mockado (`shell-menu.mock.ts`) e o mapa de breadcrumbs, cobrindo itens reais e itens de demonstração.
- [x] 5.3 Implementar a navegação: rotas reais via `Router` e itens sem rota com toast informativo.
- [x] 5.4 Implementar a interação com notificações (toast com contagem) e o estado de sidebar recolhida.
- [x] 5.5 Implementar logout: limpar sessão, exibir toast e navegar para `/login`.
- [x] 5.6 Escrever testes de componente do shell (mapeamento de inputs, navegação, item demo, notificações e logout).

## 6. Home

- [x] 6.1 Criar `HomeDashboardService` com fixtures determinísticas, latência simulada, estado `loading|success|empty|error` e suporte a `?state=empty|error`.
- [x] 6.2 Implementar o estado de sucesso da home com `uw-page-header`, 4 `uw-stat-card`, atividades recentes e progresso.
- [x] 6.3 Implementar o estado de carregamento com `uw-skeleton`, preservando o shell navegável.
- [x] 6.4 Implementar o estado vazio com `uw-empty-state` e o estado de erro com `uw-alert` + ação de tentar novamente.
- [x] 6.5 Implementar as ações demonstrativas (ação primária e itens de atividade) com toast, sem alterar dados.
- [x] 6.6 Adicionar `aria-live` para anunciar mudanças de estado da home.
- [x] 6.7 Escrever testes unitários do `HomeDashboardService` (loading, success, empty, error e retry).
- [x] 6.8 Escrever testes de componente da home para os quatro estados.

## 7. Rotas

- [x] 7.1 Reestruturar `apps/frontend/src/app/app.routes.ts` com shell protegido por `authGuard`, rota `/login` lazy, home filha lazy e rotas `404`/`**`.
- [x] 7.2 Remover a rota pública antiga da home e garantir que a página atual seja reaproveitada dentro do shell.
- [x] 7.3 Verificar títulos de rota, fallback de breadcrumb e navegação direta para `/login` e `/`.

## 8. i18n

- [x] 8.1 Adicionar as chaves `login.*`, `shell.*` e `home.*` em `libs/i18n/src/lib/i18n/pt-br.json`.
- [x] 8.2 Adicionar as mesmas chaves em `en.json`.
- [x] 8.3 Adicionar as mesmas chaves em `es.json`.
- [x] 8.4 Estender o teste de paridade dos catálogos para cobrir as novas chaves.
- [x] 8.5 Substituir qualquer string visível hardcoded nas telas novas e validar a troca de idioma.

## 9. Design system, acessibilidade e responsividade

- [x] 9.1 Comparar a implementação com os protótipos e o `design-system.md`, corrigindo divergências de espaçamento, tipografia e raios.
- [x] 9.2 Revisar acessibilidade: labels/`aria-*`, `role="alert"`, foco visível, ordem de tabulação, contraste e alvos de toque.
- [x] 9.3 Validar responsividade em desktop, entre 900 e 640 px e abaixo de 640 px, incluindo o drawer da sidebar.
- [x] 9.4 Confirmar que nenhum componente de `libs/uw-ui` foi alterado; se algum for alterado, criar/atualizar a história no Storybook.
- [x] 9.5 Atualizar `docs/design/accessibility-review.md` com o resultado da revisão das telas novas.

## 10. E2E

- [x] 10.1 Criar E2E de rota protegida: acessar `/` sem sessão redireciona para `/login`.
- [x] 10.2 Criar E2E de credenciais inválidas: permanece em `/login` e exibe erro.
- [x] 10.3 Criar E2E do fluxo crítico: login válido → home → logout → `/login`.
- [x] 10.4 Criar E2E de recarregamento: sessão em memória é perdida e o usuário volta ao login.
- [x] 10.5 Padronizar `data-testid` estáveis para campos, botões e estados usados nos testes.

## 11. Qualidade e fechamento

- [x] 11.1 Executar `pnpm lint` e corrigir os problemas.
- [x] 11.2 Executar `pnpm typecheck` e corrigir os erros de tipos.
- [x] 11.3 Executar `pnpm test` e garantir a cobertura mínima das camadas afetadas.
- [x] 11.4 Executar `pnpm build` e validar o build de produção.
- [x] 11.5 Executar o build do Storybook para garantir que nenhuma história foi quebrada.
- [x] 11.6 Executar `openspec validate add-mock-login-shell-home --strict` e corrigir eventuais inconsistências.
- [x] 11.7 Revisar o Definition of Done (i18n, acessibilidade, responsividade) e atualizar a documentação necessária.

## Notas de implementação

- **Credenciais demo:** `demo@frontend.dev` / `demo1234`; sessão apenas em memória.
- **ADR:** `adr/0016-mock-de-autenticacao-de-demonstracao.md` registrado como complementar ao ADR-0014.
- **Rotas:** `/login` (pública, lazy), `/` (shell protegido por `authGuard`, home lazy), `/404` e `**`.
- **Testes:** `pnpm test` → 74 suítes / 720 testes verdes; E2E Playwright → 20 testes verdes (desktop e mobile).
- **Cobertura:** `libs/core` e `apps/frontend/src/app/features` atendem aos thresholds. O threshold global de branches permanece em 43,21% (mínimo 60%) por componentes `uw-ui` sem teste — condição pré-existente, fora do escopo desta change.
- **Limitações documentadas:** `uw-input` não expõe `id`/`aria-describedby`; o drawer mobile da `uw-admin-layout` não prende foco nem fecha com `Escape`; `uw-header` não tem painel de notificações. Registradas em `docs/design/accessibility-review.md`.

