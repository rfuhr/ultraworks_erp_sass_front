# 0013. Código é a fonte única de verdade dos tokens

- Status: accepted
- Date: 2026-11-22

## Context

No projeto de referência, os tokens existem em `src/styles/tokens/` e também em cópias de CSS dentro de `docs/`. As duas fontes podem divergir: um token alterado no código não atualiza a documentação, e uma alteração feita na documentação não chega à aplicação.

O template precisa de uma regra que impeça essa duplicação e torne a evolução do design system previsível.

## Decision

- Os tokens vivem **apenas** em `libs/tokens/src/styles/tokens/` (`palette.css`, `colors.css`, `typography.css`, `borders.css`) e `theme.css`.
- `docs/design/design-system.md` e `docs/design/design-tokens.md` documentam nomes, uso e valores, com links para os arquivos de código — **sem duplicar CSS**.
- Componentes consomem exclusivamente tokens semânticos; cores hardcoded são proibidas.
- A verificação de estilo sinaliza valores de cor literais em componentes.

## Consequences

- **Positivo:** uma única fonte de verdade elimina drift entre documentação e aplicação.
- **Positivo:** rebranding exige alteração em um único lugar.
- **Positivo:** revisão de PR consegue verificar tokens e documentação juntos.
- **Negativo:** a documentação é descritiva, não executável; exige atualização manual dos textos.
- **Negativo:** consumidores externos não podem copiar o CSS da documentação.

## Alternatives considered

- **Duplicar o CSS em `docs/`:** rejeitado por criar drift e confusão sobre a fonte da verdade.
- **Gerar a documentação a partir do CSS:** viável como evolução futura, mas com custo e ferramental desnecessários agora.
- **Manter apenas os docs e remover os tokens do código:** inviável; os componentes precisam dos tokens em runtime.
