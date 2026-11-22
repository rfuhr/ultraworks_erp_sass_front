import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

@Component({
  selector: 'uw-design-tokens-story',
  standalone: true,
  template: `
    <section class="tokens">
      <header>
        <h1>Design tokens</h1>
        <p>Troque a palette em um único ponto e veja os componentes reagirem.</p>
        <button type="button" (click)="rebrand()">Aplicar palette alternativa</button>
      </header>

      <div class="grid">
        @for (token of tokens; track token) {
          <article class="swatch" [style.background]="'var(' + token + ')'">
            <span>{{ token }}</span>
          </article>
        }
      </div>

      <div class="sample">
        <h2>Exemplo de superfície</h2>
        <p>Texto principal e secundário usando os tokens semânticos.</p>
        <button type="button" class="primary">Ação principal</button>
      </div>
    </section>
  `,
  styles: [
    `
      .tokens {
        display: grid;
        gap: 24px;
        font-family: var(--font-family-body);
        color: var(--color-on-surface);
      }

      header {
        display: grid;
        gap: 8px;
      }

      h1 {
        margin: 0;
        font-family: var(--font-family-display);
        font-size: 28px;
      }

      p {
        margin: 0;
        color: var(--color-on-surface-variant);
      }

      button {
        justify-self: start;
        border: 1px solid var(--color-primary);
        background: var(--color-primary);
        color: var(--color-on-primary);
        border-radius: var(--radius-md);
        padding: 8px 14px;
        cursor: pointer;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
      }

      .swatch {
        min-height: 88px;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-outline-variant);
        display: flex;
        align-items: flex-end;
        padding: 8px;
      }

      .swatch span {
        background: var(--color-surface);
        color: var(--color-on-surface);
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 4px;
      }

      .sample {
        border: 1px solid var(--color-outline-variant);
        border-radius: var(--radius-lg);
        padding: 16px;
        background: var(--color-surface-container-low);
      }

      .sample h2 {
        margin: 0 0 4px;
        font-size: 18px;
      }

      .sample p {
        margin: 0 0 12px;
      }
    `,
  ],
})
class DesignTokensStoryComponent {
  readonly tokens = [
    '--color-primary',
    '--color-secondary',
    '--color-tertiary',
    '--color-surface',
    '--color-surface-container',
    '--color-success',
    '--color-warning',
    '--color-error',
    '--color-info',
  ];

  rebrand(): void {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', '#0f766e');
    root.style.setProperty('--color-primary-container', '#ccfbf1');
    root.style.setProperty('--color-on-primary-container', '#042f2e');
  }
}

const meta: Meta<DesignTokensStoryComponent> = {
  title: 'Design System/Tokens',
  component: DesignTokensStoryComponent,
};

export default meta;
type Story = StoryObj<DesignTokensStoryComponent>;

export const Default: Story = {};
