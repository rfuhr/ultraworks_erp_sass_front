# Protótipos de Telas

Cada tela nova deve ter um protótipo antes da implementação.

## Estrutura

```text
docs/design/prototypes/<nome-da-tela>/
├── screenshot.png    # referência visual
├── codigo.html       # protótipo navegável (ou .tsx/.vue)
└── README.md         # objetivo, estados, componentes uw-ui usados
```

## Regras

- O protótipo deve usar os tokens do design system (`docs/design-system.md`).
- Mapear componentes `uw-ui` existentes antes de propor novos.
- Considerar estados: default, loading, empty, error, disabled.
- Considerar responsividade (mobile/tablet/desktop).
- Considerar acessibilidade (teclado, foco, contraste).
- O protótipo é referência; a implementação deve seguir o design system e a change correspondente.

## Fluxo

1. `design` cria o protótipo.
2. `requirements` valida o escopo.
3. `frontend` implementa.
4. `testing` cobre os estados.
5. `accessibility` revisa.
