## 1. Scaffold Angular

- [ ] 1.1 Criar projeto com `ng new` (standalone, routing, scss, strict)
- [ ] 1.2 Fixar versões no `package.json` (Angular 21.x, TypeScript 5.9)
- [ ] 1.3 Configurar `tsconfig` paths (`@core/*`, `@data/*`, `@features/*`, `@layout/*`, `@shared/*`, `@env/*`, `@config/*`)
- [ ] 1.4 Criar estrutura `src/app/{config,core,data,features,layout,shared}`
- [ ] 1.5 Criar rota inicial e página 404
- [ ] 1.6 Verificar `pnpm dev` e `pnpm build`

## 2. Tailwind e estilos base

- [ ] 2.1 Instalar Tailwind CSS 4 e `@tailwindcss/postcss`
- [ ] 2.2 Configurar `styles.css` com `@import "tailwindcss"`
- [ ] 2.3 Configurar `postcss`/`angular.json`
- [ ] 2.4 Criar `src/styles` e `theme.css` vazio (tokens virão depois)
- [ ] 2.5 Validar classes Tailwind em uma tela de exemplo

## 3. Configuração e ambientes

- [ ] 3.1 Criar `src/environments/environment.ts` (local)
- [ ] 3.2 Criar `environment.staging.ts` e `environment.prod.ts`
- [ ] 3.3 Configurar `fileReplacements` no `angular.json`
- [ ] 3.4 Definir `apiUrl`, `tenantHeader`, `requestIdHeader`
- [ ] 3.5 Criar `.env.example` (se necessário)
- [ ] 3.6 Documentar ambientes no README

## 4. Lint e formatação

- [ ] 4.1 Configurar ESLint (Angular + TypeScript)
- [ ] 4.2 Configurar Prettier
- [ ] 4.3 Adicionar regra de `no-explicit-any`
- [ ] 4.4 Adicionar scripts `lint`, `format`, `typecheck`
- [ ] 4.5 Validar `pnpm lint` e `pnpm typecheck`

## 5. Testes

- [ ] 5.1 Configurar Jest + `jest-preset-angular`
- [ ] 5.2 Criar `setup-jest.ts`
- [ ] 5.3 Criar teste de app component
- [ ] 5.4 Configurar Playwright
- [ ] 5.5 Criar E2E de fumaça (app carrega e 404)
- [ ] 5.6 Configurar cobertura
- [ ] 5.7 Validar `pnpm test` e `pnpm e2e`

## 6. Storybook

- [ ] 6.1 Configurar Storybook para Angular
- [ ] 6.2 Criar story de exemplo
- [ ] 6.3 Adicionar scripts `storybook` e `build-storybook`
- [ ] 6.4 Validar build do Storybook

## 7. CI

- [ ] 7.1 Criar workflow de CI
- [ ] 7.2 Configurar cache pnpm
- [ ] 7.3 Rodar install, lint, typecheck, test e build
- [ ] 7.4 Rodar E2E em job separado (opcional)
- [ ] 7.5 Publicar artefato de build
- [ ] 7.6 Proteger branch principal

## 8. Docker/nginx

- [ ] 8.1 Criar `Dockerfile` multi-stage (Node 22 → nginx)
- [ ] 8.2 Criar `nginx.conf` com fallback SPA
- [ ] 8.3 Configurar headers de segurança
- [ ] 8.4 Configurar cache de assets com hash
- [ ] 8.5 Criar `.dockerignore`
- [ ] 8.6 Validar `docker build` e execução local

## 9. Documentação e validação final

- [ ] 9.1 Atualizar `README.md` com pré-requisitos e scripts
- [ ] 9.2 Documentar estrutura de pastas
- [ ] 9.3 Documentar ambientes e deploy
- [ ] 9.4 Rodar `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- [ ] 9.5 Rodar `openspec validate bootstrap-frontend --strict`
- [ ] 9.6 Revisar segredos e `any`
- [ ] 9.7 Atualizar `tasks.md` marcando todas as tarefas concluídas
