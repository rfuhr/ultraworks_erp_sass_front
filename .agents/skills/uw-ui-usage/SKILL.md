# uw-ui-usage

Skill para uso correto dos componentes da biblioteca uw-ui no frontend Angular do ERP SaaS (base herdada do UltraEventos).

## Quando usar esta skill

- Ao implementar telas que usam componentes uw-ui
- Ao criar novos componentes que devem seguir o padrão uw-ui
- Ao revisar código que usa componentes uw-ui
- Ao consultar exemplos de uso e boas práticas

## Componentes disponíveis

### Form (Formulários)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwButtonComponent | `uw-button` | Botões de ação | `UW-UI/Form/Button` |
| CustomInputComponent | `uw-input` | Campos de texto | `UW-UI/Form/Input` |
| UwSelectComponent | `uw-select` | Seletores com busca/lazy load | `UW-UI/Form/Select` |
| UwCheckboxComponent | `uw-checkbox` | Checkboxes | `UW-UI/Form/Checkbox` |
| UwTextareaComponent | `uw-textarea` | Áreas de texto | `UW-UI/Form/Textarea` |
| UwRadioGroupComponent | `uw-radio-group` | Grupos de radio | `UW-UI/Form/RadioGroup` |
| UwFileUploadComponent | `uw-file-upload` | Upload de arquivos | `UW-UI/Form/FileUpload` |
| UwDatePickerComponent | `uw-date-picker` | Seletores de data | `UW-UI/Form/DatePicker` |
| UwInputTagComponent | `uw-input-tag` | Input com tags | `UW-UI/Form/InputTag` |
| UwSelectButtonGroupComponent | `uw-select-button-group` | Grupo de botões de seleção | `UW-UI/Form/SelectButtonGroup` |
| UwAutocompleteComponent | `uw-autocomplete` | Autocomplete | `UW-UI/Form/Autocomplete` |
| UwOtpInputComponent | `uw-otp-input` | Input OTP | `UW-UI/Form/OtpInput` |
| UwPickListComponent | `uw-pick-list` | Pick list | `UW-UI/Form/PickList` |
| UwSearchFieldComponent | `uw-search-field` | Campo de busca | `UW-UI/Form/SearchField` |
| UwSliderComponent | `uw-slider` | Slider | `UW-UI/Form/Slider` |
| UwToggleComponent | `uw-toggle` | Toggle switch | `UW-UI/Form/Toggle` |
| UwRatingComponent | `uw-rating` | Rating/avaliação | `UW-UI/Form/Rating` |

### Data (Exibição de Dados)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwTableComponent | `uw-table` | Tabelas de dados | `UW-UI/Data/Table` |
| UwCardComponent | `uw-card` | Cards de conteúdo | `UW-UI/Data/Card` |
| UwStatCardComponent | `uw-stat-card` | Cards de estatísticas | `UW-UI/Data/StatCard` |
| UwAvatarComponent | `uw-avatar` | Avatares de usuário | `UW-UI/Data/Avatar` |
| UwAvatarGroupComponent | `uw-avatar-group` | Grupo de avatares | `UW-UI/Data/AvatarGroup` |
| UwPaginationComponent | `uw-pagination` | Paginação | `UW-UI/Data/Pagination` |
| UwProgressBarComponent | `uw-progress-bar` | Barra de progresso | `UW-UI/Data/ProgressBar` |
| UwScoreBadgeComponent | `uw-score-badge` | Badge de pontuação | `UW-UI/Data/ScoreBadge` |
| UwSectionHeadingComponent | `uw-section-heading` | Cabeçalho de seção | `UW-UI/Data/SectionHeading` |
| BadgeComponent | `app-badge` | Badges | `UW-UI/Data/Badge` |
| UwChipComponent | `uw-chip` | Chips | `UW-UI/Data/Chip` |
| UwTagComponent | `uw-tag` | Tags | `UW-UI/Data/Tag` |
| UwSchedulerComponent | `uw-scheduler` | Agendamento | `UW-UI/Data/Scheduler` |

### Navigation (Navegação)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwTabsComponent | `uw-tabs` | Abas | `UW-UI/Navigation/Tabs` |
| UwStepperComponent | `uw-stepper` | Stepper/wizard | `UW-UI/Navigation/Stepper` |
| UwAccordionComponent | `uw-accordion` | Accordion | `UW-UI/Navigation/Accordion` |
| UwBreadcrumbComponent | `uw-breadcrumb` | Breadcrumb | `UW-UI/Navigation/Breadcrumb` |
| UwFilterPillsComponent | `uw-filter-pills` | Pills de filtro | `UW-UI/Navigation/FilterPills` |

### Feedback (Retorno Visual)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwAlertComponent | `uw-alert` | Alertas | `UW-UI/Feedback/Alert` |
| UwToastComponent | `uw-toast` | Toasts/notificações | `UW-UI/Feedback/Toast` |
| UwSpinnerComponent | `uw-spinner` | Spinner de loading | `UW-UI/Feedback/Spinner` |
| UwSkeletonComponent | `uw-skeleton` | Skeleton loading | `UW-UI/Feedback/Skeleton` |
| UwConfirmationComponent | `uw-confirmation` | Dialog de confirmação | `UW-UI/Feedback/Confirmation` |
| UwEmptyStateComponent | `uw-empty-state` | Estado vazio | `UW-UI/Feedback/EmptyState` |

### Layout (Estrutura)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwPanelComponent | `uw-panel` | Painel/container | `UW-UI/Layout/Panel` |
| UwPageHeaderComponent | `uw-page-header` | Cabeçalho de página | `UW-UI/Layout/PageHeader` |
| UwDividerComponent | `uw-divider` | Divisor | `UW-UI/Layout/Divider` |
| UwLayoutComponent | `uw-layout` | Layout principal | `UW-UI/Layout/Layout` |

### Utility (Utilitários)

| Componente | Selector | Uso | Storybook |
|------------|----------|-----|-----------|
| UwIconComponent | `uw-icon` | Ícones Material Symbols | `UW-UI/Utility/Icon` |
| UwTooltipDirective | `[uwTooltip]` | Tooltip | `UW-UI/Utility/Tooltip` |
| UwPopoverComponent | `uw-popover` | Popover | `UW-UI/Utility/Popover` |

## Exemplos de Uso

### Formulário de Cadastro

```html
<form [formGroup]="form">
  <div class="space-y-4">
    <uw-input
      formControlName="nome"
      label="Nome completo"
      placeholder="Digite seu nome"
      required
    />

    <uw-input
      formControlName="email"
      type="email"
      label="Email"
      placeholder="seu@email.com"
      icon="mail"
    />

    <uw-select
      formControlName="pais"
      label="País"
      placeholder="Selecione..."
      [registros]="paises"
      optionLabel="nome"
      optionValue="id"
    />

    <uw-checkbox
      formControlName="aceiteTermos"
      label="Aceito os termos de uso"
    />

    <uw-button
      type="submit"
      variant="primary"
      label="Cadastrar"
      icon="save"
    />
  </div>
</form>
```

### Tabela de Dados com Paginação

```html
<uw-card>
  <uw-table
    [columns]="columns"
    [data]="dados"
    [lazy]="true"
    [totalRecords]="totalRecords"
    [loading]="loading"
    selectionMode="single"
    (lazyLoad)="onLazyLoad($event)"
    (selectionChange)="onSelectionChange($event)"
  >
    <ng-template uwColTpl="status" let-item>
      <app-badge [variant]="item.ativo ? 'success' : 'danger'">
        {{ item.ativo ? 'Ativo' : 'Inativo' }}
      </app-badge>
    </ng-template>
  </uw-table>

  <uw-pagination
    [totalRecords]="totalRecords"
    [pageSize]="pageSize"
    [currentPage]="currentPage"
    (pageChange)="onPageChange($event)"
  />
</uw-card>
```

### Card com Stripe

```html
<uw-card stripe="success" [hoverable]="true">
  <div class="p-6">
    <h3 class="text-lg font-semibold mb-2">Pagamento Confirmado</h3>
    <p class="text-sm text-gray-600">
      Seu pagamento foi processado com sucesso.
    </p>
  </div>
</uw-card>
```

### Toast/Notificação

```typescript
import { ToastService } from '@shared/uw-ui/toast';

@Component({...})
export class MeuComponente {
  constructor(private toastService: ToastService) {}

  salvar() {
    // ... lógica de salvamento
    this.toastService.success('Registro salvo com sucesso!');
  }

  erro() {
    this.toastService.error('Erro ao salvar registro.');
  }
}
```

### Stepper/Wizard

```html
<uw-stepper [linear]="true">
  <uw-stepper-step label="Dados pessoais">
    <form-step-1 />
  </uw-stepper-step>

  <uw-stepper-step label="Endereço">
    <form-step-2 />
  </uw-stepper-step>

  <uw-stepper-step label="Confirmação">
    <form-step-3 />
  </uw-stepper-step>
</uw-stepper>
```

## Boas Práticas

### 1. Use componentes uw-ui ao invés de HTML nativo

**Correto:**
```html
<uw-button variant="primary" label="Salvar" />
<uw-input placeholder="Nome" />
```

**Incorreto:**
```html
<button class="btn-primary">Salvar</button>
<input type="text" placeholder="Nome" />
```

### 2. Respeite as variantes visuais

Cada componente tem variantes específicas para diferentes contextos:

- **Button**: `primary` (ação principal), `secondary` (ação secundária), `danger` (ação destrutiva)
- **Card**: `outlined` (com borda), `flat` (sem borda), com `stripe` para destaque visual
- **Badge**: `success` (sucesso), `danger` (erro/perigo), `warning` (aviso), `neutral` (info)

### 3. Use ícones Material Symbols

```html
<uw-icon name="check_circle" size="24" />
<uw-button icon="save" label="Salvar" />
<uw-input icon="search" placeholder="Buscar..." />
```

### 4. Integre com Reactive Forms

Todos os componentes de formulário suportam `ControlValueAccessor`:

```typescript
this.form = this.fb.group({
  nome: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  aceite: [false, Validators.requiredTrue],
});
```

```html
<uw-input formControlName="nome" />
<uw-checkbox formControlName="aceite" label="Aceito os termos" />
```

### 5. Use tokens CSS do design system

Ao customizar componentes, use os tokens CSS:

```css
.meu-component {
  background: var(--color-surface-bright);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-lg);
  color: var(--color-on-surface);
  font-family: var(--font-family-body);
}
```

### 6. Componentes standalone

Todos os componentes uw-ui são standalone. Importe diretamente:

```typescript
import { UwButtonComponent } from '@shared/uw-ui/button';
import { UwInputComponent } from '@shared/uw-ui/input';

@Component({
  standalone: true,
  imports: [UwButtonComponent, UwInputComponent],
})
```

## Anti-patterns

### 1. Não misture bibliotecas de UI

**Evite:**
```html
<!-- Não misture uw-ui com outras bibliotecas -->
<mat-button>Salvar</mat-button>
<uw-input placeholder="Nome" />
```

### 2. Não sobrescreva estilos dos componentes

**Evite:**
```css
/* Não sobrescreva estilos internos */
uw-button ::ng-deep .button-class {
  background: red !important;
}
```

**Prefira:**
```html
<!-- Use as variantes disponíveis -->
<uw-button variant="danger" label="Excluir" />
```

### 3. Não use `any` em eventos

**Evite:**
```typescript
onSelectionChange(event: any) { }
```

**Prefira:**
```typescript
onSelectionChange(event: MeuTipo[]) { }
```

### 4. Não ignore acessibilidade

**Evite:**
```html
<uw-button iconOnly icon="delete" />
```

**Prefira:**
```html
<uw-button iconOnly icon="delete" aria-label="Excluir registro" />
```

## Consultando o Storybook

Para ver todos os componentes e suas variantes em ação:

```bash
cd <raiz-do-repositorio-frontend>
pnpm storybook
```

Acesse `http://localhost:6006` para explorar:
- Todos os componentes organizados por categoria
- Controles interativos para testar props
- Documentação automática com inputs/outputs
- Exemplos de uso reais

## Recursos adicionais

- Design system: `docs/design-system.md`
- Protótipos: `docs/design/prototypes/`
- Specs de componentes: `openspec/specs/uw-*/spec.md`
