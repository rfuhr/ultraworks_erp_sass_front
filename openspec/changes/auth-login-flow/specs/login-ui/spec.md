## ADDED Requirements

### Requirement: Tela de login

O sistema MUST exibir uma tela de login com tenant, e-mail e senha.

#### Scenario: Login com sucesso

- **GIVEN** um usuário ativo com membership ativo
- **WHEN** ele informa tenant, e-mail e senha válidos
- **THEN** o sistema MUST autenticar
- **AND** MUST redirecionar para `/app/home` ou para o seletor de contexto
- **AND** MUST exibir loading durante a requisição

#### Scenario: Credenciais inválidas

- **GIVEN** um e-mail/senha incorretos
- **WHEN** o usuário tenta entrar
- **THEN** MUST exibir mensagem genérica
- **AND** MUST manter o usuário na tela
- **AND** NÃO MUST revelar se o e-mail existe

#### Scenario: Tenant suspenso

- **GIVEN** um tenant suspenso
- **WHEN** o usuário tenta entrar
- **THEN** MUST exibir mensagem de acesso suspenso
- **AND** NÃO MUST emitir sessão

#### Scenario: Lockout

- **GIVEN** muitas tentativas inválidas
- **WHEN** o usuário tenta novamente
- **THEN** MUST exibir mensagem com tempo de espera
- **AND** MUST desabilitar o botão durante o bloqueio

### Requirement: Validação e acessibilidade

O sistema MUST validar os campos e ser acessível.

#### Scenario: Campo obrigatório

- **GIVEN** o formulário de login
- **WHEN** o usuário submete sem preencher
- **THEN** MUST exibir erro inline
- **AND** MUST focar o primeiro campo inválido

#### Scenario: Teclado

- **GIVEN** o formulário
- **WHEN** o usuário navega por Tab/Enter
- **THEN** MUST conseguir preencher e submeter
- **AND** o foco MUST ser visível

### Requirement: Responsividade

A tela MUST ser responsiva.

#### Scenario: Mobile

- **GIVEN** uma viewport mobile
- **WHEN** a tela renderiza
- **THEN** o card MUST ocupar a largura disponível com margem
- **AND** os campos MUST permanecer utilizáveis
