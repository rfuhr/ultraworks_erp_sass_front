## ADDED Requirements

### Requirement: Agentes de frontend disponíveis

O repositório MUST disponibilizar os subagentes de frontend, design, testes, segurança, requisitos e arquitetura em `.agents/`, cada um com suas skills declaradas.

#### Scenario: Orquestrador encontra os agentes

- **GIVEN** que um desenvolvedor inicia uma tarefa de frontend
- **WHEN** ele consulta os agentes disponíveis
- **THEN** encontra os agentes de frontend, design, testes, segurança, requisitos e arquitetura
- **AND** cada agente descreve quando deve ser invocado

#### Scenario: Agente inválido não é registrado

- **GIVEN** que um arquivo de agente referencia uma skill inexistente
- **WHEN** o toolkit é validado
- **THEN** a validação falha
- **AND** a mensagem identifica a skill ausente

### Requirement: Skills de frontend carregáveis

O repositório MUST incluir as skills de design system, uso da `uw-ui`, Angular, prototipação, testes, acessibilidade, erros, segurança e autoria de specs.

#### Scenario: Agente de frontend carrega as skills corretas

- **GIVEN** que o agente de frontend é invocado
- **WHEN** ele precisa implementar uma tela
- **THEN** tem acesso às skills de Angular, design system, `uw-ui`, testes e segurança
- **AND** as referências de cada skill estão presentes no repositório

#### Scenario: Skill de prototipação orienta o design

- **GIVEN** que o agente de design vai criar uma tela
- **WHEN** ele carrega a skill de prototipação
- **THEN** encontra o fluxo de criação e armazenamento em `docs/design/prototypes/`
- **AND** entende que a aprovação do protótipo precede a implementação

### Requirement: Regra de delegação entre design e frontend

O toolkit MUST definir que o design prototipa e o frontend implementa, sem sobreposição de responsabilidades.

#### Scenario: Tela nova passa pelo design primeiro

- **GIVEN** que uma tela nova será implementada
- **WHEN** o orquestrador recebe a demanda
- **THEN** delega primeiro ao agente de design
- **AND** só depois encaminha a implementação ao agente de frontend

#### Scenario: Frontend não inventa protótipo

- **GIVEN** que não existe protótipo para uma tela
- **WHEN** o agente de frontend é invocado
- **THEN** ele interrompe a implementação e solicita o protótipo
- **AND** não cria a tela por conta própria

### Requirement: Conteúdo do toolkit é genérico

Os agentes e skills MUST ser independentes de domínio, produto ou projeto de origem.

#### Scenario: Referências ao projeto de origem são removidas

- **GIVEN** que um agente ou skill é importado do projeto de referência
- **WHEN** o conteúdo é revisado
- **THEN** não há menções a domínio de eventos, ERP, nomes de produto ou caminhos antigos
- **AND** exemplos usam termos neutros

#### Scenario: Skill de domínio é substituída por placeholder

- **GIVEN** que o projeto de referência possui uma skill de domínio específica
- **WHEN** o toolkit é criado
- **THEN** existe uma skill de contexto de domínio que lê `docs/domain/`
- **AND** ela orienta o preenchimento quando o diretório está vazio

### Requirement: Ponto de entrada único para orquestração

O repositório MUST ter um `AGENTS.md` com a tabela de agentes, o mapa de skills e o fluxo de delegação.

#### Scenario: Novo colaborador entende o fluxo

- **GIVEN** que um colaborador abre o repositório pela primeira vez
- **WHEN** ele lê o `AGENTS.md`
- **THEN** entende quais agentes existem e quando usar cada um
- **AND** conhece a ordem de delegação para uma feature completa

#### Scenario: Regra de componente é explícita

- **GIVEN** que um colaborador vai criar um componente Angular
- **WHEN** ele consulta o `AGENTS.md`
- **THEN** encontra a regra de arquivos separados de template e estilo
- **AND** é direcionado ao fluxo de design system e `uw-ui`
