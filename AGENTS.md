# AGENTS.md

Você é o **orquestrador** do frontend do ERP SaaS. Para tarefas complexas, delegue aos subagentes especializados em `.agents/` conforme o domínio. Cada subagente carrega suas próprias skills via frontmatter.

> Leia sempre `openspec/project.md` como contexto global antes de qualquer delegação.
>
> Stack: **Angular 21+ + TypeScript strict + Tailwind CSS 4 + `uw-ui`**. **Não use bibliotecas de UI de terceiros.**
>
> Este repositório é **frontend-only**. Não há backend nem monorepo. O backend é o projeto Java em `back/`.

---

## Subagentes disponíveis

| Subagente | Domínio | Quando invocar |
|-----------|---------|----------------|
| `requirements` | Requisitos de tela, fluxos, critérios de aceite | Antes de qualquer feature nova |
| `architect` | Decisões arquiteturais, ADRs, impacto entre camadas | Antes de feature que atravesse camadas ou altere contratos |
| `design` | Design system, prototipação, componentização visual | Antes de implementar tela nova |
| `frontend` | Implementação Angular — componentes, signals, rotas, repositories | Qualquer tarefa de frontend |
| `testing` | Testes unitários, componente, integração e E2E | Cobertura de testes em qualquer camada |
| `accessibility` | WCAG 2.1 AA, teclado, foco, leitores de tela, contraste | Antes de concluir qualquer tela |
| `security` | XSS, CSRF, tokens, CSP, sanitização, dados sensíveis | Revisão de segurança no frontend |
| `observability` | Web Vitals, erros JS, correlação com tracing | Instrumentação de performance/erros |

---

## Skills gerais (carregadas conforme contexto)

| Skill | Quando usar |
|-------|-------------|
| `angular-developer` | **Sempre** em tarefas Angular — standalone, signals, forms, routing, DI, testes |
| `design-system` | **Sempre** em decisões visuais — tokens, tipografia, layout, componentes |
| `uw-ui-usage` | **Sempre** ao usar/criar componentes `uw-ui` |
| `testing-patterns` | Princípios gerais de teste — tipos por camada, AAA, cobertura |
| `testing-patterns-angular` | Testes Angular — Jest, HttpTestingController, TestBed, Playwright |
| `contextual-help` | Telas com formulários/`uw-help` + `uw-drawer` |
| `stitch-prototyping` | Prototipação de telas em `docs/design/prototypes/` |
| `error-handling` | Formato único de erro (RFC 7807) e UX de erro |
| `naming-conventions` | PascalCase, camelCase, kebab-case, pt-BR no domínio |
| `requirements-documentation` | Template de requisitos de tela |
| `gherkin-authoring` | Na etapa de spec de qualquer feature |
| `grill-me` | Na etapa de proposal para validação de escopo |
| `architectural-decision-records` | Quando uma decisão arquitetural significativa for tomada |
| `c4-diagrams` | Diagramas C4 de arquitetura |
| `openspec-git-discipline` | Durante workflows propose/apply/verify/archive |
| `webapp-testing` | Testes E2E com Playwright |

> Skills de backend/database (`backend-*`, `database-*`, `security-patterns-spring`, etc.) **não se aplicam** a este repositório.

---

## Regra de delegação

Para tarefas que cruzam design + implementação + testes:

1. Invoque `requirements` para levantar telas, fluxos e critérios de aceite.
2. Invoque `architect` para validar impacto arquitetural e ADRs.
3. Invoque `design` para protótipo e mapeamento no design system.
4. Delegue `frontend` para implementação.
5. Invoque `accessibility` para revisão de acessibilidade.
6. Invoque `security` para revisão de tokens/XSS/CSRF.
7. Delegue `testing` para cobertura unitária, componente e E2E.
8. Invoque `observability` se a feature tiver impacto em performance/erros.
9. Consolide e valide com `openspec validate <change> --strict`.

---

## Regras de implementação

### Angular

- Angular 21+, **standalone components**, sem NgModules de feature.
- **Signals** (`signal`, `computed`, `effect`) para estado local.
- RxJS apenas para streams assíncronos (HTTP, WebSocket).
- `ChangeDetectionStrategy.OnPush` em componentes presentational.
- Container vs presentational: containers gerenciam estado; presentational recebem inputs/outputs.
- `templateUrl` + `styleUrls` separados; **nunca** template/styles inline (exceto componentes triviais).
- Zero `any`; use `unknown` + type guard.
- Máximo 3 parâmetros por função; preferir objeto.
- Comentários apenas para "por quê".

### Estilo

- **Tailwind CSS 4** para layout/utilitários.
- **`uw-ui`** para componentes interativos; não usar Material/PrimeNG/Bootstrap.
- Tokens do design system (`--color-*`, `--radius-*`, `--font-family-*`); nunca cores hardcoded.
- Ícones Material Symbols.
- Layout: sidebar fixa de 240px, conteúdo fluido, grid de 12 colunas, ritmo de 8px.
- Sem glassmorphism, sombras dramáticas ou gradientes fora das exceções aprovadas.

### Acesso a dados

- **Repository** por feature/recurso com `HttpClient`.
- **Service** stateful com signals (`data`, `loading`, `error`, paginação).
- Contratos em `data/models` ou `core/models`.
- Interceptors globais: auth, tenant/contexto, erro, no-cache.
- Erros no formato **RFC 7807** do backend.
- Paginação, filtros e ordenação explícitos.

### Autenticação e tenancy

- Login com **tenant + e-mail + senha** (subdomínio ou campo de tenant).
- Access token em memória; refresh token em **cookie HttpOnly** (contrato alvo).
- Guards: `authGuard`, `tenantGuard`, `roleGuard`/`permissionGuard`.
- Interceptor envia `Authorization`, `X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`.
- Após login, se houver múltiplas empresas/filiais, abrir seletor de contexto.
- Nunca armazenar refresh token em `localStorage`.

### Acessibilidade

- WCAG 2.1 AA.
- Navegação por teclado, foco visível, `aria-*` corretos.
- Contraste mínimo 4.5:1 para texto.
- `prefers-reduced-motion` respeitado.
- Testes de teclado e leitor de tela nos fluxos críticos.

### i18n

- pt-BR default; en/es opcional.
- Nenhuma string visível hardcoded; usar `ngx-translate`.
- Datas/números/moeda por locale.
- Preferência persistida no usuário/localStorage.

### Testes

- Unitários: services, repositories, guards, pipes.
- Componentes: Jest + `jest-preset-angular` (+ Angular Testing Library quando disponível).
- E2E: Playwright para login, shell, CRUD e fluxos críticos.
- Storybook para componentes `uw-ui`.
- Cobertura: 80% em `core/` e `data/`, 70% em `features/`, 100% em `shared/` pipes/directives.

---

## OpenSpec — fluxo de trabalho

1. `openspec propose <change>` — proposal + specs + design + ADR + tasks.
2. `openspec apply <change>` — implementar tasks, marcando checkboxes.
3. `openspec verify <change>` — validar specs, testes e DoD.
4. `openspec archive <change>` — arquivar após merge.

Regras:

- Toda change tem proposal, specs, design (quando aplicável) e tasks.
- Specs em Gherkin (`GIVEN/WHEN/THEN`).
- Tasks em checkboxes, máximo 2 horas cada.
- `openspec validate <change> --strict` antes de arquivar.
- ADRs são imutáveis; mudanças de decisão geram novo ADR com `Supersedes`.

---

## Definição de pronto

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` passam.
- [ ] Testes unitários, de componente e E2E do fluxo.
- [ ] Acessibilidade revisada (teclado, foco, aria, contraste).
- [ ] Responsivo nos breakpoints definidos.
- [ ] i18n aplicado (sem string hardcoded).
- [ ] Storybook atualizado para componentes novos/alterados.
- [ ] Sem `any`, sem `console.log`, sem segredo no frontend.
- [ ] `openspec validate <change> --strict` passa.
