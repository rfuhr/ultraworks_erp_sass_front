import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const libDir = 'libs/uw-ui/src/lib';
const output = 'docs/design/uw-ui-catalog.md';

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const rows = [];
for (const file of walk(libDir)) {
  if (!/\.(component|directive)\.ts$/.test(file)) continue;
  if (file.includes(`${join('lib', 'layout')}`)) continue;

  const content = readFileSync(file, 'utf8');
  const selector = content.match(/selector:\s*'([^']+)'/)?.[1];
  const className = content.match(/export class (\w+)/)?.[1];
  if (!selector || !className) continue;

  const dir = file.split(/[\\/]/).slice(0, -1).join('/');
  const category = file.includes('/directives/') ? 'Utility' : dir.split('/').at(-1);
  const storyFile = walk(dir).find((entry) => entry.endsWith('.stories.ts'));

  rows.push({
    selector,
    className,
    category,
    story: storyFile ? relative('docs/design', storyFile).replaceAll('\\', '/') : '',
  });
}

rows.sort((a, b) => a.category.localeCompare(b.category) || a.selector.localeCompare(b.selector));

const lines = [
  '# Catálogo uw-ui',
  '',
  'Componentes genéricos disponíveis no template. A fonte de verdade é `libs/uw-ui/src/lib/`.',
  '',
  '| Componente | Selector | Categoria | História |',
  '|---|---|---|---|',
  ...rows.map(
    (row) =>
      `| \`${row.className}\` | \`${row.selector}\` | ${row.category} | ${
        row.story ? `[abrir](${row.story})` : '—'
      } |`,
  ),
  '',
  '## Fora da faixa padrão',
  '',
  '- **Faixa B (opt-in):** `html-editor` (Quill) e `scheduler` (rrule). Ver `uw-ui-extending.md`.',
  '- **Faixa C (domínio):** componentes de evento, certificado, pagamento, notificações e células específicas de negócio. Não fazem parte do template.',
  '',
];

writeFileSync(output, lines.join('\n'));
console.log(`Catálogo gerado com ${rows.length} componentes em ${output}`);
