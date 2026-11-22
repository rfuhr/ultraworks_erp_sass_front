import { Injectable, signal } from '@angular/core';
import {
  ActivityItem,
  DashboardMetric,
  HomeState,
  ProgressItem,
} from './home-dashboard.models';
import { HOME_DASHBOARD_FIXTURES } from './home-dashboard.fixtures';

type LoadMode = 'success' | 'empty' | 'error';

/**
 * Fonte de dados mockada da home. Simula latência e expõe os quatro estados
 * obrigatórios do design system. Pode ser substituída por um repositório HTTP
 * quando houver backend.
 */
@Injectable({ providedIn: 'root' })
export class HomeDashboardService {
  /** Latência simulada, configurável em testes. */
  latencyMs = 400;

  private readonly stateSignal = signal<HomeState>('loading');
  private readonly metricsSignal = signal<readonly DashboardMetric[]>([]);
  private readonly activitiesSignal = signal<readonly ActivityItem[]>([]);
  private readonly progressSignal = signal<readonly ProgressItem[]>([]);
  private readonly unreadCountSignal = signal(0);

  readonly state = this.stateSignal.asReadonly();
  readonly metrics = this.metricsSignal.asReadonly();
  readonly activities = this.activitiesSignal.asReadonly();
  readonly progress = this.progressSignal.asReadonly();
  readonly unreadCount = this.unreadCountSignal.asReadonly();

  private timer: ReturnType<typeof setTimeout> | null = null;

  load(mode: LoadMode = 'success'): void {
    this.stateSignal.set('loading');
    this.metricsSignal.set([]);
    this.activitiesSignal.set([]);
    this.progressSignal.set([]);
    this.unreadCountSignal.set(0);

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.timer = null;
      this.applyMode(mode);
    }, this.latencyMs);
  }

  retry(): void {
    this.load('success');
  }

  private applyMode(mode: LoadMode): void {
    if (mode === 'error') {
      this.stateSignal.set('error');
      return;
    }

    this.metricsSignal.set(HOME_DASHBOARD_FIXTURES.metrics);
    this.progressSignal.set(HOME_DASHBOARD_FIXTURES.progress);
    this.unreadCountSignal.set(HOME_DASHBOARD_FIXTURES.unreadCount);

    if (mode === 'empty') {
      this.activitiesSignal.set([]);
      this.stateSignal.set('empty');
      return;
    }

    this.activitiesSignal.set(HOME_DASHBOARD_FIXTURES.activities);
    this.stateSignal.set('success');
  }
}
