## Why

O template já possui a fundação (tokens, `uw-ui`, `libs/core`, `libs/data`, i18n), mas ainda não tem nenhuma tela que prove o fluxo completo de ponta a ponta. Sem um exemplo funcional de autenticação e shell, cada novo produto recomeça a integração entre rotas, guard, layout, menu e i18n — e o `uw-admin-layout` permanece sem um consumidor real que valide seus inputs e estados. Esta change entrega um login de exemplo (e-mail e senha, dados mockados) e um shell-home equivalente ao do projeto `congresso`, servindo de referência executável para os próximos frontends.

## What Changes

- **BREAKING** — A rota `/` deixa de ser uma página pública de demonstração e passa a ser a home autenticada dentro do shell. A página atual vira conteúdo do shell.
- Criar a feature `login` em `apps/frontend/src/app/features/login/` com formulário de **apenas e-mail e senha**, validação de campos obrigatórios, estado de carregamento, erro de credenciais inválidas e redirecionamento para a home.
- Criar o shell do produto em `apps/frontend/src/app/layout/` envolvendo as rotas autenticadas com `<router-outlet />`, usando `uw-admin-layout` (sidebar de 240px colapsável, header com perfil e notificações mockadas, subheader com breadcrumb).
- Adicionar autenticação **mockada** (sem backend, sem token em `localStorage`/`sessionStorage`): credenciais de exemplo, sessão em memória via signals e `authGuard` redirecionando usuários não autenticados para `/login`.
- Adicionar menu de navegação mockado (itens e badges fixos) e dados mockados da home (cartões de resumo, lista de atividades, notificações), seguindo o padrão de mock já usado no template (`signal` + latência simulada).
- Reaproveitar os componentes existentes de `uw-ui` (`uw-admin-layout`, `uw-input`, `uw-button`, `uw-alert`, `uw-card`, `uw-toast`, `uw-language-switcher`, `uw-profile-badge`), sem criar componentes de UI paralelos.
- Internacionalizar todas as strings novas nos três catálogos (`pt-br`, `en`, `es`).
- Registrar o protótipo da tela em `docs/design/prototypes/shell-home/` conforme o fluxo obrigatório do design system.
- Cobrir o fluxo crítico com testes unitários (auth mockado e guard), testes de componente (login, shell, home) e E2E (login → home → logout).

## Escopo

- **Apps:** `apps/frontend` (app `frontend`)
- **Libs:** `core` (sessão/guard), `i18n` (catálogos); `uw-ui` e `tokens` apenas como consumidos, sem alteração prevista; `data` não é usado nesta change porque os dados são mockados na própria feature
- **Capabilities:** `frontend-mock-login`, `frontend-shell-home`
- **Telas:** login (`/login`) e home dentro do shell (`/`)
- **Rotas:** `/login` (pública), `/` (protegida pelo `authGuard`), `/404`, `**`
- **Componentes:** `LoginPageComponent`, `AppShellLayoutComponent`, `HomePageComponent`, `MockAuthRepository`/`MockAuthService`, `authGuard`, `MockMenuService`

## Capabilities

### New Capabilities

- `frontend-mock-login`: fluxo de autenticação de exemplo com e-mail e senha, credenciais mockadas, validação, estados de carregamento/erro/sucesso, sessão em memória e proteção de rotas.
- `frontend-shell-home`: shell autenticado com sidebar, header, notificações, breadcrumb e área de conteúdo, incluindo a home com dados mockados, navegação por menu e logout.

### Modified Capabilities

- Nenhuma. `project-constitution` permanece com a seção “Especificação do Frontend” em aberto: esta change é um **exemplo de template**, não a definição de um produto real.

## Impact

- **Código afetado:** `apps/frontend/src/app/app.routes.ts` (rotas lazy + guard), `features/login/**` (novo), `layout/**` (novo), `features/home/**` (reaproveitada como conteúdo do shell), `libs/core/src/lib/auth/**` (extensão do `AuthService` e guard), `libs/i18n/src/lib/i18n/{pt-br,en,es}.json`.
- **Design system:** reutiliza `uw-admin-layout` e seus inputs (`menuItems`, `bottomItems`, `breadcrumb`, `user`, `unreadCount`, `collapsed`, `navigate`, `logout`); nenhum novo componente `uw-ui` está previsto. Protótipo obrigatório em `docs/design/prototypes/shell-home/`.
- **Auth:** **sim** — autenticação simulada em memória, sem chamadas HTTP, sem JWT e sem persistência de token. Substituível por um repositório HTTP em uma change futura.
- **Tenancy:** **não** afetado.
- **i18n:** **sim** — todas as strings novas nos catálogos pt-BR/en/es.
- **Acessibilidade:** **sim** — WCAG 2.1 AA: labels associados, foco visível, navegação por teclado no menu e no formulário, contraste, `aria-*` no menu/notificações e respeito a `prefers-reduced-motion`.
- **Dependências:** nenhuma nova dependência de runtime.
- **APIs/backend:** nenhuma. Os dados são mockados e isolados atrás de uma interface de repositório.
- **Risco principal:** o shell do congresso é fortemente acoplado ao domínio de eventos; o porte deve manter apenas a estrutura visual e comportamental (sidebar/header/subheader), com menu e conteúdo neutros.

## Non-goals

- Backend real, endpoints de autenticação, JWT, refresh token ou cookies.
- Persistência de sessão entre recarregamentos da página.
- Recuperação de senha, cadastro de usuário, MFA ou seleção de perfil/organização.
- Permissões por papel, multi-tenancy ou rotas administrativas reais.
- Telas de negócio (eventos, financeiro, participantes) ou seus contratos de API.
- Criar ou alterar componentes em `libs/uw-ui` e novas histórias no Storybook.
- Preencher a seção 13 de `openspec/project.md` (template permanece genérico).
- Migrar o layout ou o domínio do projeto `congresso`.
