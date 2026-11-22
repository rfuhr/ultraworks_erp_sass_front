## ADDED Requirements

### Requirement: Build de produção

O sistema MUST gerar build de produção otimizado.

#### Scenario: Build de produção

- **GIVEN** o código-fonte
- **WHEN** `pnpm build --configuration production` executa
- **THEN** o build MUST concluir
- **AND** os assets MUST ter hash
- **AND** o bundle MUST respeitar os budgets

### Requirement: Imagem Docker

O sistema MUST produzir uma imagem Docker multi-stage servida por nginx.

#### Scenario: Build da imagem

- **GIVEN** o repositório
- **WHEN** `docker build -t erp-frontend .` executa
- **THEN** a imagem MUST ser construída
- **AND** o runtime MUST ser nginx
- **AND** o processo MUST rodar como usuário não-root (quando possível)

#### Scenario: Execução

- **GIVEN** a imagem construída
- **WHEN** o container inicia
- **THEN** a SPA MUST ser servida na porta configurada

### Requirement: Fallback SPA

O servidor MUST redirecionar rotas desconhecidas para `index.html`.

#### Scenario: Rota profunda

- **GIVEN** a rota `/app/home`
- **WHEN** o navegador acessa diretamente
- **THEN** o nginx MUST servir `index.html`
- **AND** o Angular Router MUST resolver a rota

#### Scenario: Asset inexistente

- **GIVEN** um asset inexistente
- **WHEN** o navegador solicita
- **THEN** o servidor MUST retornar 404
- **AND** NÃO MUST servir `index.html` para assets

### Requirement: Headers de segurança

O servidor MUST enviar headers de segurança básicos.

#### Scenario: Headers

- **GIVEN** uma resposta do nginx
- **WHEN** os headers são inspecionados
- **THEN** MUST conter `X-Content-Type-Options: nosniff`
- **AND** MUST conter `Referrer-Policy`
- **AND** MUST conter CSP compatível com a aplicação
