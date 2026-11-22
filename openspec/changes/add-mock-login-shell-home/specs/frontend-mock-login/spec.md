## ADDED Requirements

### Requirement: Formulário de acesso com e-mail e senha

O sistema MUST oferecer um formulário de acesso com apenas e-mail e senha, reutilizando os componentes existentes do design system (`uw-form-field`, `uw-input`, `uw-button`, `uw-alert`, `uw-spinner`). Os dados são mockados e nenhuma chamada HTTP é realizada.

#### Scenario: Formulário exibe apenas e-mail e senha

- **GIVEN** que o visitante acessa `/login` sem sessão ativa
- **WHEN** a página é exibida
- **THEN** ele vê um campo de e-mail, um campo de senha e o botão de entrar
- **AND** não vê seletor de perfil, identificador de organização ou campo adicional

#### Scenario: Credenciais de demonstração são apresentadas

- **GIVEN** que o visitante está em `/login`
- **WHEN** a página é exibida
- **THEN** ele vê uma indicação das credenciais de demonstração

### Requirement: Validação dos campos de acesso

O sistema MUST validar o formato do e-mail e o preenchimento da senha antes de enviar as credenciais.

#### Scenario: Campos obrigatórios vazios

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele tenta entrar com e-mail e senha vazios
- **THEN** o acesso não é enviado
- **AND** cada campo obrigatório exibe uma mensagem de erro
- **AND** o foco vai para o primeiro campo inválido

#### Scenario: E-mail com formato inválido

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele informa um e-mail sem formato válido e uma senha preenchida
- **THEN** o acesso não é enviado
- **AND** o campo de e-mail exibe erro de formato

#### Scenario: Senha abaixo do mínimo

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele informa um e-mail válido e uma senha com menos de 6 caracteres
- **THEN** o acesso não é enviado
- **AND** o campo de senha exibe a regra de tamanho mínimo

### Requirement: Autenticação com dados mockados

O sistema MUST autenticar somente com as credenciais de demonstração e MUST manter a sessão apenas em memória.

#### Scenario: Credenciais válidas autenticam o visitante

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele informa `demo@frontend.dev` e `demo1234`
- **THEN** uma sessão de demonstração é iniciada
- **AND** o visitante é levado para a home do shell

#### Scenario: Credenciais inválidas são rejeitadas

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele informa credenciais diferentes das de demonstração
- **THEN** nenhuma sessão é criada
- **AND** uma mensagem de credenciais inválidas é exibida
- **AND** o visitante permanece em `/login`

#### Scenario: Sessão não persiste após recarregar a página

- **GIVEN** que o visitante autenticado está na home
- **WHEN** ele recarrega a página
- **THEN** a sessão em memória é perdida
- **AND** ele é redirecionado para `/login`

### Requirement: Estado de carregamento do acesso

O sistema MUST impedir envios duplicados e MUST indicar visualmente o carregamento até a conclusão da autenticação.

#### Scenario: Envio exibe carregamento e bloqueia duplicidade

- **GIVEN** que o visitante preencheu credenciais válidas
- **WHEN** ele aciona entrar
- **THEN** o botão fica desabilitado e um indicador de carregamento é exibido
- **AND** novos envios são ignorados até a conclusão

#### Scenario: Carregamento termina após o resultado

- **GIVEN** que o acesso está em andamento
- **WHEN** a autenticação simulada é concluída
- **THEN** o indicador de carregamento desaparece
- **AND** o foco retorna ao resultado (home ou mensagem de erro)

### Requirement: Proteção de rotas e sessão ativa

O sistema MUST proteger as rotas do shell e MUST redirecionar visitantes sem sessão para `/login`.

#### Scenario: Visitante sem sessão é redirecionado para o login

- **GIVEN** que não existe sessão ativa
- **WHEN** o visitante acessa a home `/`
- **THEN** ele é redirecionado para `/login`
- **AND** a home não é exibida

#### Scenario: Visitante autenticado acessa a home

- **GIVEN** que existe sessão ativa
- **WHEN** o visitante acessa `/`
- **THEN** o shell e a home são exibidos

#### Scenario: Visitante autenticado acessa o login

- **GIVEN** que existe sessão ativa
- **WHEN** o visitante acessa `/login`
- **THEN** ele é redirecionado para a home

### Requirement: Acessibilidade do login

A tela de login MUST ser operável por teclado, MUST manter foco visível e MUST associar mensagens de erro aos campos correspondentes.

#### Scenario: Navegação por teclado

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele navega usando apenas o teclado
- **THEN** consegue alcançar os campos, o botão de entrar e o seletor de idioma
- **AND** o foco visível acompanha cada elemento

#### Scenario: Erros são anunciados

- **GIVEN** que o formulário foi enviado com dados inválidos
- **WHEN** os erros são exibidos
- **THEN** cada mensagem está associada ao campo correspondente
- **AND** a mensagem de erro de credenciais é anunciada como alerta

#### Scenario: Contraste e alvos de toque

- **GIVEN** que o visitante usa a tela de login
- **WHEN** ele interage com textos e controles
- **THEN** o contraste atende WCAG 2.1 AA
- **AND** os controles têm alvo de toque de pelo menos 44×44 px em telas pequenas

### Requirement: Responsividade do login

A tela de login MUST se adaptar a telas pequenas sem provocar rolagem horizontal.

#### Scenario: Login em tela pequena

- **GIVEN** que a largura da tela é menor que 640 px
- **WHEN** o visitante acessa `/login`
- **THEN** o formulário ocupa a largura disponível sem rolagem horizontal
- **AND** todos os campos e o botão permanecem visíveis e utilizáveis

### Requirement: Idiomas do login

Todo texto visível da tela de login MUST vir dos catálogos de i18n nos três idiomas suportados.

#### Scenario: Textos traduzidos nos três idiomas

- **GIVEN** que o visitante está em `/login`
- **WHEN** ele alterna entre pt-BR, en e es
- **THEN** rótulos, dicas, erros e botões são exibidos no idioma escolhido
- **AND** a preferência é mantida ao recarregar

#### Scenario: Nenhuma string visível hardcoded

- **GIVEN** que a tela de login é inspecionada
- **WHEN** o idioma é alterado
- **THEN** todo texto visível muda conforme o catálogo do idioma
- **AND** nenhum texto de interface permanece fixo em português
