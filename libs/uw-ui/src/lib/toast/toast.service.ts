import { Injectable, signal, Signal, computed } from '@angular/core';
import { ToastType, ToastConfig, ToastItem } from './uw-toast.types';

const MAX_VISIBLE = 5;
const DEFAULT_DURATION = 5000;

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly queue = signal<ToastItem[]>([]);
  private readonly waiting = signal<ToastItem[]>([]);

  readonly toasts: Signal<ToastItem[]> = computed(() => {
    return this.queue();
  });

  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  show(message: string, type: ToastType, options?: Partial<ToastConfig>): string {
    const persistent = options?.persistent ?? false;
    const id = `toast-${++nextId}`;
    const item: ToastItem = {
      id,
      message,
      type,
      persistent,
      duration: options?.duration ?? DEFAULT_DURATION,
      createdAt: Date.now(),
    };

    if (this.queue().length < MAX_VISIBLE) {
      this.queue.update(list => [...list, item]);
      if (!persistent) {
        this.startTimer(item);
      }
    } else {
      this.waiting.update(list => [...list, item]);
    }

    return id;
  }

  remove(id: string): void {
    const timer = this.timers.get(id);
    if (timer) { clearTimeout(timer); }
    this.timers.delete(id);

    this.queue.update(list => {
      const filtered = list.filter(t => t.id !== id);
      if (filtered.length < MAX_VISIBLE && this.waiting().length > 0) {
        const next = this.waiting()[0];
        this.waiting.update(w => w.slice(1));
        filtered.push(next);
        this.startTimer(next);
      }
      return filtered;
    });
  }

  clear(): void {
    this.timers.forEach(t => clearTimeout(t));
    this.timers.clear();
    this.queue.set([]);
    this.waiting.set([]);
  }

  private startTimer(item: ToastItem): void {
    const timer = setTimeout(() => this.remove(item.id), item.duration);
    this.timers.set(item.id, timer);
  }
}
