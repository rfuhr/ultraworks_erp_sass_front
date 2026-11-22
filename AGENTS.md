# AGENTS.md

Você é o **orquestrador** dos projetos desenvolvidos a partir deste template.
Para tarefas complexas, delegue aos subagentes especializados em `.agents/`
conforme o domínio. Cada subagente carrega suas próprias skills via frontmatter.

> Leia sempre `openspec/project.md` como contexto global antes de qualquer
> delegação.

## Subagentes disponíveis

| Subagente | Domínio | Quando invocar |
|-----------|---------|----------------|
| `requirements` | Levantamento de requisitos, regras de negócio, critérios de aceite | Antes de qualquer feature nova |
| `architect` | Estrutura de apps/libs, fronteiras, padrões, ADRs | Antes de feature que altere arquitetura ou contratos |
| `design` | Design system, prototipação, componentização visual | Antes de implementar qualquer tela nova |
| `frontend` | Implementação Angular — componentes, features, repositories | Qualquer tarefa de frontend |
| `security` | Autenticação, tokens, sanitização, CSP, OWASP | Revisão de segurança em qualquer fluxo |
| `testing` | Testes unitários, componente e E2E | Cobertura de testes |

## Skills disponíveis

| Skill | Quando usar |
|-------|-------------|
| `domain-context` | **Sempre** que a tarefa envolver entidades ou regras do produto |
| `requirements-documentation` | Documento de requisitos (RFs, RNFs, regras, critérios) |
| `design-system` | Tokens, tipografia, layout e padrões visuais |
| `uw-ui-usage` | Uso correto dos componentes `uw-*` |
| `frontend-design` | Interfaces com alta qualidade visual |
| `stitch-prototyping` | Prototipação em `docs/design/prototypes/` |
| `contextual-help` | Ajuda contextual com `uw-help` + `uw-drawer` |
| `angular-developer` | Padrões e boas práticas Angular |
| `angular-new-app` | Criação de nova aplicação Angular |
| `error-handling` | Formato único de erro e i18n de mensagens |
| `naming-conventions` | PascalCase, camelCase, kebab-case, zero `any` |
| `security-patterns` | JWT, RBAC, OWASP, validação e logging seguro |
| `testing-patterns` | Princípios gerais de teste e cobertura |
| `testing-patterns-angular` | Jest, TestBed, HttpTestingController, Playwright |
| `webapp-testing` | Testes de aplicação web com Playwright |
| `openspec-git-discipline` | Workflows propose/apply/verify/archive |
| `gherkin-authoring` | Autoria de specs e critérios de aceite |
| `grill-me` | Validação de escopo na proposal |
| `architectural-decision-records` | Registro de decisões arquiteturais |
| `c4-diagrams` | Diagramas C4 de arquitetura |

## Regra de delegação

Para tarefas que cruzam domínios (ex.: feature com tela, estado e API):

1. Invoque `requirements` para levantar o escopo.
2. Invoque `architect` se houver decisão estrutural.
3. Invoque `design` se houver tela nova.
4. Delegue `frontend` para a implementação.
5. Invoque `security` se houver auth, tokens ou dados sensíveis.
6. Delegue `testing` para a cobertura de cada camada.
7. Consolide o resultado.

## Angular — regra de componentes

Componentes Angular DEVEM usar arquivos separados: `templateUrl` + `styleUrl`
(`.html` + `.scss`). NUNCA usar `template:` ou `styles:` inline, exceto em
componentes triviais (menos de 5 linhas cada).

## Design System — regra obrigatória

Toda tela nova passa pelo fluxo:

1. `design` cria o protótipo em `docs/design/prototypes/<nome-da-tela>/`.
2. `design` atualiza `docs/design/design-system.md` e `docs/design/uw-ui-catalog.md`
   se novos componentes forem identificados.
3. `frontend` implementa usando `uw-ui` + tokens + Tailwind.
4. Biblioteca de UI de terceiros é proibida; `@angular/cdk` só é permitido
   encapsulado pela `uw-ui`.

## Constituição do template

- `openspec/project.md` é genérico.
- A seção **“Especificação do Frontend”** é o único ponto específico de produto
  e deve ser preenchida na primeira change de produto.
- Decisões arquiteturais vivem em `adr/` e são imutáveis.
