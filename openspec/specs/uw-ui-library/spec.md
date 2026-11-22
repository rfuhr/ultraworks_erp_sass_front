# Uw Ui Library

## Purpose

Define a biblioteca uw-ui genérica, suas convenções de nomenclatura, catálogo, Storybook, estados de feedback, acessibilidade, responsividade e layout presentational.

## Requirements

### Requirement: Biblioteca genérica e independente de domínio

A biblioteca `uw-ui` MUST conter apenas componentes genéricos, sem conhecimento de domínio, autenticação, HTTP ou tradução.

#### Scenario: Componente genérico é reutilizado por um produto

- **GIVEN** que uma tela de produto precisa de um botão
- **WHEN** o desenvolvedor usa a biblioteca de componentes
- **THEN** encontra o componente de botão documentado
- **AND** não precisa importar código de feature

#### Scenario: Acoplamento indevido é bloqueado

- **GIVEN** que um componente da biblioteca precisa exibir uma mensagem
- **WHEN** alguém tenta importar um serviço de autenticação ou dados dentro da biblioteca
- **THEN** a validação de dependências falha
- **AND** a mensagem indica que a tradução ou o dado deve chegar por input

### Requirement: Convenção de nomenclatura uw-*

Todo componente da biblioteca MUST seguir classe `Uw<Nome>Component`, selector `uw-<nome>` e prefixo de estilo próprio.

#### Scenario: Novo componente segue a convenção

- **GIVEN** que um novo componente será adicionado à biblioteca
- **WHEN** ele é registrado
- **THEN** a classe e o selector seguem o padrão `Uw`/`uw-`
- **AND** seus estilos são namespaced pelo nome do componente

#### Scenario: Seletor legado não é aceito

- **GIVEN** que um componente é copiado de um projeto anterior
- **WHEN** ele mantém um selector com prefixo legado
- **THEN** a validação de lint falha
- **AND** a tabela de renomeação documentada indica o novo nome

### Requirement: Catálogo de componentes da faixa padrão

A biblioteca MUST disponibilizar a faixa padrão de componentes genéricos portados, cobrindo formulários, dados, navegação, feedback, layout e utilidades.

#### Scenario: Conjunto mínimo de componentes está disponível

- **GIVEN** que o template acabou de ser criado
- **WHEN** o desenvolvedor consulta o catálogo
- **THEN** encontra componentes de formulário, dados, navegação, feedback, layout e utilidades
- **AND** cada componente informa sua faixa de disponibilidade

#### Scenario: Componente fora da faixa padrão não entra no bundle

- **GIVEN** que um componente exige dependência pesada ou é específico de domínio
- **WHEN** a aplicação padrão é construída
- **THEN** esse componente não faz parte do bundle
- **AND** a documentação explica como adicioná-lo opcionalmente

### Requirement: Storybook e documentação por componente

Todo componente da faixa padrão MUST ter história no Storybook com variantes e estados.

#### Scenario: Storybook é construído com o catálogo

- **GIVEN** que a biblioteca está íntegra
- **WHEN** o Storybook é construído
- **THEN** cada componente da faixa padrão possui ao menos uma história
- **AND** a construção termina sem erros

#### Scenario: Variantes e estados são visíveis

- **GIVEN** que um componente possui variantes e estados
- **WHEN** o desenvolvedor abre sua história
- **THEN** consegue visualizar default, hover, foco, desabilitado, carregando e erro quando aplicáveis

### Requirement: Estados de feedback padronizados

Os componentes MUST representar loading, empty, error e success de forma consistente.

#### Scenario: Botão em carregamento bloqueia ação duplicada

- **GIVEN** que um botão iniciou uma ação assíncrona
- **WHEN** o usuário tenta acioná-lo novamente
- **THEN** o botão permanece em estado de carregamento
- **AND** nenhuma segunda ação é disparada

#### Scenario: Tabela vazia exibe estado vazio

- **GIVEN** que uma consulta retorna zero registros
- **WHEN** a tabela é renderizada
- **THEN** o usuário vê uma mensagem de estado vazio
- **AND** a ação de criação permanece disponível

#### Scenario: Erro de ação é comunicado

- **GIVEN** que uma ação do componente falha
- **WHEN** o erro é recebido
- **THEN** o usuário vê uma mensagem clara e acionável

### Requirement: Acessibilidade e navegação por teclado

Os componentes interativos MUST ser navegáveis por teclado, com foco visível e atributos ARIA quando necessários.

#### Scenario: Modal prende o foco

- **GIVEN** que um modal está aberto
- **WHEN** o usuário navega com Tab
- **THEN** o foco permanece dentro do modal
- **AND** a tecla Escape fecha o modal devolvendo o foco ao elemento de origem

#### Scenario: Componente de formulário anuncia erro

- **GIVEN** que um campo de formulário está inválido
- **WHEN** o campo recebe foco
- **THEN** o leitor de tela anuncia a mensagem de erro associada

### Requirement: Comportamento responsivo dos componentes

Os componentes MUST se adaptar aos breakpoints definidos sem perda de funcionalidade.

#### Scenario: Tabela larga permite rolagem controlada

- **GIVEN** que a viewport é menor que a largura mínima da tabela
- **WHEN** a tabela é exibida
- **THEN** ela permite rolagem horizontal dentro do próprio container
- **AND** a página não ganha rolagem horizontal

#### Scenario: Drawer ocupa a tela em mobile

- **GIVEN** que a viewport é de celular
- **WHEN** um drawer é aberto
- **THEN** ele ocupa a largura disponível
- **AND** mantém a ação de fechar acessível

### Requirement: Layout presentational

O layout administrativo MUST receber dados e configuração por inputs e comunicar intenções por outputs, sem depender de autenticação ou serviços de domínio.

#### Scenario: Shell do produto fornece o menu

- **GIVEN** que o app quer usar o layout administrativo
- **WHEN** ele renderiza o layout
- **THEN** fornece itens de menu, perfil e notificações como entradas
- **AND** reage aos eventos emitidos pelo layout

#### Scenario: Layout funciona sem serviço de autenticação

- **GIVEN** que a biblioteca é importada isoladamente no Storybook
- **WHEN** o layout é renderizado com dados de exemplo
- **THEN** ele funciona sem provider de autenticação
- **AND** nenhuma chamada HTTP é disparada
