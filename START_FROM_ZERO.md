# START FROM ZERO — Novo Frontend SaaS (Angular)

> Guia operacional para sair do zero: criar a pasta do projeto, inicializar o Git, copiar o seed OpenSpec, configurar o ambiente e implementar as changes na ordem correta.
>
> **Importante:** este documento é um roteiro. Ele **não implementa** o projeto. A implementação é feita pelo OpenSpec/agente, change por change.

---

## 0. Visão geral

O ponto de partida é a pasta `front/` do repositório `old_erp/uw_api`. Ela contém:

- `openspec/project.md` — constituição do frontend;
- `openspec/config.yaml` — schema `intent-driven`;
- `openspec/schemas/intent-driven/` — schema/templates;
- 7 changes: `bootstrap-frontend`, `design-system-foundation`, `component-library-core`, `auth-login-flow`, `app-shell-home`, `api-integration`, `i18n-accessibility`;
- `AGENTS.md` — orquestrador e subagentes;
- `.agents/skills/` — skills copiadas/adaptadas do congresso;
- `adr/` — 9 ADRs iniciais;
- `docs/` — design system, tokens, inventário de componentes, login/shell, contrato de API, briefing.

O objetivo é copiar esse conteúdo para um **repositório novo**, separado do backend, e implementar as changes em ordem.

---

## 1. Pré-requisitos

| Ferramenta | Versão | Como verificar |
|---|---|---|
| Git | 2.40+ | `git --version` |
| Node.js | **22 LTS** | `node --version` |
| pnpm | 11.x | `pnpm --version` |
| Angular CLI | 21.x | `ng version` |
| OpenSpec CLI | conforme seu ambiente | `openspec --version` |
| Docker Desktop | opcional | `docker --version` |
| Editor | VS Code / IntelliJ | — |

> Verifique o ambiente antes de começar. Se `node`, `pnpm` ou `ng` não existirem, instale e reabra o terminal.

Instalação do pnpm (se necessário):

```powershell
npm install -g pnpm@11
```

Angular CLI (se necessário):

```powershell
npm install -g @angular/cli@21
```

---

## 2. Criar a pasta nova

```powershell
$root = "C:\Rodrigo\Projetos\erp_saas_frontend"
New-Item -ItemType Directory -Force -Path $root
Set-Location $root
```

Sugestões de nome:

- `erp_saas_frontend`
- `uw_erp_saas_web`
- `erp-web`

> Não crie dentro de `old_erp/uw_api`. O frontend deve ser um repositório independente.

---

## 3. Copiar o seed para a pasta nova

Copie **o conteúdo** de `front/`, não a pasta em si:

```powershell
$seed = "C:\Rodrigo\Projetos\old_erp\uw_api\front"
Copy-Item -Path (Join-Path $seed '*') -Destination $root -Recurse -Force
```

Verifique:

```powershell
Get-ChildItem -Force
```

Esperado:

```text
AGENTS.md
README.md
START_FROM_ZERO.md
adr/
docs/
openspec/
.agents/
```

Verifique as changes:

```powershell
Get-ChildItem openspec\changes -Directory
```

Esperado:

```text
bootstrap-frontend
design-system-foundation
component-library-core
auth-login-flow
app-shell-home
api-integration
i18n-accessibility
```

---

## 4. Inicializar o Git

```powershell
git init -b main
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

Crie o `.gitignore`:

```gitignore
# Node
node_modules/
dist/
.angular/
coverage/
*.tsbuildinfo

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# IDE
.idea/
.vscode/
*.iml

# Ambiente e segredos
.env
.env.*
!.env.example

# Sistema
.DS_Store
Thumbs.db

# Playwright / Storybook
playwright-report/
test-results/
storybook-static/
```

Crie o `.gitattributes`:

```gitattributes
* text=auto eol=lf
*.cmd text eol=crlf
*.bat text eol=crlf
```

Primeiro commit:

```powershell
git add .
git commit -m "chore: initial OpenSpec seed for ERP SaaS frontend"
```

Opcional:

```powershell
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

---

## 5. Ajustar a identidade do projeto

Personalize:

1. **Nome do produto** em `openspec/project.md` e `README.md`.
2. **Marca** em `docs/design-system.md` e tokens de cor (se necessário).
3. **Domínio/API** em `docs/api-contract.md`.
4. **Nome do repositório**.

Busque referências ao congresso:

```powershell
Get-ChildItem -Recurse -File -Include *.md,*.yaml,*.yml |
  Select-String "UltraEventos|Ultra Eventos|congresso"
```

> Referências ao congresso em `docs/reuse-map.md`, `docs/design-system.md` e skills são esperadas como documentação de origem. Adapte a narrativa de marca, não os caminhos de referência.

Commit:

```powershell
git add .
git commit -m "docs: customize frontend identity"
```

---

## 6. Validar o OpenSpec

```powershell
openspec --version
```

Valide as changes:

```powershell
openspec validate bootstrap-frontend --strict
openspec validate design-system-foundation --strict
openspec validate component-library-core --strict
openspec validate auth-login-flow --strict
openspec validate app-shell-home --strict
openspec validate api-integration --strict
openspec validate i18n-accessibility --strict
```

Se `openspec` não existir:

- instale o CLI;
- confirme `schema: intent-driven` em `openspec/config.yaml`;
- confirme `openspec/schemas/intent-driven/`;
- compare com o projeto `congresso`.

---

## 7. Implementar as changes (ordem obrigatória)

> **Regra de ouro:** não avance para a próxima change enquanto a atual não estiver com `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build` verdes, tasks concluídas e `openspec validate <change> --strict` passando.

### 7.1 Ciclo de cada change

1. Leia `AGENTS.md` e `openspec/project.md`.
2. Leia `proposal.md`, `design.md`, `tasks.md` e `specs/`.
3. Crie a branch:

   ```powershell
   git checkout -b feat/<change>
   ```

4. Peça ao agente/OpenSpec para aplicar a change.
5. Implemente as tasks em ordem.
6. Rode:

   ```powershell
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

7. Atualize `tasks.md`.
8. Valide:

   ```powershell
   openspec validate <change> --strict
   ```

9. Commit e PR:

   ```powershell
   git add .
   git commit -m "feat(<change>): implement <resumo>"
   git push -u origin feat/<change>
   ```

10. Após o merge, arquive a change:

    ```powershell
    openspec archive <change>
    ```

### 7.2 Ordem e critérios de saída

| # | Change | Branch | Objetivo | Critérios de saída |
|---|---|---|---|---|
| 1 | `bootstrap-frontend` | `feat/bootstrap-frontend` | Scaffold Angular, Tailwind, lint, Jest, Playwright, Storybook, CI, Docker | `pnpm build` verde; app sobe; Storybook sobe; CI verde |
| 2 | `design-system-foundation` | `feat/design-system-foundation` | Tokens, tipografia, layout, tema, docs | tokens aplicados; sem cor hardcoded; Storybook docs |
| 3 | `component-library-core` | `feat/component-library-core` | Componentes `uw-ui` essenciais + ERP | componentes com testes e stories; a11y |
| 4 | `auth-login-flow` | `feat/auth-login-flow` | Login, sessão, refresh, guards, contexto, reset | login e2e; refresh; contexto; erros |
| 5 | `app-shell-home` | `feat/app-shell-home` | Shell, menu, rotas, home, 403/404 | shell renderiza; menu; home; erros |
| 6 | `api-integration` | `feat/api-integration` | Repositories, interceptors, erros, paginação | contrato; 401/403/422/429/500; testes |
| 7 | `i18n-accessibility` | `feat/i18n-accessibility` | pt-BR/en/es, a11y, responsividade | sem string hardcoded; WCAG AA; responsivo |

---

## 8. Estrutura esperada após o `bootstrap-frontend`

O seed **não** contém `package.json` nem `src/`. A primeira change cria:

```text
erp_saas_frontend/
├── angular.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── eslint.config.js
├── jest.config.ts
├── setup-jest.ts
├── playwright.config.ts
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── core/
│   │   ├── data/
│   │   ├── features/
│   │   ├── layout/
│   │   ├── shared/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── assets/
│   ├── environments/
│   └── styles/
│       ├── tokens/
│       └── theme.css
├── public/
├── Dockerfile
├── nginx.conf
├── .github/workflows/ci.yml
├── .env.example
├── openspec/
├── adr/
├── docs/
└── AGENTS.md
```

---

## 9. Rodar localmente

Após o bootstrap:

```powershell
pnpm install
pnpm dev          # http://localhost:4200
pnpm test
pnpm e2e
pnpm build
pnpm storybook    # http://localhost:6006
```

Com Docker (se implementado):

```powershell
docker build -t erp-frontend .
docker run -p 8080:80 erp-frontend
```

URLs esperadas:

| Recurso | URL |
|---|---|
| App | `http://localhost:4200` |
| Storybook | `http://localhost:6006` |
| API (backend) | `http://localhost:8080/api/v1` |

---

## 10. Fluxo de Git recomendado

### Branches

```text
main
├── feat/bootstrap-frontend
├── feat/design-system-foundation
├── feat/component-library-core
├── feat/auth-login-flow
├── feat/app-shell-home
├── feat/api-integration
└── feat/i18n-accessibility
```

- `main` sempre verde.
- Uma branch por change.
- PR obrigatório com pelo menos 1 aprovação.
- Checks obrigatórios: lint, typecheck, test, build, e2e (quando aplicável), validação OpenSpec.

### Commits

```text
feat(bootstrap): scaffold Angular app
feat(design-system): add tokens and theme
feat(uw-ui): add button and input components
feat(auth): implement login and refresh flow
feat(shell): add admin layout and menu
feat(api): add repositories and error interceptor
feat(i18n): add pt-BR/en/es translations
test(auth): cover login and refresh
docs(openspec): update project constitution
chore(ci): add pnpm cache
```

### PR checklist

```markdown
- [ ] `pnpm lint` e `pnpm typecheck` verdes
- [ ] `pnpm test` verde
- [ ] `pnpm build` verde
- [ ] E2E do fluxo (quando aplicável)
- [ ] Acessibilidade revisada
- [ ] i18n aplicado
- [ ] Storybook atualizado
- [ ] Sem `any`, sem `console.log`, sem segredo
- [ ] `openspec validate <change> --strict` verde
- [ ] `tasks.md` atualizado
```

---

## 11. Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `node` não encontrado | Node não instalado/PATH | Instale Node 22 LTS e reabra o terminal |
| `pnpm` não encontrado | pnpm não instalado | `npm install -g pnpm@11` |
| `ng` não encontrado | Angular CLI não instalado | `npm install -g @angular/cli@21` |
| `openspec` não encontrado | CLI não instalado/PATH | Instale o CLI; confirme `openspec --version` |
| Schema `intent-driven` não encontrado | Falta `openspec/schemas/intent-driven` | Confirme a cópia; compare com `congresso` |
| `openspec validate` falha | Spec/task fora do formato | Verifique `## ADDED Requirements`, `### Requirement:`, `#### Scenario:` e checkboxes |
| Erro de CORS | Backend sem CORS para `localhost:4200` | Ajuste CORS no backend |
| 401 em loop | Refresh falhando | Verifique cookie/refresh e fila de refresh |
| Tailwind não aplica | Configuração do plugin | Verifique `@tailwindcss/postcss` e `styles.css` |
| Storybook não sobe | Dependências | `pnpm install`; confira `angular.json` |
| Testes Jest falham | `jest-preset-angular`/`setup-jest` | Confira `tsconfig.spec.json` e `setup-jest.ts` |
| Playwright falha | Navegador não instalado | `pnpm exec playwright install` |
| Fim de linha misturado | Git no Windows | Use `.gitattributes` com `eol=lf` |
| Build lento | Sem cache | Configure cache pnpm no CI |

---

## 12. Checklist final do “start from zero”

- [ ] Pasta nova criada fora do backend.
- [ ] Conteúdo de `front/` copiado para a raiz.
- [ ] `openspec/`, `adr/`, `docs/`, `.agents/`, `AGENTS.md` presentes.
- [ ] `git init -b main` executado.
- [ ] `.gitignore` e `.gitattributes` criados.
- [ ] Primeiro commit feito.
- [ ] Nome do produto e marca ajustados.
- [ ] Node 22, pnpm 11 e Angular CLI 21 instalados.
- [ ] `openspec --version` funciona.
- [ ] As 7 changes passam em `openspec validate ... --strict`.
- [ ] `bootstrap-frontend` implementado e `pnpm build` verde.
- [ ] Cada change seguinte implementada, validada e arquivada.
- [ ] Nenhum segredo commitado.
- [ ] CI verde.

---

## 13. O que NÃO fazer

- **Não** usar bibliotecas de UI de terceiros (Material, PrimeNG, Bootstrap).
- **Não** criar monorepo.
- **Não** usar `any`.
- **Não** armazenar refresh token em `localStorage`.
- **Não** hardcodar cores/strings/URLs.
- **Não** pular testes, acessibilidade ou i18n.
- **Não** avançar para a próxima change antes da atual estar verde.

---

## 14. Referências

- [`README.md`](README.md)
- [`FUNCIONALIDADES.md`](FUNCIONALIDADES.md)
- [`AGENTS.md`](AGENTS.md)
- [`openspec/project.md`](openspec/project.md)
- [`openspec/config.yaml`](openspec/config.yaml)
- [`docs/briefing-frontend-saas.md`](docs/briefing-frontend-saas.md)
- [`docs/design-system.md`](docs/design-system.md)
- [`docs/component-inventory.md`](docs/component-inventory.md)
- [`docs/login-and-shell.md`](docs/login-and-shell.md)
- [`docs/api-contract.md`](docs/api-contract.md)
- [`adr/`](adr/)
