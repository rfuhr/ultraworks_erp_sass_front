## ADDED Requirements

### Requirement: Access token em memória

O sistema MUST armazenar o access token apenas em memória.

#### Scenario: Navegação

- **GIVEN** um usuário autenticado
- **WHEN** navega entre rotas
- **THEN** o access token MUST permanecer disponível em memória
- **AND** NÃO MUST ser gravado em `localStorage`/`sessionStorage`

#### Scenario: Recarregar página

- **GIVEN** uma página recarregada
- **WHEN** o app inicia
- **THEN** MUST tentar restaurar a sessão via refresh/`me`
- **AND** se falhar, MUST redirecionar para login

### Requirement: Refresh automático

O sistema MUST renovar o access token em 401 sem duplicar chamadas.

#### Scenario: 401 em requisição

- **GIVEN** um access token expirado
- **WHEN** uma requisição retorna 401
- **THEN** o sistema MUST chamar refresh uma única vez
- **AND** MUST repetir a requisição original após sucesso

#### Scenario: Refresh falha

- **GIVEN** refresh inválido/expirado
- **WHEN** o sistema tenta renovar
- **THEN** MUST limpar a sessão
- **AND** MUST redirecionar para login

### Requirement: Logout

O sistema MUST permitir logout e limpar a sessão.

#### Scenario: Logout

- **GIVEN** um usuário autenticado
- **WHEN** ele aciona logout
- **THEN** MUST revogar a sessão no backend
- **AND** MUST limpar tokens/contexto/cache
- **AND** MUST redirecionar para login

### Requirement: Guards

O sistema MUST proteger rotas autenticadas.

#### Scenario: Rota protegida sem sessão

- **GIVEN** nenhum usuário autenticado
- **WHEN** acessa `/app/home`
- **THEN** MUST redirecionar para `/auth/login`

#### Scenario: Sem permissão

- **GIVEN** um usuário sem a permissão necessária
- **WHEN** acessa a rota
- **THEN** MUST redirecionar para `/403` ou exibir acesso negado
