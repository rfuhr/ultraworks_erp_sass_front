# Design System — Frontend Template

Este documento descreve o design system herdado do projeto de referência e
adaptado para o template. A **fonte de verdade dos tokens é o código** em
[`libs/tokens/src/styles/`](../../libs/tokens/src/styles/); este documento
descreve nomes, uso e padrões, sem duplicar CSS.

## 1. Princípios

- Superfícies sólidas, bordas de 1px e sombras discretas.
- Sem glassmorphism, gradientes decorativos ou cores hardcoded.
- Sidebar de 240px, conteúdo fluido e grid de 12 colunas.
- Ritmo vertical e horizontal em múltiplos de 8px.
- Acessibilidade WCAG 2.1 AA como requisito, não como fase futura.
- Todo texto visível vem de i18n.

## 2. Arquitetura de tokens

Os tokens seguem duas camadas:

```
palette.css  →  colors.css  →  theme.css
(valores crus)  (semânticos)   (aliases e superfícies)
```

| Arquivo | Responsabilidade |
|---|---|
| `libs/tokens/src/styles/tokens/palette.css` | Escalas cruas (`--color-{family}-{shade}`) |
| `libs/tokens/src/styles/tokens/colors.css` | Papéis semânticos (`--color-primary`, `--color-surface`) |
| `libs/tokens/src/styles/tokens/typography.css` | Famílias, tamanhos e pesos |
| `libs/tokens/src/styles/tokens/borders.css` | Raios (`--radius-*`) |
| `libs/tokens/src/styles/theme.css` | Aliases legados, superfícies, sidebar e base |
| `libs/tokens/src/styles/fonts.css` | `@font-face` self-hosted e ícones |

### Regras

- Componentes usam **apenas tokens semânticos** (`--color-*`, `--radius-*`,
  `--font-family-*`).
- Valores hexadecimais em componentes são proibidos, exceto em tokens.
- Para adicionar uma cor, crie primeiro a escala em `palette.css` e depois o
  papel em `colors.css`.

## 3. Tipografia

| Token | Valor | Uso |
|---|---|---|
| `--font-family-display` | Plus Jakarta Sans | Títulos e cabeçalhos |
| `--font-family-body` | Inter | Corpo de texto e controles |
| `--font-family-mono` | JetBrains Mono | Código, números e badges |

Tamanhos em `--font-size-{xs..3xl}` e pesos em
`--font-weight-{regular|medium|semibold|bold}`.

As fontes e o Material Symbols são **self-hosted** em
`libs/tokens/src/assets/fonts/`.

## 4. Layout e espaçamento

- Sidebar fixa de **240px** (colapsada em 72px).
- Conteúdo fluido com padding de 24px no desktop e 16px no mobile.
- Grid de 12 colunas em telas largas.
- Breakpoints Tailwind: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Em telas menores que 900px, a sidebar vira drawer.

## 5. Elevação e formas

- Superfícies usam `--color-surface*`.
- Bordas usam `--color-outline` e `--color-outline-variant`.
- Raios: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`.
- Sombras são discretas; não usar sombras dramáticas para hierarquia.

## 6. Componentes

O catálogo completo está em [`uw-ui-catalog.md`](./uw-ui-catalog.md).

Convenções:

- Classe `Uw<Nome>Component` e selector `uw-<nome>`.
- `standalone: true`, `ChangeDetectionStrategy.OnPush`,
  `ViewEncapsulation.None`.
- Estilos namespaced por `.uw-<nome>`.
- Toda componente tem história no Storybook.

### Formulários

Use `uw-form-field` para rótulo, dica e erro; controles (`uw-input`,
`uw-select`, `uw-date-picker`, `uw-textarea`, `uw-checkbox`, `uw-toggle`) são
responsivos e acessíveis por teclado.

### Dados

`uw-table` oferece ordenação, busca e paginação via `LazyParams`. Para estados
vazios use `uw-empty-state`; para carregamento, `uw-skeleton` ou `uw-spinner`.

### Feedback

`uw-toast` para feedback transitório, `uw-alert` para mensagens persistentes e
`uw-confirmation` para ações destrutivas.

### Layout

`uw-admin-layout` é **presentational**: recebe menu, usuário e breadcrumb por
inputs e emite navegação/logout por outputs. O shell do produto vive em
`apps/frontend/src/app/layout/`.

## 7. Estados obrigatórios

| Estado | Regra |
|---|---|
| Loading | `uw-skeleton` para conteúdo; `uw-spinner` para ações |
| Empty | `uw-empty-state` com título, descrição e ação opcional |
| Error | mensagem clara + ação de retry; `uw-toast` persistente quando exigir ação |
| Success | `uw-toast` temporário; modal apenas para confirmação |

## 8. Acessibilidade

- Contraste mínimo de 4.5:1 para texto normal.
- Foco sempre visível (`:focus-visible`).
- Navegação completa por teclado.
- `aria-*` em componentes interativos e mensagens de erro associadas.
- `prefers-reduced-motion` respeitado.
- Modais e drawers prendem o foco e fecham com `Escape`.

## 9. Rebranding

Para trocar a identidade visual:

1. Substitua os valores em `palette.css`.
2. Ajuste os papéis em `colors.css` se necessário.
3. Atualize as fontes em `fonts.css` e `typography.css`.

Nenhum componente precisa ser editado.

## 10. Regras invioláveis

- Não usar bibliotecas de UI de terceiros.
- Não usar cores ou raios fora dos tokens.
- Não criar componente de domínio dentro de `libs/uw-ui`.
- Não duplicar CSS de tokens em documentação.
- Não implementar tela sem protótipo aprovado.
