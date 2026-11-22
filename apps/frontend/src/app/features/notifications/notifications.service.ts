import { computed, Injectable, signal } from '@angular/core';
import type { AppNotification } from './notifications.models';
import { INITIAL_NOTIFICATIONS } from './notifications.mock-fixtures';

/**
 * Notificações mockadas compartilhadas entre header, listagem e leitura.
 * O estado vive apenas em memória nesta demonstração.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly itemsSignal = signal<readonly AppNotification[]>(INITIAL_NOTIFICATIONS);

  readonly items = this.itemsSignal.asReadonly();
  readonly unreadCount = computed(() => this.itemsSignal().filter((item) => !item.read).length);
  readonly recent = computed(() => this.itemsSignal().slice(0, 5));

  getById(id: string): AppNotification | null {
    return this.itemsSignal().find((item) => item.id === id) ?? null;
  }

  markRead(id: string): void {
    this.itemsSignal.update((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  markAllRead(): void {
    this.itemsSignal.update((items) => items.map((item) => ({ ...item, read: true })));
  }

  reload(): void {
    this.itemsSignal.set(INITIAL_NOTIFICATIONS);
  }
}
