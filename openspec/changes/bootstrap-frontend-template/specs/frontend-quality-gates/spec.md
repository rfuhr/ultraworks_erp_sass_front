## ADDED Requirements

### Requirement: Lint e verificação de tipos

O template MUST validar lint e tipos em todos os projetos antes de aceitar uma alteração.

#### Scenario: Código com tipo inválido é rejeitado

- **GIVEN** que uma alteração introduz um valor incompatível com o tipo declarado
- **WHEN** a verificação de tipos é executada
- **THEN** o comando termina com erro
- **AND** o arquivo e a linha são identificados

#### Scenario: Código sem `any` passa na validação

- **GIVEN** que uma alteração não usa `any` e segue as regras de lint
- **WHEN** lint e verificação de tipos são executados
- **THEN** ambos terminam com sucesso

### Requirement: Testes unitários e cobertura por camada

O template MUST configurar testes unitários e metas de cobertura para infraestrutura, features e componentes compartilhados.

#### Scenario: Cobertura abaixo da meta falha no pipeline

- **GIVEN** que a cobertura de `core` ou `data` fica abaixo de 80%
- **WHEN** os testes são executados no pipeline
- **THEN** o pipeline falha
- **AND** o relatório indica a camada e o percentual

#### Scenario: Testes de componente cobrem interação

- **GIVEN** que um componente de página possui formulário ou ação
- **WHEN** os testes de componente são executados
- **THEN** os fluxos de sucesso e erro são verificados
- **AND** os testes seguem o padrão Arrange / Act / Assert

### Requirement: Storybook como gate de componentes

O template MUST construir o Storybook no pipeline e exigir história para todo componente da faixa padrão.

#### Scenario: Componente sem história falha na validação

- **GIVEN** que um componente da faixa padrão foi adicionado sem história
- **WHEN** a validação de componentes é executada
- **THEN** a ausência é reportada
- **AND** o pipeline não é aprovado

#### Scenario: Build do Storybook é publicado como artefato

- **GIVEN** que todas as histórias estão válidas
- **WHEN** o pipeline executa o build do Storybook
- **THEN** o artefato estático é gerado
- **AND** pode ser publicado para consulta

### Requirement: Testes E2E dos fluxos do template

O template MUST executar testes E2E dos fluxos que ele entrega.

#### Scenario: Fluxo de rota inicial e 404 passa

- **GIVEN** que a aplicação está construída para teste
- **WHEN** o teste E2E abre a rota inicial e uma rota inexistente
- **THEN** a rota inicial carrega corretamente
- **AND** a rota inexistente exibe a página 404

#### Scenario: Falha de E2E bloqueia a entrega

- **GIVEN** que um fluxo crítico está quebrado
- **WHEN** o pipeline executa os testes E2E
- **THEN** o pipeline falha
- **AND** o relatório aponta o passo que falhou

### Requirement: Baseline de i18n

O template MUST usar `@ngx-translate/core` com pt-BR como padrão e en/es opcionais, sem strings visíveis hardcoded.

#### Scenario: String visível vem do catálogo

- **GIVEN** que uma tela exibe um rótulo de ação
- **WHEN** o código é revisado
- **THEN** o rótulo é obtido do catálogo de tradução
- **AND** não há texto fixo no template do componente

#### Scenario: Idioma pode ser alternado

- **GIVEN** que a aplicação está em pt-BR
- **WHEN** o usuário troca para inglês
- **THEN** os textos visíveis passam a ser exibidos em inglês
- **AND** a preferência é preservada na sessão

#### Scenario: Chave ausente é detectada

- **GIVEN** que uma chave usada não existe no catálogo padrão
- **WHEN** a validação de i18n é executada
- **THEN** a chave ausente é reportada
- **AND** a tela não exibe texto quebrado

### Requirement: Baseline de acessibilidade

O template MUST atender WCAG 2.1 AA nos fluxos que entrega.

#### Scenario: Navegação por teclado funciona

- **GIVEN** que o usuário não usa mouse
- **WHEN** ele percorre a tela inicial e a página 404
- **THEN** todos os elementos interativos são alcançáveis
- **AND** o foco é sempre visível

#### Scenario: Contraste e semântica são verificados

- **GIVEN** que uma tela é revisada
- **WHEN** a auditoria de acessibilidade é executada
- **THEN** o contraste mínimo e os rótulos acessíveis são atendidos
- **AND** violações bloqueiam o merge

### Requirement: Build e entrega reproduzíveis

O template MUST gerar build de produção e uma imagem Docker servida por nginx com fallback de SPA e headers de segurança.

#### Scenario: Container serve a SPA com fallback

- **GIVEN** que a imagem de produção foi construída
- **WHEN** uma rota interna é acessada diretamente
- **THEN** o nginx entrega o `index.html`
- **AND** a aplicação resolve a rota no cliente

#### Scenario: Headers de segurança estão presentes

- **GIVEN** que a aplicação é servida pelo container
- **WHEN** uma resposta é inspecionada
- **THEN** os headers de segurança configurados estão presentes
- **AND** os assets com hash possuem cache adequado

### Requirement: Pipeline contínuo

O template MUST ter um pipeline que executa lint, typecheck, testes, build e build do Storybook.

#### Scenario: Pipeline completa com sucesso

- **GIVEN** que todas as verificações passam localmente
- **WHEN** o pipeline é executado
- **THEN** todas as etapas concluem com sucesso
- **AND** os artefatos de build são publicados

#### Scenario: Etapa falha interrompe o pipeline

- **GIVEN** que uma etapa falha
- **WHEN** o pipeline é executado
- **THEN** as etapas seguintes não são executadas
- **AND** o log indica a etapa e o motivo da falha
