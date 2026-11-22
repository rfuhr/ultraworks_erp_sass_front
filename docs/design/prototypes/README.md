# Protótipos de tela

Cada tela nova deve ter um protótipo aprovado antes da implementação.

## Estrutura

```
docs/design/prototypes/<nome-da-tela>/
├── screenshot.png   # imagem de referência
├── codigo.html      # HTML/CSS ou componente de referência
└── README.md        # mapeamento de componentes, tokens e decisões
```

## Fluxo

1. O agente `design` verifica se o protótipo existe.
2. Se não existir, cria o protótipo e salva os três artefatos.
3. Mapeia os elementos contra `docs/design/design-system.md` e
   `docs/design/uw-ui-catalog.md`.
4. Identifica componentes reutilizáveis e lacunas na `uw-ui`.
5. O agente `frontend` só implementa depois da aprovação.

## Regras

- O protótipo deve considerar os idiomas suportados (pt-BR, en, es).
- O protótipo deve prever loading, empty, error e success.
- Acessibilidade (teclado, foco, contraste) deve estar visível no protótipo.
- O README do protótipo lista os componentes `uw-*` usados e os novos
  componentes necessários.
