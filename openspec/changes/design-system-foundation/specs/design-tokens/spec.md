## ADDED Requirements

### Requirement: Tokens de cor

O sistema MUST usar tokens de cor em duas camadas: palette e semânticos.

#### Scenario: Uso de token semântico

- **GIVEN** um componente que precisa da cor primária
- **WHEN** ele é estilizado
- **THEN** MUST usar `var(--color-primary)`
- **AND** NÃO MUST usar valor hexadecimal hardcoded

#### Scenario: Nova cor

- **GIVEN** uma cor inexistente na palette
- **WHEN** ela é necessária
- **THEN** MUST ser adicionada à palette
- **AND** MUST ser mapeada para um token semântico

### Requirement: Tokens de borda

O sistema MUST usar tokens de raio para bordas.

#### Scenario: Card

- **GIVEN** um card
- **WHEN** ele é estilizado
- **THEN** MUST usar `var(--radius-lg)`
- **AND** NÃO MUST usar valor fixo fora dos tokens

### Requirement: Aliases legados

O sistema MUST manter aliases (`--primary`, `--surface`, etc.) para compatibilidade com componentes antigos.

#### Scenario: Componente legado

- **GIVEN** um componente que usa `--primary`
- **WHEN** ele é renderizado
- **THEN** o alias MUST resolver para `var(--color-primary)`
- **AND** o visual MUST permanecer consistente
