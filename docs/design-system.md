> **Nota de adaptação:** este design system foi herdado do projeto `congresso` (UltraEventos). Os **tokens, tipografia, espaçamento, bordas, layout e padrões de componentes** são reutilizáveis. A narrativa de marca e os exemplos específicos de eventos devem ser adaptados para o ERP SaaS. Consulte também `docs/component-inventory.md` e `docs/login-and-shell.md`.

## Brand & Style

The design system is engineered for **high-density enterprise ERP operations**, where precision, reliability, and technological sophistication are paramount. The brand personality is **Modern Corporate**—it is sober, functional, and honest. It avoids the whimsical or "vibrant" excesses of consumer tech in favor of a professional environment that prioritizes data clarity and operational speed.

The visual direction follows a **Corporate / Modern** movement, heavily influenced by institutional tools like Stripe or GitHub. It rejects "AI-generated" aesthetics such as floating glass panels, dramatic shadows, and soft gradients. Instead, it utilizes solid surfaces, crisp 1px borders, and a strict mathematical grid to evoke a sense of total control and professional confidence. The emotional response is one of stability and elite execution.

## Token Architecture

O sistema de tokens segue uma arquitetura em 2 camadas:

```
src/styles/tokens/
├── palette.css      ❶ Raw color scales (Tailwind CSS v4)
├── colors.css       ❷ Semantic color tokens
├── typography.css   ❸ Font family tokens
├── borders.css      ❹ Radius tokens

src/styles/theme.css ❺ Aplicação + aliases legados
```

### ❶ Palette (`tokens/palette.css`)

Todas as cores brutas disponíveis, organizadas por família e escala 50–950.
Nomenclatura: `--color-{family}-{shade}`.

Famílias: emerald, green, lime, red, orange, amber, yellow, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone.

```css
color: var(--color-emerald-500);    /* #10b981 */
background: var(--color-violet-100); /* #ede9fe */
border: 1px solid var(--color-stone-300);
```

### ❷ Colors (`tokens/colors.css`)

Tokens semânticos que mapeiam papéis de design para valores da palette.
Nomenclatura: `--color-{role}`.

| Token | Resolve para | Uso |
|-------|-------------|-----|
| `--color-primary` | `--color-violet-600` | Identidade, ações principais |
| `--color-on-primary` | `#ffffff` | Texto sobre primary |
| `--color-primary-container` | `--color-violet-100` | Background containers primary |
| `--color-on-primary-container` | `--color-violet-950` | Texto sobre primary container |
| `--color-secondary` | `--color-teal-600` | Ações secundárias |
| `--color-on-secondary` | `#ffffff` | Texto sobre secondary |
| `--color-secondary-container` | `--color-teal-50` | Background containers secondary |
| `--color-on-secondary-container` | `--color-teal-900` | Texto sobre secondary container |
| `--color-tertiary` | `--color-rose-600` | Acentos |
| `--color-on-tertiary` | `#ffffff` | Texto sobre tertiary |
| `--color-tertiary-container` | `--color-rose-100` | Container tertiary |
| `--color-surface` | `--color-neutral-50` | Background geral |
| `--color-surface-dim` | `--color-neutral-200` | Background rebaixado |
| `--color-surface-bright` | `#ffffff` | Cards, containers |
| `--color-surface-container` | `--color-neutral-100` | Hover, containers elevados |
| `--color-surface-container-low` | `--color-neutral-50` | Container sutil |
| `--color-surface-container-high` | `--color-neutral-200` | Container elevado |
| `--color-surface-tint` | `#f9f8ff` | Inputs, selects, search fields |
| `--color-on-surface` | `--color-neutral-900` | Texto principal |
| `--color-on-surface-variant` | `--color-neutral-600` | Texto secundário / labels |
| `--color-outline` | `--color-neutral-400` | Bordas |
| `--color-outline-variant` | `--color-neutral-200` | Bordas sutis (cards) |
| `--color-success` | `--color-emerald-500` | Sucesso |
| `--color-on-success` | `#ffffff` | Texto sobre success |
| `--color-success-container` | `--color-emerald-50` | Background success |
| `--color-warning` | `--color-amber-500` | Aviso |
| `--color-on-warning` | `#ffffff` | Texto sobre warning |
| `--color-warning-container` | `--color-amber-50` | Background warning |
| `--color-error` | `--color-red-600` | Erro |
| `--color-on-error` | `#ffffff` | Texto sobre error |
| `--color-error-container` | `--color-red-50` | Background error |
| `--color-info` | `--color-sky-500` | Informativo |
| `--color-info-container` | `--color-sky-50` | Background info |
| `--color-chart-1` | `--color-violet-600` | Data viz |
| `--color-chart-2` | `--color-violet-400` | Data viz |
| `--color-chart-3` | `--color-rose-500` | Data viz |
| `--color-chart-4` | `--color-emerald-500` | Data viz |
| `--color-chart-5` | `--color-amber-500` | Data viz |
| `--color-chart-6` | `--color-sky-500` | Data viz |
| `--color-chart-7` | `--color-indigo-500` | Data viz |

### ❸ Typography (`tokens/typography.css`)

| Token | Resolve para | Uso |
|-------|-------------|-----|
| `--font-family-display` | `'Plus Jakarta Sans', sans-serif` | Títulos, cabeçalhos |
| `--font-family-body` | `'Inter', sans-serif` | Corpo de texto, labels |
| `--font-family-mono` | `'JetBrains Mono', monospace` | Código, timestamps, badges |

### ❹ Borders (`tokens/borders.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius` | `0.875rem` (~14px) | Base |
| `--radius-sm` | `calc(var(--radius) - 4px)` (~10px) | Inputs, filters |
| `--radius-md` | `calc(var(--radius) - 2px)` (~12px) | Botões, accordion, tabs |
| `--radius-lg` | `var(--radius)` (~14px) | Cards, panels, table |
| `--radius-xl` | `calc(var(--radius) + 4px)` (~18px) | Máximo permitido |

### ❺ Theme (`theme.css`)

Mantém os nomes legados (`--primary`, `--surface`, `--error`, etc.) como aliases para os novos tokens, garantindo compatibilidade com componentes existentes.

```css
--primary:  var(--color-primary);
--success:  var(--color-success);
```

**Regra:** Componentes novos usam `--color-*`. Componentes antigos seguem com `--primary`, `--surface`, etc.

### Adicionar nova cor

1. Se a cor bruta não existir, adicione em `tokens/palette.css` na família adequada
2. Mapeie para um token semântico em `tokens/colors.css`
3. Se necessário, crie alias legado em `theme.css`

## Typography

O sistema usa uma estratégia tri-font para separar intenção e densidade de informação:

| Token | Fonte | Uso |
|-------|-------|-----|
| `--font-family-display` | **Plus Jakarta Sans** | Títulos de página, cabeçalhos de seção, botões primary/premium |
| `--font-family-body` | **Inter** | Corpo de texto, labels, botões secundários, inputs, tabelas |
| `--font-family-mono` | **JetBrains Mono** | Badges, scores, timestamps, IDs, metadados técnicos |

A hierarquia é estabelecida por peso e cor, nunca por tamanho excessivo ou tags decorativas.

## Layout & Spacing

The design system employs a **Fixed Sidebar / Fluid Content** layout model typical of high-efficiency enterprise software.

- **Sidebar:** A solid 240px width with a fixed position and deep navy-purple background (`--sidebar` = `#1a1535`). It uses a clean border-right divider without floating shells or rounded outer corners.
- **Grid:** A 12-column system for desktop with 16px gutters. Padding is strictly applied at 24px for all main container margins.
- **Rhythm:** An 8px base unit controls all spacing. Vertically, related elements use 8px (stack-sm), while distinct sections use 32px (stack-lg) to maintain clarity without the need for decorative dividers.

Internal tools must avoid "Hero" sections. Page headers are simple, left-aligned H1 elements followed immediately by their respective content or filters.

## Elevation & Depth

The design system establishes hierarchy through **Tonal Layers** and **Subtle Outlines** rather than dramatic shadows.

| Nível | Token | Uso |
|-------|-------|-----|
| 0 | `--color-surface` | Background geral |
| 1 | `--color-surface-bright` + borda 1px `color-mix(in srgb, var(--color-primary) 10%, transparent)` | Cards, containers de conteúdo |
| Interativo | `--color-surface-container` no hover | Linhas de tabela, cards clicáveis |

Avoid all "glassmorphism" effects, background blurs, and floating detached panels. Surfaces are solid and dependable.

## Shapes

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--radius-sm` | ~10px | Inputs, search fields, filter inputs |
| `--radius-md` | ~12px | Botões, accordion, tabs, filter pills, notification cards |
| `--radius-lg` | ~14px | Cards, panels, tables, accordion container |
| `--radius-xl` | ~18px | Máximo permitido |

## Sidebar

Tokens definidos em `theme.css` com prefixo `--sidebar-`:

| Token | Valor |
|-------|-------|
| `--sidebar` | `#1a1535` |
| `--sidebar-foreground` | `#e2e0f0` |
| `--sidebar-foreground-muted` | `#8a8aaa` |
| `--sidebar-primary` | `var(--color-primary)` |
| `--sidebar-accent` | `#251e4a` |
| `--sidebar-accent-foreground` | `#c4bfdf` |
| `--sidebar-border` | `rgba(255, 255, 255, 0.07)` |

- **Width:** 240px, position fixed
- Nav links: text + icon 16px

## Components

### Buttons

O projeto utiliza o componente `<uw-button>` como botão padrão, disponível em `shared/uw-ui/button/`. Suporta 9 variantes visuais:

| Variante | Background | Texto | Uso |
|----------|-----------|-------|-----|
| `primary` | `var(--color-primary)` | `var(--color-on-primary)` | Ação principal |
| `secondary` | `var(--color-secondary-container)` | `var(--color-secondary)` | Ação secundária |
| `outline` | transparent | `var(--color-primary)` | Ação de contorno |
| `ghost` | `color-mix(in srgb, var(--color-primary) 35%, transparent)` | `var(--color-primary-container)` | Botão translúcido |
| `soft` | `var(--color-violet-100)` | `var(--color-primary)` | Ação suave |
| `text` | transparent | `var(--color-on-surface-variant)` | Ação de baixa ênfase |
| `premium` | gradient `#6c47ff → #3b82f6` | `#ffffff` | Ação destacada com gradiente |
| `danger` | `var(--color-error)` | `var(--color-on-error)` | Ação destrutiva |
| `alert` | `var(--color-warning)` | `var(--color-on-warning)` | Alerta não-destrutivo |

- **Ícone:** Suporte a ícone Material Symbols via inputs `icon`, `iconPosition` (left/right), `iconOnly`
- **Disabled:** Background `var(--color-surface-container)`, texto `var(--color-outline)`, cursor `not-allowed`
- **Badge:** Suporte a badge flutuante via inputs `badge`, `badgeVariant`, `badgeDot`
- **Border-radius:** `var(--radius-md)` (~12px)
- **Transitions:** 150ms opacity/color — sem bounce, sem scale

### Page Header

O componente `<uw-page-header>` é o cabeçalho padrão de páginas, disponível em `shared/uw-ui/page-header/`.

| Elemento | Token | Descrição |
|---|---|---|
| Título | `var(--color-on-surface)` | `<h1>` com font-weight 700 |
| Descrição | `var(--color-on-surface-variant)` | Texto secundário, 14px |
| Ação | `<uw-button>` variant primary | Botão opcional à direita |

- **Responsivo:** Em desktop (≥768px), layout flex row (título à esquerda, botão à direita). Em mobile, layout column.

### Input Fields

O componente `<app-custom-input>` é o campo de texto padrão.

| Propriedade | Token |
|-------------|-------|
| Background (default) | `var(--color-surface-tint)` |
| Background (focus) | `var(--color-surface-bright)` |
| Borda | `1.5px solid color-mix(in srgb, var(--color-primary) 12%, transparent)` |
| Borda (focus) | `var(--color-primary)` |
| Box-shadow (focus) | `0 0 0 3px color-mix(in srgb, var(--color-primary) 8%, transparent)` |
| Border-radius | `var(--radius-sm)` |
| Font | `var(--font-family-body)` |
| Placeholder | `var(--color-on-surface-variant)` |

### Cards

O componente `<uw-card>` é o container primário.

| Propriedade | Token |
|-------------|-------|
| Background (outlined) | `var(--color-surface-tint)` |
| Border | `1.5px solid color-mix(in srgb, var(--color-primary) 15%, transparent)` |
| Border-radius | `var(--radius-lg)` |
| Padding interno | 1.5rem (24px) |

**Stripes:** 6 variants (primary, secondary, success, warning, error, info) com gradientes baseados na palette.

### Toggle Card

O componente `<uw-toggle-card>` é um card com ícone, título, descrição e toggle switch integrado, usado em telas de configuração de eventos.

| Input | Tipo | Padrão | Obrigatório | Descrição |
|-------|------|--------|-------------|-----------|
| `checked` | `boolean` | `false` | não | Estado ligado/desligado |
| `disabled` | `boolean` | `false` | não | Desabilitado |
| `icon` | `string` | — | sim | Nome do ícone Material Symbols |
| `label` | `string` | — | sim | Título do card |
| `description` | `string` | — | sim | Descrição do card |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | não | Variante de cor |
| `opacity` | `number` (0-100) | `100` | não | Opacidade do background quando checked |
| `clickableArea` | `'card' \| 'toggle'` | `'card'` | não | Área clicável |

**Tokens visuais:**

| Elemento | Token / Valor |
|----------|--------------|
| Border-radius | `var(--radius-lg)` (~14px) |
| Padding | `1rem 1.25rem` (16px/20px) |
| Gap (ícone → texto) | `0.75rem` (12px) |
| Ícone container | 40x40px, `border-radius: var(--radius-md)` |
| Label | 14px, weight 600, `var(--color-on-surface)` |
| Descrição | 12px, `var(--color-on-surface-variant)` |
| Toggle track | 44x24px, `border-radius: 12px` |
| Toggle thumb | 16x16px, `border-radius: 50%` |

**Variantes de cor (estado checked):**

| Variante | Background | Border | Icon bg |
|----------|-----------|--------|---------|
| `primary` | `--color-primary-container` | `color-mix(in srgb, --color-primary 30%, transparent)` | `--color-primary` |
| `success` | `--color-success-container` | `color-mix(in srgb, --color-success 30%, transparent)` | `--color-success` |
| `warning` | `--color-warning-container` | `color-mix(in srgb, --color-warning 30%, transparent)` | `--color-warning` |
| `error` | `--color-error-container` | `color-mix(in srgb, --color-error 30%, transparent)` | `--color-error` |
| `info` | `--color-info-container` | `color-mix(in srgb, --color-info 30%, transparent)` | `--color-info` |

**Exemplo de uso básico:**

```html
<uw-toggle-card
  icon="certificado"
  label="Emitir Certificado"
  description="Certificado digital gerado automaticamente"
  [(ngModel)]="certificadoAtivo"
  variant="primary"
/>
```

### Data Tables

O componente `<uw-table>` é a tabela de dados padrão.

- Border-radius: `var(--radius-lg)`
- Header bg: `var(--color-surface-tint)`
- Font: `var(--font-family-body)`
- Sort icons: `var(--color-primary)`
- Row hover: `var(--color-surface-tint)`
- Row selected: `var(--color-surface-tint)`
- Checkbox accent: `var(--color-primary)`

### UWTable

Componente de tabela de dados customizado, standalone, baseado em signals e ViewEncapsulation.None.

**Inputs:**

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `columns` | `UwTableColumn[]` | `[]` | Definição das colunas |
| `data` | `T[]` | `[]` | Dados a exibir (client-side) |
| `lazy` | `boolean` | `false` | Modo lazy (server-side) |
| `lazyParams` | `LazyParams` | `{}` | Parâmetros iniciais do lazy load |
| `totalRecords` | `number` | `0` | Total de registros (modo lazy) |
| `loading` | `boolean` | `false` | Indicador de carregamento |
| `globalFilter` | `string` | `''` | Filtro global externo |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Modo de seleção |
| `dataKey` | `string` | `'id'` | Chave única para identificação de linhas |
| `rowSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho das linhas |
| `emptyMessage` | `string` | `'Nenhum registro encontrado'` | Mensagem de estado vazio |

**Outputs:**

| Output | Tipo | Descrição |
|--------|------|-----------|
| `lazyLoad` | `LazyParams` | Emitido ao ordenar, filtrar ou paginar (modo lazy) |
| `selectionChange` | `T[]` | Itens selecionados |

**Coluna (`UwTableColumn`):**

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `key` | `string` | — | Nome da propriedade no item |
| `header` | `string` | — | Label exibida no header |
| `sortable` | `boolean` | `false` | Permite ordenação |
| `filterable` | `boolean` | `false` | Exibe input de filtro no header |
| `width` | `string` | — | Largura da coluna (ex.: `'120px'`) |
| `hidden` | `boolean` | `false` | Oculta a coluna |

**Template customizado:**

```html
<uw-table [columns]="cols" [data]="items" selectionMode="multiple">
  <ng-template uwColTpl="status" let-item>
    <app-badge [variant]="item.status === 'ativo' ? 'success' : 'neutral'">
      {{ item.statusLabel }}
    </app-badge>
  </ng-template>
</uw-table>
```

## Biblioteca de componentes (uw-ui)

Todos os componentes ficam em `src/app/shared/uw-ui/` no novo frontend. São standalone, `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush` e têm história no Storybook. Exceções: os componentes de notificação vivem em `src/app/shared/components/notifications/` e o layout administrativo em `shared/uw-ui/layout/`.

Convenção: classe `Uw<Nome>Component` (ou `Uw<Nome>Directive`) e selector `uw-<nome>`, exceto os componentes legados que mantêm prefixo `app-`.

| Componente | Selector | Categoria |
|---|---|---|
| `uw-accordion` | `uw-accordion` | Navigation |
| `uw-accordion-trigger` | `uw-accordion-trigger` | Navigation |
| `uw-accordion-content` | `uw-accordion-content` | Navigation |
| `uw-accordion-item` | `uw-accordion-item` | Navigation |
| `app-breadcrumb` | `app-breadcrumb` | Navigation |
| `uw-export-menu` | `uw-export-menu` | Navigation |
| `uw-filter-pills` | `uw-filter-pills` | Navigation |
| `uw-stepper` | `uw-stepper` | Navigation |
| `uw-tabs` | `uw-tabs` | Navigation |
| `uw-action-card` | `uw-action-card` | Layout |
| `uw-admin-layout` | `uw-admin-layout` | Layout |
| `uw-divider` | `uw-divider` | Layout |
| `uw-drawer` | `uw-drawer` | Layout |
| `app-header` | `app-header` | Layout |
| `uw-modal` | `uw-modal` | Layout |
| `uw-page-header` | `uw-page-header` | Layout |
| `uw-panel` | `uw-panel` | Layout |
| `app-sidebar` | `app-sidebar` | Layout |
| `app-subheader` | `app-subheader` | Layout |
| `uw-alert` | `uw-alert` | Feedback |
| `uw-empty-state` | `uw-empty-state` | Feedback |
| `uw-skeleton` | `uw-skeleton` | Feedback |
| `uw-spinner` | `uw-spinner` | Feedback |
| `uw-toast` | `uw-toast` | Feedback |
| `uw-autocomplete` | `uw-autocomplete` | Form |
| `uw-button` | `uw-button` | Form |
| `uw-checkbox` | `uw-checkbox` | Form |
| `uw-date-picker` | `uw-date-picker` | Form |
| `uw-file-upload` | `uw-file-upload` | Form |
| `uw-form-field` | `uw-form-field` | Form |
| `uw-html-editor` | `uw-html-editor` | Form |
| `uw-input` | `uw-input` | Form |
| `uw-input-tag` | `uw-input-tag` | Form |
| `uw-language-switcher` | `uw-language-switcher` | Form |
| `uw-otp-input` | `uw-otp-input` | Form |
| `uw-pick-list` | `uw-pick-list` | Form |
| `uw-radio-group` | `uw-radio-group` | Form |
| `uw-radio-option` | `uw-radio-option` | Form |
| `uw-rating` | `uw-rating` | Form |
| `uw-search-field` | `uw-search-field` | Form |
| `uw-select` | `uw-select` | Form |
| `uw-select-button-group` | `uw-select-button-group` | Form |
| `uw-slider` | `uw-slider` | Form |
| `uw-tag` | `uw-tag` | Form |
| `uw-textarea` | `uw-textarea` | Form |
| `uw-toggle` | `uw-toggle` | Form |
| `uw-toggle-card` | `uw-toggle-card` | Form |
| `uw-avatar` | `uw-avatar` | Data |
| `uw-avatar-group` | `uw-avatar-group` | Data |
| `uw-card` | `uw-card` | Data |
| `uw-certificate-layout-preview` | `uw-certificate-layout-preview` | Data |
| `uw-chart-card` | `uw-chart-card` | Data |
| `uw-chart-legend` | `uw-chart-legend` | Data |
| `uw-doc-viewer` | `uw-doc-viewer` | Data |
| `uw-event-context` | `uw-event-context` | Data |
| `uw-image` | `uw-image` | Data |
| `uw-notification-group-header` | `uw-notification-group-header` | Data |
| `uw-notification-item` | `uw-notification-item` | Data |
| `uw-pagination` | `uw-pagination` | Data |
| `uw-progress-bar` | `uw-progress-bar` | Data |
| `uw-progress-track` | `uw-progress-track` | Data |
| `uw-scheduler` | `uw-scheduler` | Data |
| `uw-scheduler-agenda-view` | `uw-scheduler-agenda-view` | Data |
| `uw-scheduler-day-view` | `uw-scheduler-day-view` | Data |
| `uw-scheduler-event-card` | `uw-scheduler-event-card` | Data |
| `uw-scheduler-month-view` | `uw-scheduler-month-view` | Data |
| `uw-scheduler-toolbar` | `uw-scheduler-toolbar` | Data |
| `uw-scheduler-week-view` | `uw-scheduler-week-view` | Data |
| `uw-score-badge` | `uw-score-badge` | Data |
| `uw-section-heading` | `uw-section-heading` | Data |
| `uw-stat-card` | `uw-stat-card` | Data |
| `uw-table` | `uw-table` | Data |
| `uw-timeline` | `uw-timeline` | Data |
| `uw-timeline-item` | `uw-timeline-item` | Data |
| `app-badge` | `app-badge` | Utility |
| `uw-chip` | `uw-chip` | Utility |
| `uw-confirmation-dialog` | `uw-confirmation-dialog` | Utility (inclui modo prompt com textarea via `ConfirmationService.openPrompt`) |
| `uw-copy-field` | `uw-copy-field` | Utility |
| `uw-help` | `uw-help` | Utility |
| `uw-icon` | `uw-icon` | Utility |
| `app-perfil-badge` | `app-perfil-badge` | Utility |
| `uw-popover` | `uw-popover` | Utility |
| `app-status-badge` | `app-status-badge` | Utility |
| `UwTooltipDirective` | `[uwTooltip]` | Utility |
| `UWRipple` | `[uwRipple]` | Utility |
| `UWBadge` | `[uwBadge]` | Utility |
| `UwAutofocusDirective` | `[uwAutofocus]` | Utility |
| `UWPopoverTrigger` | `[uwPopoverTriggerFor]` | Utility |

### Card de mídia com download (padrão de exibição de artefato)

Usado nas abas de imagens do modal de mídias (protótipo `visualizar-evento-midias`). Atualmente implementado em escopo de feature (`visualizar/componentes/midia-item/`); extrair para `shared/` se reutilizado em outras telas.

| Elemento | Padrão |
|----------|--------|
| Container | Card `surface-container` com `border-radius: --radius-md` e padding 8px |
| Imagem | `object-fit: contain` em proporção fixa por tipo (aspect-ratio Tailwind) |
| Legenda | Nome original do arquivo em `body-sm` `--color-on-surface-variant`, truncado |
| Ação | Botão "Baixar" (`outline`, 12px) → `window.open(url, '_blank', 'noopener')` |

### Visualização inline de PDF (padrão de documento)

Área com toolbar (nome do arquivo em `--font-mono` + botão de download) e `<iframe>` de altura fixa (`h-[65vh]`). Sem dependência externa (PDF.js) — usa o renderizador nativo do navegador. Download sempre disponível como fallback quando o plugin falha.

### Dashboard / área do participante

Padrões validados no dashboard do participante (feature-scoped em `features/participante/dashboard/`):

| Padrão | Decisão |
|--------|---------|
| Painel escuro de boas-vindas ("hero") | Segue o protótipo React aprovado para a tela: gradiente `135deg #1a1535 → #2d1b6e → #1e3a8a`, orbs radiais sutis, avatar quadrado 64px com gradiente e badge de check, identidade à esquerda e mini-stats horizontais à direita, `radius` de 1.5rem (exceção aprovada para este hero) |
| Mini-stats sobre superfície escura | Markup próprio da feature (`.dashboard-hero__stat`): card `rgba(255,255,255,0.06)` + borda 1px `rgba(255,255,255,0.1)`, ícone `uw-icon` opcional, valor 24px em `--font-family-display` e label 11px |
| Seções compactas (previews) | Heading via `uw-section-heading` + contagem via `app-badge`; cards `surface-bright` + borda 1px `color-mix(--color-primary 8%)`, `radius-md`, densidade 8px |
| Card de preview (inscrição/trabalho) | Stripe sólida 4px `color-mix(in srgb, {cor} 25%, transparent)` → cor cheia; `line-clamp-2` em títulos; hover apenas por mudança de cor |
| Pill de nota final | Mono 11-12px, cor derivada de `notaColor` — **não** usar `uw-score-badge` (é picker interativo de rating, não exibição somente leitura) |
| Tile de data (agenda) | Quadrado 44x44 `radius-sm`, dia em `--font-family-display` 800, mês em uppercase mono 10px; cor do evento |
| Item de notificação | Ícone 32x32 com bg/ícone por tipo (`--color-success/warning/info/error`), não-lida com `--color-info-container` + dot 8px |
| Acesso rápido | Grid 2×2 de `uw-button` `soft` fullWidth com ícone |

### Dashboard / área do avaliador

Padrões validados no "Dashboard" do avaliador (feature-scoped em `features/avaliador/painel/`):

| Padrão | Decisão |
|--------|---------|
| Painel escuro de boas-vindas ("hero") | Mesmo gradiente `135deg #1a1535 → #2d1b6e → #1e3a8a`, orbs, raio de 1.5rem e avatar quadrado de 64px do participante, **sem dot de status**; badge de papel sobre `rgba(139,92,246,0.3)` com texto `#c4b5fd`; mini-stats **sem ícone** (valor colorido + label) à direita da identidade (colapso para 2 colunas em < 48rem) |
| Cabeçalho de seção (Fila e Distribuição) | Título de 16px em `--font-family-display` 700 com ícone de 16px em `--color-primary` (violeta); contagem em pill mono; link "Ver todos" em `--color-primary`. Não usa `uw-section-heading` (13px) |
| Cabeçalho "Prazo Urgente" | Título de 15px, ícone de alerta de 16px em `--color-error` e contagem em pill vermelha |
| Pill de prazo | Mono 10px, cor/bg via helper `prazoColor()` → `--color-error`+`--color-error-container` (≤2d), `--color-warning`+`--color-warning-container` (≤5d), `--color-success`+`--color-success-container` (>5d) |
| Pill de recomendação | Spans mono custom via `RECOMENDACAO_CONFIG` (Aceitar/Com Revisões/Rejeitar) — mesma família das pills de status, não `uw-badge`/`uw-tag` |
| Distribuição de recomendações | 3 barras `uw-progress-bar` em cores sólidas (success/warning/error) + nota média com barra âmbar sólida |
| Barras de progresso | `uw-progress-bar` em cores sólidas (primary/success/warning/error) nas seções; o dashboard do avaliador usa gradiente aprovado no progresso do hero (`#6c47ff → #3b82f6 → #34d399`), na barra de critérios da fila (`#6c47ff → #3b82f6`, 5px) e na nota média (`#f59e0b → #fcd34d`, 6px) |

### Área do avaliador — listagem "Trabalhos p/ Avaliar"

Padrões da tela `/avaliador/trabalhos-avaliar` (change `ajustar-tela-trabalhos-para-avaliar`), fiéis ao protótipo React anexado:

| Padrão | Decisão |
|--------|---------|
| Cabeçalho da área | Markup próprio da página (sem `uw-page-header`): eyebrow "Área do Avaliador" com ícone `bolt` 32×32 em gradiente `135deg var(--color-primary) → var(--color-info)`, `radius-md`; H1 26px/800 em `--font-family-display`; linha de contexto em `--color-on-surface-variant` com segmentos disponíveis unidos por `·` |
| Cabeçalho do drawer de avaliação | Bloco único via `<ng-template #header>`: código em mono `--color-outline` + pill de status (`STATUS_CONFIG`) + tag "Conflito" condicional no topo, com título 16px/700 em `--font-family-display` logo abaixo, sem truncamento. Abaixo do título, o nome do evento em 12px `--color-on-surface-variant` com ícone `event`, quebra em até 2 linhas e nome completo no `title`. O tipo não integra o cabeçalho — aparece somente nas pills de metadados da aba "Trabalho" |
| Resumo da aba "Trabalho" | Bloco simples (`detalhe__block`) com rótulo de 13px/700 e texto 13px/1.6 em `--color-on-surface-variant`, posicionado entre autores e palavras-chave. Apenas o bloco de autores usa `detalhe__painel` |
| Slot `#header` do `uw-drawer` | Opcional (`@ContentChild('header')`); substitui o título/subtítulo visuais e preserva o botão de fechar, `role="dialog"`, `aria-label` (input `title`) e `cdkTrapFocus`. Sem o slot, o cabeçalho padrão permanece |
| Hero de progresso | Gradiente `135deg #1a1535 → #251e4a → #1e2d6b` e orb radial `rgba(108,71,255,0.25)` com `blur(48px)` — **exceção aprovada** à regra "zero gradientes"; contagem grande (`concluídos` / `total` + "trabalhos avaliados"), barra de 8px com preenchimento `#6c47ff → #3b82f6 → #34d399`, rodapé de percentual/prazo e três tiles de recomendação (ícone + número + rótulo) sobre `rgba(255,255,255,0.06)` |
| Ajuda contextual | Apenas no formulário de avaliação (drawer); a listagem — busca, seletor de tipo e pills de status — não exibe `uw-help` |
| Aba "Histórico" do drawer | Timeline vertical com nó 8px e linha 2px `--color-outline-variant`; versão atual com ponto `--color-primary` e anel de 16%. Card `--color-surface-bright` + borda 1px `--color-outline-variant` + `--radius-md`; "Versão {n}" em `--font-family-display` 13px/700; pill "Atual" mono 10px em `--color-primary-container`/`--color-primary`; data e tamanho em mono 11px; download como link `--color-primary` 12px/600 |
| Avaliação por versão no drawer | `uw-accordion mode="single"` separado por `border-top: 1px dashed`; trigger 12px/600 em `--color-primary`; conteúdo usa o painel compartilhado `shared/components/trabalho-avaliacao-painel` |
| Comentário da correção | Callout `--color-info-container`, borda 1px `color-mix(--color-info 18%, transparent)` e borda esquerda 3px `--color-info`; `uw-icon forum`; rótulo "Comentário da correção (v{n})" e subtítulo "Enviado pelo participante"; texto 12.5px/1.5 com `white-space: pre-wrap` |
| Painel de avaliação compartilhado | Promovido de `features/participante/trabalhos/` para `shared/components/trabalho-avaliacao-painel/`, com view model genérico em `shared/models/avaliacao-painel.model.ts`, chaves `avaliacao.painel.*` e story `Shared/Avaliação/Trabalho — painel` |

### Controle de Trabalhos — drawer administrativo

Padrões validados no drawer de detalhes do Controle de Trabalhos (`admin-trabalho-drawer-avaliacoes`), alinhados ao drawer do avaliador:

| Padrão | Decisão |
|---|---|
| Cabeçalho | Slot `#header` do `uw-drawer`: código em mono + status com ícone + origem administrativa + tipo na primeira linha; título 16px/700 em `--font-family-display`; evento 12px `--color-on-surface-variant` com ícone `event` e máximo de 2 linhas |
| Abas | `uw-tabs` com `Trabalho`, `Avaliação`, `Histórico`, `Eventos do ciclo` e `Arquivos`; aba inicial `Trabalho` |
| Aba Trabalho | Pills de metadados (tipo, área, submissão e avaliador); callout de prazo `--color-warning-container`; painel de autores com avatar 28px, autor principal em gradiente e co-autores; resumo em 13px/1.6; palavras-chave em pills mono; card de alteração de status com confirmação e motivo |
| Aba Avaliação | Padrão de retorno do participante: nota hero com moldura colorida, recomendação, comentário aos autores, comentário interno, critérios em cards com barra e comentário privado; selo `Rascunho`; correção em `uw-accordion` |
| Aba Histórico | Timeline de versões com nó circular numerado (`v{n}`), versão atual em `--color-primary`, status da versão, data e arquivo para download; avaliação por versão em `uw-accordion` com o mesmo padrão de retorno |
| Aba Eventos do ciclo | `uw-timeline` dedicada à timeline do ciclo, separada das versões |
| Aba Arquivos | Cards de versão com ícone 40x40 `--color-primary-container`; download como link `--color-primary`; upload em área tracejada `color-mix(--color-primary 30%, transparent)` |
| Acessibilidade | Status sempre com texto + ícone; foco contido pelo `uw-drawer`; abas e accordions do `uw-ui` com semântica nativa |

### Central de Notificações

Padrões validados no protótipo `notificacoes` (change `add-notification-center`). A Central é uma rota
(`/notificacoes`), não um overlay; o popover do header reaproveita o mesmo item de notificação.

| Padrão | Decisão |
|--------|---------|
| Item de notificação em página inteira | Ícone 36×36 `radius-sm` com bg/ícone por severidade (`--color-success/warning/info/error` + containers); título 13.5px semibold; descrição 12.5px `--color-on-surface-variant`; meta com chip de categoria mono + timestamp mono + deep link |
| Estado não lida | Fundo `--color-info-container` no item + dot 8px `--color-info`; hover é shift de cor |
| Grupo de data | Faixa `--color-surface-tint` com rótulo mono uppercase (`Hoje`, `Ontem`, `Últimos 7 dias`, `Anteriores`) + contador; separador 1px `--color-outline-variant` |
| Chip de categoria | `app-badge`/`uw-tag` com `--font-family-mono`; categorias: Inscrições & Pagamentos, Documentação, Trabalhos & Avaliação, Certificados, Visão geral do Organizador |
| Container da lista | Card `--color-surface-bright` + borda 1px `--color-outline-variant`, `--radius-lg` |
| Toolbar (busca + categorias + não lidas) | `uw-search-field` + `uw-filter-pills` + `uw-toggle` em card de filtros |

### Timeline de etapas e avaliação por versão (área do participante)

Padrões validados no protótipo `participante-meus-trabalhos` (change `participant-work-detail-evaluation-views`):

| Padrão | Decisão |
|--------|---------|
| Trilha horizontal de etapas | `uw-progress-track` com `UwProgressStep[]`; estados `done` (círculo `--color-primary` + check), `current` (mesmo preenchimento + anel `color-mix(--color-primary 18%)`), `pending` (círculo `--color-surface-container` + `flag`) e `disabled` (círculo vazado tracejado `--color-outline-variant` + `remove`, label em itálico e `hint` de 0,59rem) |
| Etapa não percorrida | Sempre `disabled` + `hint` explicando o motivo ("não solicitada", "não necessária", "aguardando"); expõe `aria-disabled` e a trilha recebe `aria-label` com o caminho completo |
| Conector entre etapas | 2px `--color-outline-variant`; `--color-primary` quando a etapa seguinte foi concluída; tracejado quando a próxima está desabilitada |
| Desfecho reprovado | `tone="error"` no último passo: círculo `--color-error` + anel de 16% e label `--color-error` 600 |
| Avaliação no drawer | Painel `app-trabalho-avaliacao-painel`: nota hero (display 2rem/800) + `--color-surface-tint`, comentário aos autores em `--color-info-container`, critérios com barra de 4px colorida por faixa da nota |
| Avaliação por versão | `uw-accordion mode="single"` dentro do card da versão, separado por `border-top: 1px dashed`; trigger textual em `--color-primary` 0,75rem/600; versões antigas exibem apenas nota e data + aviso de dados parciais |

### Componentes de pagamento

Componentes compartilhados entre a inscrição pública e a área do participante, em `shared/components/pagamento/`:

| Componente | Uso |
|---|---|
| `app-pagamento-cartao-panel` | Formulário de cartão com prévia, bandeira, CPF do titular, parcelas e tokenização |
| `app-pagamento-pix-panel` | QR Code Pix, código copia e cola, validade e link do Mercado Pago |
| `app-pagamento-boleto-panel` | Linha digitável, PDF, vencimento e aviso de compensação |
| `app-pagamento-status-badge` | Status do pagamento de gateway |
| `app-pagamento-meios-grid` | Grade compacta de seleção de meio (2 colunas no mobile, até 4 na mesma linha a partir de `sm`) |
| `app-pagamento-resumo-inscricao` | Resumo da inscrição no modal (código, evento, valores e vencimento) |
| `app-pagamento-boleto-pagador-panel` | Dados do pagador do boleto (participante ou outro pagador, com endereço) |
| `app-pagamento-processando-modal` | Modal de processamento de cartão e geração de boleto |

Regras:
- dados do cartão nunca são enviados ao backend; apenas o token;
- CPF do titular é editável e vem pré-preenchido quando disponível;
- estados de erro usam `uw-alert` com mensagem objetiva;
- valores monetários usam o locale ativo (`pt-BR`, `es`, `en`).

## Regras invioláveis

1. **Zero gradientes** em dashboards e componentes funcionais (exceções aprovadas: sidebar active item, premium button, hero escuro do dashboard — participante e avaliador —, hero da listagem "Trabalhos p/ Avaliar" e as barras de progresso do dashboard do avaliador: hero, critérios da fila e nota média)
2. **Zero glassmorphism** — superfícies são sólidas
3. **Border-radius máximo: `--radius-xl`** (~18px)
4. **Sombras máximas**: 8px blur, 10% opacity
5. **Hover**: color shift — nunca shadow increase ou transform
6. **Animações**: máx 150ms, apenas opacity/color — sem bounce, sem scale

### Correção de trabalho (área do participante)

Padrões validados na change `participante-envio-correcao-trabalho` (protótipo `participante-meus-trabalhos`):

| Padrão | Decisão |
|---|---|
| CTA secundário no card | `uw-button` outline + `fullWidth`, empilhado abaixo de "Ver detalhes"; exibido apenas em "Revisão Necessária"; desabilitado com rótulo "Prazo de correção encerrado" |
| Modal de correção | `uw-modal size="md"` com identificação (código mono + título), `uw-alert` informativo, `uw-file-upload` de PDF até 10 MB, `uw-textarea` opcional (máx. 1000 caracteres) e rodapé com Cancelar (text) + Enviar (premium) |
| Cabeçalho do drawer | Chips de código + status + tipo na primeira linha, título em `--font-family-display` 17px/700 sem truncamento e evento em 12px com ícone, quebrando em até 2 linhas |


### Avaliação por versão (área do participante)

Padrões validados na change `avaliacoes-por-versao`:

| Padrão | Decisão |
|---|---|
| Aba Avaliação após reenvio | Exibe `uw-icon hourglass_top` + "Trabalho em avaliação" quando a versão corrente está `em_avaliacao`; nunca reaproveita nota/comentários da versão anterior |
| Histórico de versões | Ordem decrescente (mais recente primeiro); versão corrente marcada com pill "Atual" e nó preenchido com anel `--color-primary` |
| Avaliação por versão | Cada versão abre `app-trabalho-avaliacao-painel` com os seus próprios dados; versões legadas mantêm nota/data + aviso de dados parciais; versões sem avaliação exibem "Sem avaliação registrada nesta versão" |

### Acompanhamento financeiro (administrativo)

Padrões validados nos protótipos `acompanhamento-financeiro` e `inscricoes-pagas` (change `acompanhamento-financeiro-admin`):

| Padrão | Decisão |
|---|---|
| Card de gráfico | `uw-chart-card`: título display 15px/700, subtítulo 12px e badge mono 10,5px à direita; corpo com slot para gráfico e estado vazio/erro |
| Legenda de gráfico | `uw-chart-legend`: dot 9px com raio 3px, rótulo `body-sm` e valor mono 12px alinhado à direita; cor sempre acompanhada de nome |
| Gráficos | `@swimlane/ngx-charts` com `gradient: false`, paleta `--color-chart-1..7`; donut para situação e composição, barra horizontal para formas, área para evolução |
| KPI financeiro | `uw-stat-card variant="compact"` em grid de 5 colunas; valor monetário no locale ativo e aviso âmbar quando há recebimentos pagos sem data |
| Menu de exportação | `uw-export-menu`: botão primário sólido com ícone `table_view`, painel com CSV/Excel, loading com giro de 1s, fechamento por clique fora e Escape |
| Filtros de relatório | `uw-select` + dois `uw-date-picker` + `uw-search-field` em linha com wrap; largura mínima de 160px por campo |
| Tabela de conferência | `uw-table` lazy com avatar 32px/raio 9px, nome 12,5px/600, CPF mono 10,5px, valores mono 11,5px e valor recebido em peso 500 |
| Tag de forma de pagamento | `uw-tag` mono: PIX `primary`, cartões `soft`, boleto `warning`, TED/depósito/não informado `neutral`; `removable=false` |
| Nota de agregação de grupo | Rodapé 11px com ícone `info` esclarecendo que o valor soma inscrições pagas e não representa pagamento único |
| Intervalo de datas | Reutiliza `uw-date-picker` (CVA) com locale do app; presets podem ser adicionados com `uw-filter-pills` sem novo primitivo |

### Relatórios do evento (administrativo)

Padrões validados no protótipo `relatorios-evento` (change `relatorios-evento-admin`):

| Padrão | Decisão |
|---|---|
| Identificação do evento | `uw-event-context`: faixa `--color-primary-container` com raio `--radius-lg`, ícone `event_available` em quadrado branco, código `SIGLA-ANO` em mono 12px/500, nome display 14px/700 e metadados 11,5px |
| Chips da faixa do evento | Escopo em `success-container` com texto verde-escuro e ícone `filter_alt`; horário de geração em chip branco com `schedule`; ambos com `flex-wrap` e sem largura fixa |
| Indicador de recorte | `uw-stat-card` com `valueSize="lg"`; o total principal usa `bgColor="var(--color-surface-tint)"` (variante accent) e os demais fundo branco |
| Seleção de relatório | Duas linhas: evento (obrigatório, lazy) + tipo de relatório na primeira; situação e filtros contextuais (categoria/grupo/área/tipo de trabalho) na segunda, com `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` |
| Chip de obrigatoriedade | Texto 11px/600 em `surface-container` com ícone `lock`, reforçando que o evento é obrigatório |
| Prévia de arquivo | Bloco tracejado `color-mix(primary 35%)` com marca, código do evento, metadados, cabeçalho de tabela em `surface-tint` e linhas com `—`; nunca exibe a listagem real |
| Ausência de listagem | A tela não usa `uw-table`; os registros existem apenas no PDF e nos arquivos XLSX/CSV |
| Menu de exportação | `uw-export-menu` com XLSX (`table_view`), CSV (`description`) e PDF (`picture_as_pdf`); desabilitado enquanto não houver evento |
| Estado sem evento | `uw-empty-state` com ícone `assessment`, instrução de seleção e ações de exportação desabilitadas |
| Erro de resumo | Card `error-container` com ícone `error`, mensagem traduzida e `uw-button` "Tentar novamente" |
| Idioma | Rótulos sem largura fixa, indicadores com quebra de linha e datas/números no locale ativo; arquivos exportados são sempre gerados em pt-BR; `SIGLA-ANO` é neutro ao idioma |

### Layout de certificados (Configurações)

Padrões validados no protótipo `configuracao-layout-certificado` (change `configuracao-posicoes-certificado`):

| Padrão | Decisão |
|--------|---------|
| Pré-visualização A4 paisagem | Componente compartilhado `uw-certificate-layout-preview` em `shared/uw-ui/`: container com `aspect-ratio: 841.89 / 595.28`, `container-type: inline-size` e camadas absolutas posicionadas por percentual. Fonte convertida de points para `cqw` via `--campo-font-size`, garantindo escala com a largura do container |
| Camadas de texto | Nome, título e autores como parágrafos absolutos com `top`, `left`, `width`, `text-align` e `color` vindos da configuração; título limitado a 2 linhas (`line-clamp`) e autores a 1 linha com ellipsis. Sombra de 12% para legibilidade sobre a arte |
| Estado sem imagem | Fundo `--color-surface-tint`, borda tracejada `--color-outline-variant`, ícone `image` e legenda em 12px `--color-on-surface-variant` |
| Campo de coordenada | Par X/Y (percentual 0–100) com `uw-input type="number"`, `uw-form-field` com hint da faixa e agrupamento por texto (nome, título, autores). Sem interação de arrastar |
| Campo de cor | `uw-input` texto `#RRGGBB` + swatch 28×28 com `--radius-sm` e borda `--color-outline-variant` ao lado |
| Alinhamento | `uw-select-button-group size="sm"` com Esquerda/Centro/Direita, sendo `center` o padrão |
| Editor de campo | `app-certificado-campo-editor` (feature-local): card `--color-surface-bright`, borda `--color-outline-variant`, `--radius-md`, título display 13px/700 e grade responsiva 1 → 2 → 3 colunas |
| Impressão de teste | Ação outline com ícone `print`, habilitada apenas com configuração salva; abre a URL assinada em nova aba |




