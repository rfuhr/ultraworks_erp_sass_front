## ADDED Requirements

### Requirement: Idioma padrão

O sistema MUST usar pt-BR como idioma padrão.

#### Scenario: Primeiro acesso

- **GIVEN** um usuário sem preferência salva
- **WHEN** o app inicia
- **THEN** o idioma MUST ser pt-BR
- **AND** as strings MUST ser traduzidas

#### Scenario: Fallback

- **GIVEN** uma chave ausente no idioma ativo
- **WHEN** a tela renderiza
- **THEN** MUST usar o fallback pt-BR
- **AND** NÃO MUST exibir chave crua

### Requirement: Troca de idioma

O sistema MUST permitir trocar o idioma.

#### Scenario: Language switcher

- **GIVEN** o app aberto
- **WHEN** o usuário escolhe en/es
- **THEN** a interface MUST atualizar
- **AND** a preferência MUST ser persistida

#### Scenario: Backend

- **GIVEN** um idioma ativo
- **WHEN** uma requisição é feita
- **THEN** `Accept-Language` MUST ser enviado
- **AND** mensagens do backend MUST usar o idioma quando suportado

### Requirement: Sem strings hardcoded

O sistema MUST NOT ter strings visíveis hardcoded.

#### Scenario: Nova tela

- **GIVEN** uma tela nova
- **WHEN** o PR é revisado
- **THEN** todas as strings MUST usar chaves de tradução
- **AND** MUST existir nos arquivos de i18n

### Requirement: Formatação por locale

O sistema MUST formatar datas, números e moeda por locale.

#### Scenario: Data

- **GIVEN** uma data exibida
- **WHEN** o idioma é pt-BR
- **THEN** MUST usar formato brasileiro
- **AND** ao trocar para en, MUST adaptar

#### Scenario: Moeda

- **GIVEN** um valor monetário
- **WHEN** exibido
- **THEN** MUST usar a moeda/locale configurado
