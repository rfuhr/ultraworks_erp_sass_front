import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Script one-off: promove as specs de uma change arquivada para openspec/specs.
const changeDir = 'openspec/changes/archive/2026-11-22-bootstrap-frontend-template/specs';
const specsDir = 'openspec/specs';

const purposes = {
  'bootstrap-workspace':
    'Define o workspace Angular executável, a estrutura de apps e libs, a navegação inicial, a configuração por ambiente e a identidade substituível.',
  'design-system-foundation':
    'Define tokens em duas camadas, tipografia, ícones, layout, documentação, contraste, movimento reduzido e rebranding sem reescrever componentes.',
  'uw-ui-library':
    'Define a biblioteca uw-ui genérica, suas convenções de nomenclatura, catálogo, Storybook, estados de feedback, acessibilidade, responsividade e layout presentational.',
  'agent-toolkit':
    'Define os agentes, subagentes, skills, regras de delegação e o ponto de entrada de orquestração do template.',
  'project-constitution':
    'Define a constituição genérica do template, a seção de especificação do frontend em aberto, a configuração OpenSpec e as referências documentais.',
  'frontend-quality-gates':
    'Define lint, verificação de tipos, testes unitários e de componente, Storybook, E2E, i18n, acessibilidade, build, entrega e pipeline contínuo.',
};

for (const capability of readdirSync(changeDir)) {
  const deltaPath = join(changeDir, capability, 'spec.md');
  const delta = readFileSync(deltaPath, 'utf8');

  const body = delta
    .replace(/^## ADDED Requirements\s*/m, '')
    .replace(/^## MODIFIED Requirements[\s\S]*$/m, '')
    .replace(/^## REMOVED Requirements[\s\S]*$/m, '')
    .replace(/^## RENAMED Requirements[\s\S]*$/m, '')
    .trim();

  const title = capability
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const main = [
    `# ${title}`,
    '',
    '## Purpose',
    '',
    purposes[capability] ?? 'Capability definida pelo template de frontend.',
    '',
    '## Requirements',
    '',
    body,
    '',
  ].join('\n');

  const targetDir = join(specsDir, capability);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'spec.md'), main);
  console.log(`Sincronizado: ${capability}`);
}
