import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const catalogDir = __dirname;
const appDir = join(__dirname, '../../../../../apps/frontend/src/app');

function loadCatalog(language: string): Record<string, string> {
  return JSON.parse(readFileSync(join(catalogDir, `${language}.json`), 'utf8')) as Record<
    string,
    string
  >;
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function usedKeys(): string[] {
  const keys = new Set<string>();
  for (const file of walk(appDir)) {
    if (!file.endsWith('.html')) continue;
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(/'([^']+)'\s*\|\s*translate/g)) {
      keys.add(match[1]);
    }
  }
  return [...keys];
}

describe('catálogos de i18n', () => {
  const ptBr = loadCatalog('pt-br');
  const en = loadCatalog('en');
  const es = loadCatalog('es');

  it('devem ter as mesmas chaves em todos os idiomas', () => {
    const ptKeys = Object.keys(ptBr).sort();
    expect(Object.keys(en).sort()).toEqual(ptKeys);
    expect(Object.keys(es).sort()).toEqual(ptKeys);
  });

  it('devem cobrir todas as chaves usadas nos templates', () => {
    const missing = usedKeys().filter((key) => !(key in ptBr));
    expect(missing).toEqual([]);
  });

  it('não devem ter valores vazios', () => {
    for (const [key, value] of Object.entries(ptBr)) {
      if (value.trim() === '') {
        throw new Error(`chave vazia: ${key}`);
      }
    }
  });
});
