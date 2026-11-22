import { Injectable, signal } from '@angular/core';

export type DemoState = 'loading' | 'success' | 'empty' | 'error';

export interface DemoItem {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

@Injectable()
export class HomeDemoService {
  private readonly stateSignal = signal<DemoState>('loading');
  private readonly itemsSignal = signal<readonly DemoItem[]>([]);

  readonly state = this.stateSignal.asReadonly();
  readonly items = this.itemsSignal.asReadonly();

  load(mode: 'success' | 'empty' | 'error' = 'success'): void {
    this.stateSignal.set('loading');

    setTimeout(() => {
      if (mode === 'error') {
        this.itemsSignal.set([]);
        this.stateSignal.set('error');
        return;
      }

      if (mode === 'empty') {
        this.itemsSignal.set([]);
        this.stateSignal.set('empty');
        return;
      }

      this.itemsSignal.set([
        {
          id: '1',
          titleKey: 'home.items.design.title',
          descriptionKey: 'home.items.design.description',
        },
        {
          id: '2',
          titleKey: 'home.items.ui.title',
          descriptionKey: 'home.items.ui.description',
        },
      ]);
      this.stateSignal.set('success');
    }, 300);
  }
}
