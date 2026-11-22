## ADDED Requirements

### Requirement: Shell autenticado com navegação e identificação

O shell MUST ser exibido somente com sessão ativa e MUST apresentar sidebar, header, breadcrumb e área de conteúdo.

#### Scenario: Shell exibe a estrutura completa

- **GIVEN** que existe sessão ativa
- **WHEN** o visitante acessa a home
- **THEN** ele vê a sidebar, o header, o breadcrumb e o conteúdo da home
- **AND** a sidebar apresenta o menu principal e as ações de conta

#### Scenario: Identificação do usuário autenticado

- **GIVEN** que existe sessão ativa do usuário de demonstração
- **WHEN** o shell é exibido
- **THEN** o nome e o papel do usuário aparecem no header e na sidebar
- **AND** as iniciais do usuário aparecem no avatar

#### Scenario: Título e breadcrumb refletem a rota

- **GIVEN** que o visitante está na home
- **WHEN** o shell é exibido
- **THEN** o header mostra o título da página atual
- **AND** o breadcrumb mostra a origem e a página atual

### Requirement: Navegação pelo menu do shell

O menu MUST navegar para rotas existentes e MUST informar quando uma tela não faz parte da demonstração.

#### Scenario: Item com rota existente navega

- **GIVEN** que o visitante está no shell
- **WHEN** ele aciona o item “Visão geral”
- **THEN** a home é exibida

#### Scenario: Item sem rota exibe aviso de demonstração

- **GIVEN** que o visitante está no shell
- **WHEN** ele aciona um item de menu sem tela implementada
- **THEN** ele permanece na página atual
- **AND** recebe uma mensagem informando que a tela não faz parte da demonstração

### Requirement: Notificações mockadas no header

O header MUST exibir a contagem de notificações não lidas e MUST dar feedback ao interagir com o sino.

#### Scenario: Contagem de não lidas é exibida

- **GIVEN** que existem três notificações não lidas nos dados mockados
- **WHEN** o shell é exibido
- **THEN** o sino de notificações mostra a contagem 3

#### Scenario: Sem notificações não lidas

- **GIVEN** que não existem notificações não lidas
- **WHEN** o shell é exibido
- **THEN** o sino não exibe contador

#### Scenario: Interação com notificações

- **GIVEN** que o visitante está no shell
- **WHEN** ele aciona o sino de notificações
- **THEN** recebe um aviso de que o painel de notificações não faz parte desta demonstração

### Requirement: Encerramento da sessão

O logout MUST encerrar a sessão e MUST redirecionar o visitante para `/login`.

#### Scenario: Logout encerra a sessão e volta ao login

- **GIVEN** que o visitante está autenticado no shell
- **WHEN** ele aciona sair
- **THEN** a sessão é encerrada
- **AND** ele é redirecionado para `/login`
- **AND** a home não pode ser acessada novamente sem autenticar

### Requirement: Home com dados mockados e estados explícitos

A home MUST carregar dados mockados e MUST cobrir os estados de carregamento, vazio, erro e sucesso.

#### Scenario: Estado de carregamento

- **GIVEN** que o visitante autenticado acessa a home
- **WHEN** os dados simulados ainda estão sendo carregados
- **THEN** indicadores e listas exibem esqueletos de carregamento
- **AND** o shell permanece visível e navegável

#### Scenario: Estado de sucesso

- **GIVEN** que os dados simulados foram carregados
- **WHEN** a home é exibida
- **THEN** os quatro indicadores apresentam valores, rótulos e variações
- **AND** a lista de atividades recentes e o progresso do trimestre são exibidos
- **AND** a contagem de notificações não lidas é consistente com os dados

#### Scenario: Estado vazio

- **GIVEN** que a home é exibida sem atividades recentes
- **WHEN** a lista é renderizada
- **THEN** um estado vazio com título e descrição é exibido no lugar da lista
- **AND** o restante da home permanece utilizável

#### Scenario: Estado de erro com nova tentativa

- **GIVEN** que o carregamento dos dados simulados falha
- **WHEN** a home é exibida
- **THEN** uma mensagem de erro clara é exibida
- **AND** existe uma ação para tentar novamente
- **AND** ao acionar a ação os dados são recarregados

### Requirement: Ações de demonstração na home

Ações de demonstração MUST NOT alterar dados e MUST informar que são ilustrativas.

#### Scenario: Ação primária informa que é demonstrativa

- **GIVEN** que o visitante está na home
- **WHEN** ele aciona a ação primária de criar atividade
- **THEN** nenhum dado é alterado
- **AND** ele recebe uma mensagem informando que a ação é apenas demonstrativa

### Requirement: Responsividade do shell

O shell MUST se adaptar a desktop e a telas pequenas, transformando a sidebar em drawer abaixo de 900 px.

#### Scenario: Layout em desktop

- **GIVEN** que a largura da tela é maior que 900 px
- **WHEN** o shell é exibido
- **THEN** a sidebar fica fixa à esquerda com 240 px
- **AND** o conteúdo ocupa o restante da largura sem rolagem horizontal

#### Scenario: Layout em tela pequena

- **GIVEN** que a largura da tela é menor que 900 px
- **WHEN** o visitante acessa o shell
- **THEN** a sidebar vira um drawer fora da tela
- **AND** o botão de menu a abre
- **AND** o overlay fecha o drawer
- **AND** o conteúdo usa padding reduzido sem rolagem horizontal

#### Scenario: Sidebar recolhida em desktop

- **GIVEN** que o visitante está em desktop
- **WHEN** ele aciona recolher a sidebar
- **THEN** a sidebar passa a exibir apenas os ícones
- **AND** a área de conteúdo se expande

### Requirement: Acessibilidade do shell e da home

O shell e a home MUST usar marcos semânticos, MUST manter foco visível e MUST permitir navegação completa por teclado.

#### Scenario: Marcos e rótulos semânticos

- **GIVEN** que o shell é exibido
- **WHEN** um leitor de tela percorre a página
- **THEN** sidebar, header, breadcrumb, conteúdo e ações são anunciados com papéis e rótulos adequados
- **AND** a contagem de notificações é anunciada com o sino

#### Scenario: Navegação por teclado

- **GIVEN** que o visitante está no shell
- **WHEN** ele navega apenas com teclado
- **THEN** alcança os itens do menu, as ações do header e as ações da home
- **AND** o foco visível acompanha cada elemento

#### Scenario: Estados da home são anunciados

- **GIVEN** que a home muda de carregando para sucesso, vazio ou erro
- **WHEN** o estado é atualizado
- **THEN** a mudança é anunciada de forma não intrusiva
- **AND** o erro oferece ação acessível por teclado

### Requirement: Idiomas do shell

Shell e home MUST respeitar o idioma ativo e MUST manter paridade de chaves entre os catálogos.

#### Scenario: Shell e home respeitam o idioma ativo

- **GIVEN** que o visitante escolheu um idioma no login
- **WHEN** o shell e a home são exibidos
- **THEN** menus, títulos, breadcrumb, indicadores, atividades e mensagens usam o idioma escolhido

#### Scenario: Catálogos permanecem em paridade

- **GIVEN** que uma nova chave de i18n foi adicionada
- **WHEN** os catálogos pt-BR, en e es são comparados
- **THEN** todos contêm a mesma chave
- **AND** nenhuma tela exibe texto fixo fora dos catálogos
