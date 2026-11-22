# Bootstrap Workspace

## Purpose

Define o workspace Angular executável, a estrutura de apps e libs, a navegação inicial, a configuração por ambiente e a identidade substituível.

## Requirements

### Requirement: Workspace executável

O template MUST fornecer um workspace Angular executável, com app padrão e bibliotecas compiláveis de forma independente.

#### Scenario: Aplicação inicia em desenvolvimento

- **GIVEN** que o template foi clonado e as dependências foram instaladas
- **WHEN** o desenvolvedor executa o comando de desenvolvimento
- **THEN** a aplicação é servida localmente
- **AND** a rota inicial é exibida sem erros no console do navegador

#### Scenario: Build de produção é gerado

- **GIVEN** que o workspace está íntegro
- **WHEN** o build de produção é executado
- **THEN** os artefatos do app e das libs são gerados
- **AND** o build termina sem erros de tipo

### Requirement: Estrutura de apps e libs

O template MUST organizar o código em um app padrão (`apps/frontend`) e nas libs `tokens`, `uw-ui`, `core`, `data` e `i18n`, com aliases de importação.

#### Scenario: Nova funcionalidade usa a estrutura prevista

- **GIVEN** que um desenvolvedor vai criar uma funcionalidade
- **WHEN** ele consulta a estrutura do workspace
- **THEN** encontra pastas separadas para app, design tokens, componentes, infraestrutura, dados e traduções
- **AND** os imports usam os aliases documentados

#### Scenario: Direção de dependência é respeitada

- **GIVEN** que a biblioteca `uw-ui` deve ser genérica
- **WHEN** alguém adiciona um import de `core`, `data` ou `i18n` dentro de `uw-ui`
- **THEN** a validação de lint falha com uma mensagem explicando a direção permitida

### Requirement: Navegação inicial e página 404

O template MUST oferecer uma rota inicial de exemplo e uma página 404 para rotas desconhecidas.

#### Scenario: Rota desconhecida exibe a página 404

- **GIVEN** que a aplicação está aberta
- **WHEN** o usuário acessa uma rota inexistente
- **THEN** ele vê uma página 404 com mensagem clara
- **AND** há uma ação para voltar à rota inicial

#### Scenario: Página 404 é acessível e responsiva

- **GIVEN** que o usuário está na página 404
- **WHEN** ele navega apenas com o teclado em uma tela pequena
- **THEN** o foco é visível e segue uma ordem lógica
- **AND** o conteúdo se adapta à largura da tela sem rolagem horizontal

### Requirement: Configuração por ambiente

O template MUST permitir configurar a URL da API por ambiente, sem alterar código de feature.

#### Scenario: Ambiente define a URL da API

- **GIVEN** que o ambiente de desenvolvimento está selecionado
- **WHEN** a aplicação é iniciada
- **THEN** as chamadas HTTP usam a URL configurada para esse ambiente
- **AND** nenhuma URL de API fica hardcoded em componentes

#### Scenario: Configuração inválida impede a inicialização

- **GIVEN** que a configuração do ambiente está incompleta
- **WHEN** a aplicação tenta iniciar
- **THEN** a inicialização falha com uma mensagem explícita sobre a configuração ausente

### Requirement: Estados de carregamento, vazio e erro na tela inicial

A rota inicial de exemplo MUST demonstrar os estados de carregamento, vazio, erro e sucesso.

#### Scenario: Conteúdo carrega com feedback visual

- **GIVEN** que a rota inicial busca dados de exemplo
- **WHEN** a busca está em andamento
- **THEN** o usuário vê um indicador de carregamento
- **AND** o conteúdo substitui o indicador ao concluir

#### Scenario: Falha exibe erro com ação de recuperação

- **GIVEN** que a busca de dados de exemplo falha
- **WHEN** o erro é recebido
- **THEN** o usuário vê uma mensagem de erro
- **AND** há uma ação para tentar novamente

#### Scenario: Ausência de dados exibe estado vazio

- **GIVEN** que a busca termina sem resultados
- **WHEN** a tela é renderizada
- **THEN** o usuário vê um estado vazio com descrição
- **AND** a ação primária da tela permanece disponível

### Requirement: Identidade do template é substituível

O template MUST permitir renomear o produto sem reescrever a estrutura do workspace.

#### Scenario: Nome do produto é trocado em um único ponto

- **GIVEN** que um novo projeto será criado a partir do template
- **WHEN** o desenvolvedor atualiza o nome do produto e a identificação visual
- **THEN** a aplicação exibe o novo nome no título e na navegação
- **AND** nenhuma referência ao produto anterior permanece nas telas
