import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  NgZone,
  Renderer2,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, ScrollStrategyOptions, ConnectedPosition } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import type {
  DatePickerMode,
  CalendarDay,
  TimeConfig,
  DateFilterCallback,
  HourFormat,
} from './uw-date-picker.types';

@Component({
  selector: 'uw-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, A11yModule],
  templateUrl: './uw-date-picker.component.html',
  styleUrl: './uw-date-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwDatePickerComponent),
      multi: true,
    },
  ],
})
export class UwDatePickerComponent implements ControlValueAccessor {
  readonly mode = input<DatePickerMode>('date');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly locale = input('pt-BR');
  readonly placeholder = input('Selecionar data');
  readonly disabled = input(false);
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  private readonly _formDisabled = signal(false);
  readonly invalid = input(false);
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly showIcon = input(false);
  readonly editable = input(false);

  readonly showTime = input(false);
  readonly hourFormat = input<HourFormat>('24');
  readonly showSeconds = input(false);
  readonly timeSeparator = input(':');

  readonly inline = input(false);
  readonly monthNavigator = input(false);
  readonly yearNavigator = input(false);
  readonly yearRange = input('2020:2030');

  readonly numberOfMonths = input(1);

  readonly showTodayButton = input(false);
  readonly showClearButton = input(false);

  readonly disabledDates = input<DateFilterCallback | null>(null);

  readonly dateFormat = input<Intl.DateTimeFormatOptions | null>(null);

  @ContentChild('uwDatePickerInput') customInputTemplate: TemplateRef<any> | null = null;

  private readonly sso = inject(ScrollStrategyOptions);
  private readonly elRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  readonly scrollStrategy = this.sso.close();

  readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];

  private scrollCleanups: (() => void)[] = [];

  readonly isOpen = signal(false);
  readonly monthDropdownOpen = signal(false);
  readonly yearDropdownOpen = signal(false);
  readonly currentMonth = signal(new Date().getMonth());
  readonly currentYear = signal(new Date().getFullYear());

  readonly selectedDate = signal<Date | null>(null);
  readonly selectedStartDate = signal<Date | null>(null);
  readonly selectedEndDate = signal<Date | null>(null);

  readonly selectedHour = signal(0);
  readonly selectedMinute = signal(0);
  readonly selectedSecond = signal(0);

  readonly focusedDateIndex = signal(0);
  readonly typedValue = signal('');

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  readonly effectiveMode = computed(() => {
    const m = this.mode();
    if (m === 'datetime') return 'date' as const;
    return m;
  });

  readonly effectiveShowTime = computed(() => {
    if (this.mode() === 'datetime') return true;
    if (this.mode() === 'time') return true;
    return this.showTime();
  });

  readonly isTimeOnly = computed(() => this.mode() === 'time');

  readonly monthOffsets = computed(() =>
    Array.from({ length: Math.max(1, this.numberOfMonths()) }, (_, i) => i),
  );

  readonly weekdays = computed(() => {
    const formatter = new Intl.DateTimeFormat(this.locale(), { weekday: 'short' });
    const days: string[] = [];
    const ref = new Date(2024, 0, 7);
    for (let i = 0; i < 7; i++) {
      const d = new Date(ref);
      d.setDate(ref.getDate() + i);
      days.push(formatter.format(d).slice(0, 1).toUpperCase());
    }
    return days;
  });

  readonly months = computed(() => {
    const formatter = new Intl.DateTimeFormat(this.locale(), { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(2024, i, 1);
      return { value: i, label: formatter.format(d) };
    });
  });

  readonly years = computed(() => {
    const range = this.yearRange();
    const parts = range.split(':').map(Number);
    const start = parts[0] || new Date().getFullYear() - 5;
    const end = parts[1] || new Date().getFullYear() + 5;
    const result: { value: number; label: string }[] = [];
    for (let y = start; y <= end; y++) {
      result.push({ value: y, label: String(y) });
    }
    return result;
  });

  readonly monthYearLabel = computed(() => {
    const date = new Date(this.currentYear(), this.currentMonth(), 1);
    return new Intl.DateTimeFormat(this.locale(), {
      month: 'long',
      year: 'numeric',
    }).format(date);
  });

  private buildMonthDays(offset: number) {
    const year = this.currentYear();
    const month = this.currentMonth() + offset;
    const computedYear = month > 11 ? year + 1 : month < 0 ? year - 1 : year;
    const computedMonth = ((month % 12) + 12) % 12;

    const today = new Date();
    const min = this.minDate();
    const max = this.maxDate();
    const mode = this.effectiveMode();
    const selected = this.selectedDate();
    const start = this.selectedStartDate();
    const end = this.selectedEndDate();
    const disabledCb = this.disabledDates();

    const firstDay = new Date(computedYear, computedMonth, 1);
    const lastDay = new Date(computedYear, computedMonth + 1, 0);
    const startDow = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(computedYear, computedMonth, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(computedYear, computedMonth - 1, prevLastDay - i);
      days.push(this.buildDay(d, false, today, selected, start, end, min, max, mode, disabledCb));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(computedYear, computedMonth, d);
      days.push(this.buildDay(date, true, today, selected, start, end, min, max, mode, disabledCb));
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(computedYear, computedMonth + 1, d);
      days.push(this.buildDay(date, false, today, selected, start, end, min, max, mode, disabledCb));
    }

    return days;
  }

  readonly calendarDays = computed(() => this.buildMonthDays(0));

  readonly multiCalendarDays = computed(() =>
    this.monthOffsets().map((offset) => ({
      offset,
      label: this.formatMonthYear(this.currentYear(), this.currentMonth() + offset),
      days: this.buildMonthDays(offset),
    })),
  );

  readonly inputFormatHint = computed(() => {
    if (this.isTimeOnly()) return this.showSeconds() ? 'HH:mm:ss' : 'HH:mm';
    if (this.effectiveShowTime()) return this.showSeconds() ? 'dd/MM/aaaa HH:mm:ss' : 'dd/MM/aaaa HH:mm';
    return 'dd/MM/aaaa';
  });

  readonly inputMask = computed(() => {
    if (this.isTimeOnly()) return this.showSeconds() ? '00:00:00' : '00:00';
    if (this.effectiveShowTime()) return this.showSeconds() ? '00/00/0000 00:00:00' : '00/00/0000 00:00';
    return '00/00/0000';
  });

  readonly isReadonly = computed(() => !this.editable() || this.isDisabled());

  readonly displayValue = computed(() => {
    if (this.isTimeOnly()) {
      return this.formatTime();
    }
    if (this.effectiveMode() === 'date-range') {
      const s = this.selectedStartDate();
      const e = this.selectedEndDate();
      if (s && e) return `${this.formatDate(s)} - ${this.formatDate(e)}`;
      if (s) return `${this.formatDate(s)} - ...`;
      return '';
    }
    const d = this.selectedDate();
    if (!d || isNaN(d.getTime())) return '';
    const time = this.effectiveShowTime() ? ` ${this.formatTimeFromDate(d)}` : '';
    return `${this.formatDate(d)}${time}`;
  });

  private formatMonthYear(year: number, month: number): string {
    const y = month > 11 ? year + 1 : month < 0 ? year - 1 : year;
    const m = ((month % 12) + 12) % 12;
    const date = new Date(y, m, 1);
    return new Intl.DateTimeFormat(this.locale(), {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  private buildDay(
    date: Date,
    isCurrentMonth: boolean,
    today: Date,
    selected: Date | null,
    start: Date | null,
    end: Date | null,
    min: Date | null,
    max: Date | null,
    mode: DatePickerMode,
    disabledCb: DateFilterCallback | null,
  ): CalendarDay {
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const isToday =
      normalized.getFullYear() === today.getFullYear() &&
      normalized.getMonth() === today.getMonth() &&
      normalized.getDate() === today.getDate();

    let isSelected = false;
    if (mode === 'date') {
      isSelected =
        selected !== null &&
        normalized.getFullYear() === selected.getFullYear() &&
        normalized.getMonth() === selected.getMonth() &&
        normalized.getDate() === selected.getDate();
    }

    let isInRange = false;
    if (mode === 'date-range' && start && end) {
      isInRange = normalized >= start && normalized <= end;
    }

    const showTimeActive = this.effectiveShowTime();
    let isDisabled =
      (min !== null && normalized < (showTimeActive ? min : new Date(min.getFullYear(), min.getMonth(), min.getDate()))) ||
      (max !== null && normalized > (showTimeActive ? max : new Date(max.getFullYear(), max.getMonth(), max.getDate())));

    if (!isDisabled && disabledCb !== null) {
      isDisabled = disabledCb(normalized);
    }

    return { date: normalized, isCurrentMonth, isToday, isSelected, isDisabled, isInRange };
  }

  private formatDate(date: Date): string {
    const df = this.dateFormat();
    if (df) {
      return new Intl.DateTimeFormat(this.locale(), df).format(date);
    }
    return new Intl.DateTimeFormat(this.locale()).format(date);
  }

  private formatTime(): string {
    const h = this.selectedHour();
    const m = this.selectedMinute();
    const s = this.showSeconds() ? this.selectedSecond() : 0;
    const sep = this.timeSeparator();
    if (this.hourFormat() === '12') {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const base = `${String(h12).padStart(2, '0')}${sep}${String(m).padStart(2, '0')}`;
      if (this.showSeconds()) {
        return `${base}${sep}${String(s).padStart(2, '0')} ${ampm}`;
      }
      return `${base} ${ampm}`;
    }
    const base = `${String(h).padStart(2, '0')}${sep}${String(m).padStart(2, '0')}`;
    if (this.showSeconds()) {
      return `${base}${sep}${String(s).padStart(2, '0')}`;
    }
    return base;
  }

  private formatTimeFromDate(date: Date): string {
    const sep = this.timeSeparator();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    if (this.hourFormat() === '12') {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const base = `${String(h12).padStart(2, '0')}${sep}${String(m).padStart(2, '0')}`;
      if (this.showSeconds()) {
        return `${base}${sep}${String(s).padStart(2, '0')} ${ampm}`;
      }
      return `${base} ${ampm}`;
    }
    const base = `${String(h).padStart(2, '0')}${sep}${String(m).padStart(2, '0')}`;
    if (this.showSeconds()) {
      return `${base}${sep}${String(s).padStart(2, '0')}`;
    }
    return base;
  }

  private applyTimeToDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(this.selectedHour(), this.selectedMinute(), this.selectedSecond(), 0);
    return d;
  }

  private toTimeConfig(date: Date): TimeConfig {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }

  prevMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update((y) => y - 1);
    } else {
      this.currentMonth.update((m) => m - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update((y) => y + 1);
    } else {
      this.currentMonth.update((m) => m + 1);
    }
  }

  goToMonth(month: number): void {
    this.currentMonth.set(month);
    this.monthDropdownOpen.set(false);
  }

  goToYear(year: number): void {
    this.currentYear.set(year);
    this.yearDropdownOpen.set(false);
  }

  toggleMonthDropdown(): void {
    this.monthDropdownOpen.update((v) => !v);
    this.yearDropdownOpen.set(false);
  }

  toggleYearDropdown(): void {
    this.yearDropdownOpen.update((v) => !v);
    this.monthDropdownOpen.set(false);
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) return;

    const mode = this.effectiveMode();
    if (mode === 'date') {
      const d = this.effectiveShowTime() ? this.applyTimeToDate(day.date) : day.date;
      this.selectedDate.set(d);
      this.onChange(d);
      if (!this.inline()) this.isOpen.set(false);
      const inputEl = this.elRef.nativeElement.querySelector('input.datepicker-input');
      if (inputEl) inputEl.value = this.displayValue();
    } else if (mode === 'date-range') {
      const start = this.selectedStartDate();
      if (!start || this.selectedEndDate() !== null) {
        this.selectedStartDate.set(day.date);
        this.selectedEndDate.set(null);
      } else {
        if (day.date < start) {
          this.selectedStartDate.set(day.date);
          this.selectedEndDate.set(start);
        } else {
          this.selectedEndDate.set(day.date);
        }
        const s = this.selectedStartDate();
        const e = day.date < start ? start : day.date;
        this.onChange({ start: s, end: e });
      }
    }
  }

  selectTime(): void {
    if (this.isTimeOnly()) {
      const d = new Date(0);
      d.setHours(this.selectedHour(), this.selectedMinute(), this.selectedSecond(), 0);
      this.onChange(d);
    } else {
      const date = this.selectedDate();
      if (date) {
        const d = this.applyTimeToDate(date);
        this.selectedDate.set(d);
        this.onChange(d);
      }
    }
  }

  confirmTime(): void {
    this.selectTime();
    if (!this.inline()) this.isOpen.set(false);
  }

  selectToday(): void {
    const today = new Date();
    today.setHours(this.selectedHour(), this.selectedMinute(), this.selectedSecond(), 0);
    this.selectedDate.set(today);
    this.onChange(today);
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());
    if (!this.inline()) this.isOpen.set(false);
  }

  clearSelection(): void {
    this.selectedDate.set(null);
    this.selectedStartDate.set(null);
    this.selectedEndDate.set(null);
    this.onChange(null);
    if (!this.inline()) this.isOpen.set(false);
  }

  incrementHour(): void {
    this.selectedHour.update((h) => (h + 1) % 24);
    this.selectTime();
  }

  decrementHour(): void {
    this.selectedHour.update((h) => (h - 1 + 24) % 24);
    this.selectTime();
  }

  incrementMinute(): void {
    this.selectedMinute.update((m) => (m + 1) % 60);
    this.selectTime();
  }

  decrementMinute(): void {
    this.selectedMinute.update((m) => (m - 1 + 60) % 60);
    this.selectTime();
  }

  incrementSecond(): void {
    this.selectedSecond.update((s) => (s + 1) % 60);
    this.selectTime();
  }

  decrementSecond(): void {
    this.selectedSecond.update((s) => (s - 1 + 60) % 60);
    this.selectTime();
  }

  toggleAmPm(): void {
    this.selectedHour.update((h) => (h >= 12 ? h - 12 : h + 12));
    this.selectTime();
  }

  toggleCalendar(): void {
    if (this.isDisabled() || this.inline()) return;
    if (!this.isOpen()) {
      this.typedValue.set(this.displayValue());
    }
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.bindScrollAncestors();
    } else {
      this.unbindScrollAncestors();
    }
  }

  private bindScrollAncestors(): void {
    this.unbindScrollAncestors();
    this.ngZone.runOutsideAngular(() => {
      let el = this.elRef.nativeElement.parentElement;
      while (el) {
        const style = window.getComputedStyle(el);
        const overflow = style.getPropertyValue('overflow-y') + style.getPropertyValue('overflow');
        if (overflow.includes('auto') || overflow.includes('scroll')) {
          const unlisten = this.renderer.listen(el, 'scroll', () => {
            if (this.isOpen()) {
              this.ngZone.run(() => this.isOpen.set(false));
            }
          });
          this.scrollCleanups.push(unlisten);
        }
        el = el.parentElement;
      }
    });
  }

  private unbindScrollAncestors(): void {
    for (const cleanup of this.scrollCleanups) {
      cleanup();
    }
    this.scrollCleanups = [];
  }

  close(): void {
    this.isOpen.set(false);
    this.monthDropdownOpen.set(false);
    this.yearDropdownOpen.set(false);
    this.unbindScrollAncestors();
    this.onTouched();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dp-nav-dropdown')) {
      this.monthDropdownOpen.set(false);
      this.yearDropdownOpen.set(false);
    }
  }

  onInputChange(value: string): void {
    this.typedValue.set(value);
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (!this.editable()) return;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End', 'Enter'];
    if (allowedKeys.includes(event.key)) return;
    if (event.ctrlKey || event.metaKey) return;

    const validChar = this.isTimeOnly() ? /^[\d:]$/ : /^[\d\/\- :]$/;
    if (!validChar.test(event.key)) {
      event.preventDefault();
    }
  }

  onInputBlur(_event?: FocusEvent): void {
    const raw = this.typedValue();
    if (raw) {
      const parsed = this.parseTypedDate(raw);
      if (parsed) {
        this.selectedDate.set(parsed);
        this.onChange(parsed);
        this.currentMonth.set(parsed.getMonth());
        this.currentYear.set(parsed.getFullYear());
        if (this.effectiveShowTime()) {
          this.selectedHour.set(parsed.getHours());
          this.selectedMinute.set(parsed.getMinutes());
          this.selectedSecond.set(parsed.getSeconds());
        }
      }
    }
    setTimeout(() => {
      const active = document.activeElement;
      if (this.elRef.nativeElement.contains(active)) return;
      const overlayContainer = document.querySelector('.cdk-overlay-container');
      if (overlayContainer?.contains(active)) return;
      if (!this.inline()) this.isOpen.set(false);
    });
  }

  private parseTypedDate(raw: string): Date | null {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    const locale = this.locale();
    const showTime = this.effectiveShowTime();

    if (showTime) {
      const parts = trimmed.split(' ');
      if (parts.length === 2) {
        const datePart = this.parseDateOnly(parts[0], locale);
        const timePart = this.parseTimeOnly(parts[1]);
        if (datePart && timePart) {
          datePart.setHours(timePart.hours, timePart.minutes, timePart.seconds, 0);
          return datePart;
        }
      }
    }

    const dateOnly = this.parseDateOnly(trimmed, locale);
    if (dateOnly) return dateOnly;

    const timeOnly = this.parseTimeOnly(trimmed);
    if (timeOnly) {
      const d = new Date(0);
      d.setHours(timeOnly.hours, timeOnly.minutes, timeOnly.seconds, 0);
      return d;
    }

    return null;
  }

  private parseDateOnly(raw: string, locale: string): Date | null {
    if (locale.startsWith('pt')) {
      const m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
      if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    } else if (locale.startsWith('en')) {
      const m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
      if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    }

    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d;

    const parts = raw.split(/[\/\-]/);
    if (parts.length === 3) {
      const a = +parts[0];
      const b = +parts[1];
      const c = +parts[2];
      if (c > 31) return new Date(c, b - 1, a);
      if (a > 31) return new Date(c, b - 1, a);
      if (a > 12) return new Date(c, b - 1, a);
      return new Date(c, a - 1, b);
    }

    return null;
  }

  private parseTimeOnly(raw: string): { hours: number; minutes: number; seconds: number } | null {
    const parts = raw.split(':');
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const s = parts[2] !== undefined ? parseInt(parts[2], 10) : 0;
      if (!isNaN(h) && !isNaN(m) && h >= 0 && h < 24 && m >= 0 && m < 60) {
        return { hours: h, minutes: m, seconds: s };
      }
    }
    return null;
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const days = this.calendarDays();
    if (days.length === 0) return;

    let idx = this.focusedDateIndex();
    const current = days[idx];

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        idx = Math.max(0, idx - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        idx = Math.min(days.length - 1, idx + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        idx = Math.max(0, idx - 7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        idx = Math.min(days.length - 1, idx + 7);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!current.isDisabled) {
          this.selectDay(current);
        }
        return;
      case 'Escape':
        event.preventDefault();
        this.close();
        return;
      default:
        return;
    }

    this.focusedDateIndex.set(idx);
  }

  @HostListener('window:scroll')
  @HostListener('document:scroll')
  onScroll(): void {
    if (this.isOpen() && !this.inline()) {
      this.isOpen.set(false);
    }
  }

  private toDateValue(v: any): Date {
    if (v instanceof Date) return new Date(v.getTime());
    if (typeof v === 'string') {
      const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    }
    return new Date(v);
  }

  writeValue(v: any): void {
    if (v === null || v === undefined) {
      this.selectedDate.set(null);
      this.selectedStartDate.set(null);
      this.selectedEndDate.set(null);
      return;
    }

    if (this.mode() === 'time') {
      const d = this.toDateValue(v);
      this.selectedHour.set(d.getHours());
      this.selectedMinute.set(d.getMinutes());
      this.selectedSecond.set(d.getSeconds());
      return;
    }

    if (this.effectiveMode() === 'date-range' && typeof v === 'object') {
      this.selectedStartDate.set(v.start ? new Date(v.start.getTime()) : null);
      this.selectedEndDate.set(v.end ? new Date(v.end.getTime()) : null);
    } else {
      const d = this.toDateValue(v);
      this.selectedDate.set(d);
      if (this.effectiveShowTime()) {
        this.selectedHour.set(d.getHours());
        this.selectedMinute.set(d.getMinutes());
        this.selectedSecond.set(d.getSeconds());
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(d: boolean): void {
    this._formDisabled.set(d);
  }
}
