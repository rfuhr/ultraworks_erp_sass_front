# Protótipo — Login

## Objetivo

Formulário de acesso de demonstração com **e-mail e senha apenas**, usando dados mockados e os
componentes do design system.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `codigo.html` | Referência visual estática (formulário, alerta de credenciais, erro e hint) |
| `screenshot.png` | Captura de referência do `codigo.html` |

## Mapeamento de design system

| Elemento | Regra / componente |
|---|---|
| Fundo da página | `--color-surface-container-low` |
| Cartão | `uw-card` / superfície `--color-surface`, borda `--color-outline`, raio `--radius-lg` |
| Marca | bloco quadrado com raio `--radius-md` (placeholder até haver logo do produto) |
| Título | `--font-family-display`, peso 600 |
| Campos | `uw-form-field` + `uw-input` (`type=email` / `type=password`) |
| Alerta informativo | `uw-alert variant="info"` |
| Erro de credenciais | `uw-alert variant="danger"` com `role="alert"` |
| Erro de campo | estado de erro do `uw-input` + texto associado |
| Botão | `uw-button variant="primary" type="submit" fullWidth` |
| Loading | botão desabilitado + `uw-spinner` |
| Foco | `:focus-visible` com anel de 2 px e offset |

## Estados

- **Loading:** submit desabilitado, spinner visível, campos somente leitura.
- **Erro de validação:** mensagens por campo, foco no primeiro inválido.
- **Erro de credenciais:** `uw-alert` com `role="alert"` e foco no alerta.
- **Sucesso:** toast e redirecionamento para `/`.
- **Já autenticado:** redirecionamento imediato para `/`.

## Acessibilidade e idiomas

- `label` associado a cada campo; erro referenciado por `aria-describedby`.
- Navegação por teclado e ordem lógica; contraste mínimo 4.5:1.
- Textos nos três idiomas (pt-BR, en, es) via catálogos.
- Credenciais de demonstração sempre visíveis para facilitar avaliação.

## Componentes `uw-ui`

`uw-card`, `uw-form-field`, `uw-input`, `uw-button`, `uw-alert`, `uw-spinner`, `uw-language-switcher`.
Nenhum componente novo é necessário.
