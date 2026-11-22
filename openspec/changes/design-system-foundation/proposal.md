## Why

O `bootstrap-frontend` cria a base técnica, mas sem identidade visual. O ERP precisa de tokens, tipografia, layout e documentação para que login, shell e componentes sejam consistentes. O design system do congresso será a base.

## What Changes

- Criar **tokens** de palette, cores semânticas, tipografia e bordas.
- Criar **theme.css** com aliases e tokens de sidebar.
- Configurar **fontes** (display/body/mono) e Material Symbols.
- Mapear tokens no **Tailwind CSS 4**.
- Documentar o design system no **Storybook**.
- Criar regras de uso e exemplos.
- Aplicar tokens na tela inicial de exemplo.

## Capabilities

### New Capabilities

- `design-tokens`: palette, cores semânticas, bordas e aliases.
- `typography-layout`: fontes, escala tipográfica, sidebar, espaçamento e grid.
- `design-system-docs`: documentação e exemplos no Storybook.

### Modified Capabilities

Nenhuma — o bootstrap não define design system.

## Non-goals

- Componentes `uw-ui` (change seguinte).
- Login e shell.
- Telas de negócio.
- Temas por tenant.
- Dark mode (fase futura).

## Impact

- **Arquivos:** `src/styles/tokens/*`, `src/styles/theme.css`, `src/styles/fonts`, `tailwind` config, Storybook docs.
- **Docs:** `docs/design-system.md` e `docs/design-tokens/`.
- **Sem mudança de contrato de API.**
