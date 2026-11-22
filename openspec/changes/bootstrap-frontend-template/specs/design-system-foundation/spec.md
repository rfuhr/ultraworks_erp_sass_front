## ADDED Requirements

### Requirement: Tokens em duas camadas

O design system MUST definir tokens de palette e tokens semânticos, e os componentes MUST consumir apenas os tokens semânticos.

#### Scenario: Componente usa tokens semânticos

- **GIVEN** que um componente visual precisa de cor de fundo e texto
- **WHEN** ele é implementado
- **THEN** usa variáveis semânticas do tema
- **AND** não declara valores de cor hardcoded

#### Scenario: Cor fora do token é rejeitada na revisão

- **GIVEN** que um componente declara uma cor hexadecimal diretamente
- **WHEN** a revisão de estilo é executada
- **THEN** a ocorrência é sinalizada como violação do design system

### Requirement: Tipografia e ícones

O template MUST fornecer fontes de display, corpo e mono, além do conjunto de ícones Material Symbols self-hosted.

#### Scenario: Fontes carregam sem dependência externa

- **GIVEN** que a aplicação inicia sem acesso à internet
- **WHEN** uma tela com texto e ícones é exibida
- **THEN** as fontes e os ícones são carregados localmente
- **AND** o layout não sofre deslocamento visível

#### Scenario: Escala tipográfica é aplicada

- **GIVEN** que uma tela usa título, subtítulo e corpo de texto
- **WHEN** ela é renderizada
- **THEN** os tamanhos e pesos correspondem à escala documentada

### Requirement: Layout, espaçamento e responsividade

O design system MUST definir sidebar de 240px, conteúdo fluido, grid de 12 colunas e ritmo de 8px, com comportamento responsivo.

#### Scenario: Layout desktop mantém a sidebar fixa

- **GIVEN** que a viewport tem largura de desktop
- **WHEN** uma tela é aberta
- **THEN** a sidebar ocupa 240px e o conteúdo ocupa o espaço restante
- **AND** o espaçamento entre blocos segue múltiplos de 8px

#### Scenario: Layout mobile colapsa a navegação

- **GIVEN** que a viewport tem largura de celular
- **WHEN** o usuário abre a navegação
- **THEN** a sidebar é apresentada como drawer sobre o conteúdo
- **AND** pode ser fechada por teclado ou toque fora dela

### Requirement: Documentação do design system

O template MUST documentar tokens, tipografia, layout e componentes em `docs/design/`, apontando para o código como fonte de verdade.

#### Scenario: Desenvolvedor encontra a origem de um token

- **GIVEN** que um desenvolvedor consulta a documentação de cores
- **WHEN** ele procura o token de cor primária
- **THEN** encontra o nome do token, seu uso e o arquivo de código correspondente

#### Scenario: Documentação não duplica CSS

- **GIVEN** que um token é alterado no código
- **WHEN** a documentação é consultada
- **THEN** ela descreve o novo valor sem manter uma cópia do CSS

### Requirement: Acessibilidade visual dos tokens

Os tokens MUST garantir contraste mínimo de 4.5:1 para texto normal e respeito a `prefers-reduced-motion`.

#### Scenario: Texto sobre superfície tem contraste adequado

- **GIVEN** que um texto é exibido sobre uma superfície do tema
- **WHEN** o contraste é medido
- **THEN** a razão é de pelo menos 4.5:1

#### Scenario: Movimento é reduzido quando solicitado

- **GIVEN** que o sistema operacional solicita movimento reduzido
- **WHEN** o usuário interage com um componente animado
- **THEN** as transições não essenciais são desativadas

### Requirement: Rebranding sem reescrever componentes

O template MUST permitir trocar a identidade visual alterando apenas os tokens.

#### Scenario: Nova palette atualiza a interface

- **GIVEN** que a palette do template é substituída por outra marca
- **WHEN** as telas são recarregadas
- **THEN** as cores e tipografia refletem a nova marca
- **AND** nenhum componente precisa ser editado
