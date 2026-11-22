import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  input,
  output,
  QueryList,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UwRadioOptionComponent } from './uw-radio-option.component';

let nextId = 0;

@Component({
  selector: 'uw-radio-group',
  standalone: true,
  templateUrl: './uw-radio-group.component.html',
  styleUrl: './uw-radio-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwRadioGroupComponent),
      multi: true,
    },
  ],
})
export class UwRadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  readonly value = input<any>();
  readonly disabled = input(false);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly name = input(`uw-radio-group-${nextId++}`);

  readonly valueChange = output<any>();

  @ContentChildren(UwRadioOptionComponent)
  readonly options!: QueryList<UwRadioOptionComponent>;

  protected innerValue = signal<any>(null);

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterContentInit(): void {
    this.syncOptions();
    this.options.changes.subscribe(() => this.syncOptions());
  }

  private syncOptions(): void {
    if (!this.options) return;
    this.options.forEach((opt) => {
      opt.group.set(this);
      opt.optionName.set(this.name());
      opt.checked.set(opt.value() === this.innerValue());
    });
  }

  selectOption(option: UwRadioOptionComponent): void {
    if (this.disabled() || option.disabled()) return;
    this.innerValue.set(option.value());
    this.onChange(this.innerValue());
    this.onTouched();
    this.valueChange.emit(this.innerValue());
    this.syncOptions();
  }

  focusNext(current: UwRadioOptionComponent): void {
    const arr = this.options.toArray();
    const idx = arr.indexOf(current);
    const next = idx < arr.length - 1 ? arr[idx + 1] : arr[0];
    next.focus();
  }

  focusPrev(current: UwRadioOptionComponent): void {
    const arr = this.options.toArray();
    const idx = arr.indexOf(current);
    const prev = idx > 0 ? arr[idx - 1] : arr[arr.length - 1];
    prev.focus();
  }

  writeValue(v: any): void {
    this.innerValue.set(v);
    this.syncOptions();
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    this.syncOptions();
  }
}
