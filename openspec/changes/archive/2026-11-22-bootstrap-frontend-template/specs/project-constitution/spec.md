## ADDED Requirements

### Requirement: Constituição genérica do template

`openspec/project.md` MUST descrever o template sem assumir produto, domínio, quantidade de apps ou modelo de autenticação.

#### Scenario: Constituição não menciona produto específico

- **GIVEN** que um desenvolvedor lê a constituição do projeto
- **WHEN** ele procura referências a ERP, eventos ou nome de produto
- **THEN** encontra apenas termos genéricos
- **AND** a única seção específica é a de especificação do frontend

#### Scenario: Stack e estrutura são compreensíveis

- **GIVEN** que um novo projeto será criado a partir do template
- **WHEN** o desenvolvedor lê a constituição
- **THEN** entende a stack, a estrutura de pastas e as regras de dependência
- **AND** sabe onde registrar decisões arquiteturais

### Requirement: Seção de especificação do frontend em aberto

`openspec/project.md` MUST conter uma seção “Especificação do Frontend” com campos placeholders a serem preenchidos na primeira change de produto.

#### Scenario: Seção está presente e vazia

- **GIVEN** que o template acabou de ser criado
- **WHEN** o desenvolvedor abre a seção de especificação
- **THEN** encontra campos para produto, domínio, público, módulos, identidade visual, API, idiomas e requisitos regulatórios
- **AND** os campos estão marcados como pendentes

#### Scenario: Primeira change de produto preenche a especificação

- **GIVEN** que um produto será construído a partir do template
- **WHEN** a primeira change de produto é proposta
- **THEN** a seção de especificação é preenchida
- **AND** as demais seções da constituição permanecem genéricas

### Requirement: Configuração OpenSpec genérica e válida

`openspec/config.yaml` MUST declarar contexto e regras genéricas, sem apps fixos, autenticação ou multi-tenancy de produto.

#### Scenario: Configuração não referencia apps antigos

- **GIVEN** que a configuração é carregada
- **WHEN** o desenvolvedor procura por apps ou headers de produto
- **THEN** não encontra referências a `erp`, `platform-admin` ou headers de tenant
- **AND** as regras de proposal, specs, design e tasks são aplicáveis a qualquer produto

#### Scenario: Comandos do OpenSpec executam sem avisos de configuração

- **GIVEN** que a configuração foi normalizada
- **WHEN** um artefato é gerado ou o status é consultado
- **THEN** nenhum aviso sobre formato de regras é exibido
- **AND** o artefato é criado no caminho esperado

### Requirement: Referências documentais resolvem

A constituição e a configuração MUST referenciar apenas arquivos existentes no repositório.

#### Scenario: Links da constituição são válidos

- **GIVEN** que a constituição é revisada
- **WHEN** um link interno é aberto
- **THEN** o arquivo de destino existe
- **AND** descreve o tema referenciado

#### Scenario: Documento ausente é sinalizado

- **GIVEN** que uma referência aponta para um documento inexistente
- **WHEN** a validação documental é executada
- **THEN** a referência é reportada como quebrada
- **AND** a correção é feita antes do merge

### Requirement: Idioma e workflow padronizados

Os artefatos do OpenSpec MUST ser escritos em português brasileiro e seguir o schema `intent-driven`.

#### Scenario: Artefato é criado em português

- **GIVEN** que um novo artefato será criado
- **WHEN** ele é gerado
- **THEN** o conteúdo está em português brasileiro
- **AND** os cabeçalhos do schema são preservados

#### Scenario: Fluxo de artefatos é respeitado

- **GIVEN** que uma change está em andamento
- **WHEN** o desenvolvedor consulta o status
- **THEN** a sequência proposal → specs/design → adr → tasks é apresentada
- **AND** artefatos bloqueados indicam suas dependências
