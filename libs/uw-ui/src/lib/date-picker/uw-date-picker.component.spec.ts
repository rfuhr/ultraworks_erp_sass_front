import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwDatePickerComponent } from './uw-date-picker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UwDatePickerComponent', () => {
  let component: UwDatePickerComponent;
  let fixture: ComponentFixture<UwDatePickerComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwDatePickerComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getInput(): HTMLInputElement | null {
    return fixture.nativeElement.querySelector('.datepicker-input');
  }

  function getCalendar(): HTMLElement | null {
    return document.querySelector('.datepicker-calendar');
  }

  function getInline(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.datepicker-inline');
  }

  function getShortcuts(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('.datepicker-shortcut');
  }

  function getActionBar(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.datepicker-actions');
  }

  function getTimePicker(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.datepicker-timepicker');
  }

  function getWeekColumn(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.datepicker-week-column');
  }

  function getHeaderSelects(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.datepicker-header-selects');
  }

  describe('render', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render input element', () => {
      expect(getInput()).toBeTruthy();
    });

    it('should show placeholder text', () => {
      expect(getInput()?.placeholder).toBe('Selecionar data');
    });
  });

  describe('calendar navigation', () => {
    it('should open calendar on click', () => {
      const wrapper = fixture.nativeElement.querySelector('.datepicker-input-wrapper');
      wrapper?.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('should close on overlay outside click', () => {
      component.isOpen.set(true);
      component.close();
      expect(component.isOpen()).toBe(false);
    });

    it('should navigate to next month', () => {
      const initial = component.currentMonth();
      component.nextMonth();
      expect(component.currentMonth()).toBe(initial === 11 ? 0 : initial + 1);
    });

    it('should navigate to previous month', () => {
      const initial = component.currentMonth();
      component.prevMonth();
      expect(component.currentMonth()).toBe(initial === 0 ? 11 : initial - 1);
    });
  });

  describe('date selection', () => {
    it('should select a day', () => {
      const today = new Date();
      const day = component.calendarDays().find(
        (d) =>
          d.isCurrentMonth &&
          d.date.getDate() === today.getDate() &&
          !d.isDisabled,
      );
      if (!day) return;
      component.selectDay(day);
      expect(component.selectedDate()).toBeTruthy();
    });

    it('should not select disabled day', () => {
      fixture.componentRef.setInput('minDate', new Date(2026, 5, 10));
      fixture.componentRef.setInput('maxDate', new Date(2026, 5, 20));
      fixture.detectChanges();
      const disabled = component.calendarDays().find((d) => d.isDisabled);
      if (!disabled) return;
      component.selectDay(disabled);
      expect(component.selectedDate()).toBeNull();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const d = new Date(2026, 5, 15);
      component.writeValue(d);
      expect(component.selectedDate()?.getTime()).toBe(d.getTime());
    });

    it('should register onChange callback', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      const d = new Date(2026, 5, 15);
      component.selectedDate.set(d);
      component.onChange(d);
      expect(fn).toHaveBeenCalledWith(d);
    });

    it('should parse date-only ISO string as local date', () => {
      component.writeValue('2026-09-01');
      expect(component.selectedDate()).not.toBeNull();
      expect(component.selectedDate()?.getFullYear()).toBe(2026);
      expect(component.selectedDate()?.getMonth()).toBe(8);
      expect(component.selectedDate()?.getDate()).toBe(1);
    });
  });

  describe('display value', () => {
    it('should format selected date', () => {
      component.selectedDate.set(new Date(2026, 5, 15));
      fixture.detectChanges();
      expect(component.displayValue()).toContain('2026');
    });
  });

  describe('time picker', () => {
    it('should show time picker when showTime is true', () => {
      fixture.componentRef.setInput('showTime', true);
      component.isOpen.set(true);
      fixture.detectChanges();
      expect(component.effectiveShowTime()).toBe(true);
    });

    it('should show time picker in datetime mode', () => {
      fixture.componentRef.setInput('mode', 'datetime');
      fixture.detectChanges();
      expect(component.effectiveShowTime()).toBe(true);
      expect(component.effectiveMode()).toBe('date');
    });

    it('should select time-only mode', () => {
      fixture.componentRef.setInput('mode', 'time');
      fixture.detectChanges();
      expect(component.isTimeOnly()).toBe(true);
    });

    it('should increment hour', () => {
      component.selectedHour.set(10);
      component.incrementHour();
      expect(component.selectedHour()).toBe(11);
    });

    it('should wrap hour at 24', () => {
      component.selectedHour.set(23);
      component.incrementHour();
      expect(component.selectedHour()).toBe(0);
    });

    it('should increment minute', () => {
      component.selectedMinute.set(30);
      component.incrementMinute();
      expect(component.selectedMinute()).toBe(31);
    });

    it('should wrap minute at 60', () => {
      component.selectedMinute.set(59);
      component.incrementMinute();
      expect(component.selectedMinute()).toBe(0);
    });

    it('should toggle AM/PM', () => {
      component.selectedHour.set(10);
      component.toggleAmPm();
      expect(component.selectedHour()).toBe(22);
      component.toggleAmPm();
      expect(component.selectedHour()).toBe(10);
    });

    it('should format time with seconds', () => {
      fixture.componentRef.setInput('showSeconds', true);
      component.selectedHour.set(14);
      component.selectedMinute.set(30);
      component.selectedSecond.set(45);
      expect(component.formatTime()).toBe('14:30:45');
    });

    it('should format time in 12h mode', () => {
      fixture.componentRef.setInput('hourFormat', '12');
      component.selectedHour.set(14);
      component.selectedMinute.set(30);
      expect(component.formatTime()).toContain('PM');
    });
  });

  describe('inline mode', () => {
    it('should render inline calendar without input', () => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();
      expect(getInline()).toBeTruthy();
      expect(getInput()).toBeNull();
    });

    it('should not close on selection in inline mode', () => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();
      const today = new Date();
      const day = component.calendarDays().find(
        (d) => d.isCurrentMonth && d.date.getDate() === today.getDate() && !d.isDisabled,
      );
      if (!day) return;
      component.selectDay(day);
      expect(component.isOpen()).toBe(false);
      expect(component.selectedDate()).toBeTruthy();
    });

    it('should have 100% width in inline mode', () => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();
      const el = getInline();
      expect(el).toBeTruthy();
    });
  });

  describe('dropdown navigation', () => {
    it('should go to selected month', () => {
      component.goToMonth(5);
      expect(component.currentMonth()).toBe(5);
    });

    it('should go to selected year', () => {
      component.goToYear(2030);
      expect(component.currentYear()).toBe(2030);
    });

    it('should compute months list', () => {
      const months = component.months();
      expect(months.length).toBe(12);
      expect(months[0].value).toBe(0);
    });

    it('should compute years list from range', () => {
      fixture.componentRef.setInput('yearRange', '2025:2030');
      fixture.detectChanges();
      const years = component.years();
      expect(years.length).toBe(6);
      expect(years[0].value).toBe(2025);
      expect(years[5].value).toBe(2030);
    });
  });

  describe('multi-month', () => {
    it('should create month offsets for numberOfMonths', () => {
      fixture.componentRef.setInput('numberOfMonths', 2);
      fixture.detectChanges();
      expect(component.monthOffsets().length).toBe(2);
    });

    it('should generate multi calendar days', () => {
      fixture.componentRef.setInput('numberOfMonths', 2);
      fixture.detectChanges();
      const multi = component.multiCalendarDays();
      expect(multi.length).toBe(2);
      expect(multi[0].days.length).toBe(42);
      expect(multi[1].days.length).toBe(42);
    });

    it('should default to 1 month', () => {
      expect(component.monthOffsets().length).toBe(1);
    });
  });

  describe('action bar', () => {
    it('should select today', () => {
      const today = new Date();
      component.selectToday();
      expect(component.selectedDate()).toBeTruthy();
      expect(component.selectedDate()?.getDate()).toBe(today.getDate());
    });

    it('should clear selection', () => {
      component.selectedDate.set(new Date(2026, 5, 15));
      component.clearSelection();
      expect(component.selectedDate()).toBeNull();
    });
  });

  describe('disabledDates callback', () => {
    it('should disable weekends', () => {
      fixture.componentRef.setInput('disabledDates', (d: Date) => d.getDay() === 0 || d.getDay() === 6);
      fixture.detectChanges();
      const days = component.calendarDays();
      const hasDisabledWeekend = days.some((d) => {
        const dow = d.date.getDay();
        return (dow === 0 || dow === 6) && d.isDisabled;
      });
      expect(hasDisabledWeekend).toBe(true);
    });

    it('should combine disabledDates with minDate', () => {
      component.currentMonth.set(5);
      component.currentYear.set(2026);
      fixture.componentRef.setInput('minDate', new Date(2026, 5, 15));
      fixture.componentRef.setInput('disabledDates', (d: Date) => d.getDate() === 20);
      fixture.detectChanges();
      const days = component.calendarDays();
      const disabledByMin = days.filter((d) => !d.isCurrentMonth || d.date.getDate() < 15);
      const disabledByCallback = days.filter((d) => d.date.getDate() === 20);
      expect(disabledByMin.some((d) => d.isDisabled)).toBe(true);
      expect(disabledByCallback.some((d) => d.isDisabled)).toBe(true);
    });
  });

  describe('dateFormat', () => {
    it('should format date with custom options', () => {
      fixture.componentRef.setInput('dateFormat', { day: '2-digit', month: '2-digit', year: 'numeric' });
      fixture.detectChanges();
      component.selectedDate.set(new Date(2026, 5, 15));
      expect(component.displayValue()).toBe('15/06/2026');
    });
  });

  describe('keyboard navigation', () => {
    it('should dispatch ArrowLeft', () => {
      component.focusedDateIndex.set(10);
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.handleKeydown(event);
      expect(component.focusedDateIndex()).toBe(9);
    });

    it('should dispatch ArrowRight', () => {
      component.focusedDateIndex.set(10);
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeydown(event);
      expect(component.focusedDateIndex()).toBe(11);
    });

    it('should dispatch ArrowUp', () => {
      component.focusedDateIndex.set(14);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeydown(event);
      expect(component.focusedDateIndex()).toBe(7);
    });

    it('should dispatch ArrowDown', () => {
      component.focusedDateIndex.set(7);
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.handleKeydown(event);
      expect(component.focusedDateIndex()).toBe(14);
    });

    it('should select on Enter', () => {
      const today = new Date();
      const days = component.calendarDays().filter((d) => d.isCurrentMonth && !d.isDisabled);
      if (days.length === 0) return;
      const idx = component.calendarDays().indexOf(days[10]);
      component.focusedDateIndex.set(idx);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeydown(event);
      expect(component.selectedDate()).toBeTruthy();
    });

    it('should close on Escape', () => {
      component.isOpen.set(true);
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleKeydown(event);
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('datetime mode writeValue', () => {
    it('should restore hour/minute from Date value', () => {
      fixture.componentRef.setInput('showTime', true);
      fixture.detectChanges();
      const d = new Date(2026, 5, 15, 14, 30, 0);
      component.writeValue(d);
      expect(component.selectedHour()).toBe(14);
      expect(component.selectedMinute()).toBe(30);
    });
  });
});
