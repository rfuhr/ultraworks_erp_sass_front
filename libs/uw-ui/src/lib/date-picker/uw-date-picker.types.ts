export type DatePickerMode = 'date' | 'date-range' | 'month' | 'year' | 'datetime' | 'time';

export type DateFilterCallback = (date: Date) => boolean;

export type HourFormat = '12' | '24';

export interface TimeConfig {
  hour: number;
  minute: number;
  second: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isInRange: boolean;
}
