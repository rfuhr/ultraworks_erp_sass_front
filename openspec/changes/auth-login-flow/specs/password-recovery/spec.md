## ADDED Requirements

### Requirement: Solicitação de recuperação

O sistema MUST permitir solicitar recuperação de senha sem revelar se o e-mail existe.

#### Scenario: Solicitação

- **GIVEN** a tela “esqueci minha senha”
- **WHEN** o usuário informa e-mail/tenant
- **THEN** MUST exibir mensagem de confirmação genérica
- **AND** NÃO MUST revelar existência do e-mail
- **AND** MUST aplicar rate limit

#### Scenario: Muitas solicitações

- **GIVEN** muitas solicitações em pouco tempo
- **WHEN** o usuário tenta novamente
- **THEN** MUST exibir mensagem com tempo de espera
- **AND** NÃO MUST enviar novo e-mail

### Requirement: Redefinição de senha

O sistema MUST permitir redefinir a senha com token válido.

#### Scenario: Token válido

- **GIVEN** um token válido
- **WHEN** o usuário informa a nova senha
- **THEN** MUST validar a política de senha
- **AND** MUST redefinir a senha
- **AND** MUST redirecionar para login

#### Scenario: Token inválido/expirado

- **GIVEN** um token inválido/expirado
- **WHEN** o usuário tenta redefinir
- **THEN** MUST exibir erro claro
- **AND** MUST oferecer nova solicitação

### Requirement: Política de senha

O sistema MUST validar a política mínima de senha.

#### Scenario: Senha curta

- **GIVEN** uma senha com menos de 12 caracteres
- **WHEN** o usuário submete
- **THEN** MUST exibir erro
- **AND** NÃO MUST redefinir

#### Scenario: Senhas divergentes

- **GIVEN** confirmação diferente da senha
- **WHEN** o usuário submete
- **THEN** MUST exibir erro de confirmação

### Requirement: Acessibilidade

As telas de recuperação MUST ser acessíveis.

#### Scenario: Teclado

- **GIVEN** a tela de recuperação
- **WHEN** o usuário navega por teclado
- **THEN** MUST conseguir preencher e submeter
- **AND** o foco MUST ser visível
