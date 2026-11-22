## Why

O frontend do ERP SaaS ainda não existe. Antes de implementar login, shell ou componentes, é necessário criar a fundação Angular: build, Tailwind, lint, testes, Storybook, CI e entrega. Sem isso, cada feature recriaria padrões e inconsistências.

## What Changes

- Criar o projeto **Angular 21+ standalone** com TypeScript strict.
- Configurar **Tailwind CSS 4**, ESLint, Prettier e `tsconfig` paths.
- Configurar **Jest**, **Playwright** e **Storybook**.
- Criar **estrutura de pastas** (`config`, `core`, `data`, `features`, `layout`, `shared/uw-ui`).
- Criar **ambientes** (`local`, `staging`, `prod`) com `apiUrl`.
- Criar **CI** com lint, typecheck, test, build.
- Criar **Dockerfile multi-stage + nginx** com fallback SPA e headers de segurança.
- Criar app base com rota inicial e página 404.
- Documentar execução local.

## Capabilities

### New Capabilities

- `frontend-scaffold`: app Angular executável, estrutura modular, rota inicial e 404.
- `frontend-configuration`: configuração por ambiente e validação de `apiUrl`.
- `frontend-quality`: lint, typecheck, testes, cobertura e CI.
- `frontend-delivery`: build de produção, Docker/nginx, fallback SPA e headers.

### Modified Capabilities

Nenhuma — não existem specs anteriores.

## Non-goals

- Login e sessão.
- Design system e tokens.
- Componentes `uw-ui`.
- Shell, menu e home.
- Integração com API.
- i18n e acessibilidade.
- Módulos de ERP.

## Impact

- **Novos arquivos:** `package.json`, `angular.json`, `tsconfig*.json`, `eslint.config.js`, `jest.config.ts`, `playwright.config.ts`, `Dockerfile`, `nginx.conf`, `.github/workflows/ci.yml`, `.env.example`.
- **Novos diretórios:** `src/app/{config,core,data,features,layout,shared}`, `src/assets`, `src/environments`, `src/styles`.
- **Dependências:** Angular 21, Tailwind 4, Jest, Playwright, Storybook, ESLint, Prettier.
- **Sistemas externos:** nenhum.
