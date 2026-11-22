# Inventário de Componentes (`uw-ui`)

Fonte no congresso: `apps/frontend/src/app/shared/uw-ui/`.
Convenção: classe `Uw<Nome>Component` (ou `Uw<Nome>Directive`), selector `uw-<nome>`, standalone, `ChangeDetectionStrategy.OnPush`, `ViewEncapsulation.None` e história no Storybook.

Legenda:

- **Reutilizar** — copiar/adaptar com pouca mudança.
- **Adaptar** — renomear/ajustar ao domínio ERP.
- **Criar** — novo componente específico do ERP.
- **Descartar** — específico de eventos/congressos.

---

## 1. Formulários

| Componente | Selector | Ação | Observação |
|---|---|---|---|
| `UwButtonComponent` | `uw-button` | Reutilizar | Variantes primary/secondary/outline/ghost/soft/text/premium/danger/alert |
| `CustomInputComponent` | `uw-input` | Reutilizar | Texto, número, senha, máscara |
| `UwSelectComponent` | `uw-select` | Reutilizar | Busca/lazy load |
| `UwCheckboxComponent` | `uw-checkbox` | Reutilizar | — |
| `UwTextareaComponent` | `uw-textarea` | Reutilizar | — |
| `UwRadioGroupComponent` | `uw-radio-group` | Reutilizar | — |
| `UwDatePickerComponent` | `uw-date-picker` | Reutilizar | — |
| `UwFileUploadComponent` | `uw-file-upload` | Reutilizar | — |
| `UwSearchFieldComponent` | `uw-search-field` | Reutilizar | Debounce |
| `UwFormFieldComponent` | `uw-form-field` | Reutilizar | Label/erro/hint |
| `UwInputTagComponent` | `uw-input-tag` | Reutilizar | — |
| `UwAutocompleteComponent` | `uw-autocomplete` | Reutilizar | — |
| `UwPickListComponent` | `uw-pick-list` | Reutilizar | — |
| `UwOtpInputComponent` | `uw-otp-input` | Reutilizar | MFA futura |
| `UwSliderComponent` | `uw-slider` | Reutilizar | — |
| `UwRatingComponent` | `uw-rating` | Reutilizar | — |
| `UwToggleComponent` | `uw-toggle` | Reutilizar | — |
| `UwToggleCardComponent` | `uw-toggle-card` | Reutilizar | Configurações |
| `UwLanguageSwitcherComponent` | `uw-language-switcher` | Reutilizar | pt-BR/en/es |

---

## 2. Dados

| Componente | Selector | Ação | Observação |
|---|---|---|---|
| `UwTableComponent` | `uw-table` | Reutilizar | Lazy load, sort, filtros, seleção |
| `UwCardComponent` | `uw-card` | Reutilizar | — |
| `UwStatCardComponent` | `uw-stat-card` | Reutilizar | Home/dashboard |
| `UwAvatarComponent` | `uw-avatar` | Reutilizar | — |
| `UwAvatarGroupComponent` | `uw-avatar-group` | Reutilizar | — |
| `UwPaginationComponent` | `uw-pagination` | Reutilizar | — |
| `UwProgressBarComponent` | `uw-progress-bar` | Reutilizar | — |
| `UwProgressTrackComponent` | `uw-progress-track` | Reutilizar | — |
| `UwChartCardComponent` | `uw-chart-card` | Reutilizar | ngx-charts |
| `UwChartLegendComponent` | `uw-chart-legend` | Reutilizar | — |
| `UwTimelineComponent` | `uw-timeline` | Reutilizar | Atividades |
| `UwTimelineItemComponent` | `uw-timeline-item` | Reutilizar | — |
| `UwSectionHeadingComponent` | `uw-section-heading` | Reutilizar | — |
| `UwCopyFieldComponent` | `uw-copy-field` | Reutilizar | — |
| `UwExportMenuComponent` | `uw-export-menu` | Reutilizar | Exportações |
| `UwScheduler*` | `uw-scheduler` | Adaptar/Descartar | Só se houver agenda no ERP |
| `UwDocViewerComponent` | `uw-doc-viewer` | Adaptar | Visualização de documentos |
| `UwEventContextComponent` | `uw-event-context` | Descartar | Específico de eventos |
| `UwCertificateLayoutPreviewComponent` | `uw-certificate-layout-preview` | Descartar | Específico de certificados |
| `UwScoreBadgeComponent` | `uw-score-badge` | Adaptar/Descartar | Só se houver avaliação |

---

## 3. Navegação

| Componente | Selector | Ação |
|---|---|---|
| `UwTabsComponent` | `uw-tabs` | Reutilizar |
| `UwStepperComponent` | `uw-stepper` | Reutilizar |
| `UwAccordionComponent` | `uw-accordion` | Reutilizar |
| `UwBreadcrumbComponent` | `uw-breadcrumb` | Reutilizar |
| `UwFilterPillsComponent` | `uw-filter-pills` | Reutilizar |

---

## 4. Feedback

| Componente | Selector | Ação |
|---|---|---|
| `UwAlertComponent` | `uw-alert` | Reutilizar |
| `UwToastComponent` | `uw-toast` | Reutilizar |
| `UwSpinnerComponent` | `uw-spinner` | Reutilizar |
| `UwSkeletonComponent` | `uw-skeleton` | Reutilizar |
| `UwConfirmationComponent` | `uw-confirmation` | Reutilizar |
| `UwEmptyStateComponent` | `uw-empty-state` | Reutilizar |

---

## 5. Layout

| Componente | Selector | Ação | Observação |
|---|---|---|---|
| `UwAdminLayoutComponent` | `uw-admin-layout` | Reutilizar | Shell principal |
| `AppHeaderComponent` | `app-header` | Reutilizar | Header |
| `AppSidebarComponent` | `app-sidebar` | Reutilizar | Sidebar 240px |
| `AppSubheaderComponent` | `app-subheader` | Reutilizar | Breadcrumb |
| `UwPageHeaderComponent` | `uw-page-header` | Reutilizar | Título + ação |
| `UwPanelComponent` | `uw-panel` | Reutilizar | Container |
| `UwModalComponent` | `uw-modal` | Reutilizar | Formulários |
| `UwDrawerComponent` | `uw-drawer` | Reutilizar | Detalhes |
| `UwDividerComponent` | `uw-divider` | Reutilizar | — |
| `UwActionCardComponent` | `uw-action-card` | Reutilizar | Atalhos |

---

## 6. Utilitários

| Componente/Diretiva | Selector | Ação |
|---|---|---|
| `UwIconComponent` | `uw-icon` | Reutilizar |
| `UwTagComponent` | `uw-tag` | Reutilizar |
| `UwChipComponent` | `uw-chip` | Reutilizar |
| `BadgeComponent` | `app-badge` | Reutilizar/renomear |
| `UwTooltipDirective` | `[uwTooltip]` | Reutilizar |
| `UWRipple` | `[uwRipple]` | Reutilizar |
| `UWBadge` | `[uwBadge]` | Reutilizar |
| `UwAutofocusDirective` | `[uwAutofocus]` | Reutilizar |
| `UWPopoverTrigger` | `[uwPopoverTriggerFor]` | Reutilizar |
| `UwHelpComponent` | `uw-help` | Reutilizar (contextual help) |
| `AppPerfilBadgeComponent` | `app-perfil-badge` | Adaptar → `uw-user-role-badge` |
| `AppStatusBadgeComponent` | `app-status-badge` | Reutilizar/renomear |
| `UwNotification*` | `uw-notification-*` | Reutilizar | Central de notificações |

---

## 7. Componentes novos do ERP

| Componente | Selector | Objetivo |
|---|---|---|
| `UwTenantSwitcherComponent` | `uw-tenant-switcher` | Trocar tenant (quando o usuário tem múltiplos) |
| `UwCompanySwitcherComponent` | `uw-company-switcher` | Selecionar empresa/filial |
| `UwContextBadgeComponent` | `uw-context-badge` | Exibir tenant/empresa/filial atual |
| `UwPlanBadgeComponent` | `uw-plan-badge` | Plano/assinatura |
| `UwQuotaMeterComponent` | `uw-quota-meter` | Uso vs limite |
| `UwFeatureGateComponent` | `uw-feature-gate` | Renderizar conforme entitlement |
| `UwConfirmDialogComponent` | `uw-confirm-dialog` | Confirmações de ação sensível |
| `UwDataTableComponent` | `uw-data-table` | Wrapper do `uw-table` com filtros/paginação do ERP |

---

## 8. Regras de componentização

1. Componente novo nasce em `shared/uw-ui/<nome>/`.
2. Standalone, `OnPush`, `ViewEncapsulation.None`.
3. Inputs/outputs tipados; sem `any`.
4. Storybook obrigatório.
5. Testes unitários/componente.
6. Tokens do design system; sem cor hardcoded.
7. Acessibilidade: `aria-*`, foco, teclado.
8. Se for específico de uma feature, fica em `features/<...>/components`, não em `shared/uw-ui`.

---

## 9. Caminhos de origem no congresso

```text
apps/frontend/src/app/shared/uw-ui/<componente>/
apps/frontend/src/app/shared/components/          # componentes compartilhados legados
apps/frontend/src/app/shared/uw-ui/layout/        # shell
apps/frontend/src/app/shared/uw-ui/help/          # ajuda contextual
apps/frontend/src/app/core/services/dialog/       # diálogos
apps/frontend/src/app/core/services/notification/ # notificações
```

Consulte `docs/reuse-map.md` para a lista completa.
