import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  Injector,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UwIconComponent } from '../icon/uw-icon.component';
import type { UwInputType } from './uw-input.types';
import {
  cpfValidator,
  cnpjValidator,
  cepValidator,
  dataValidator,
  dataHoraValidator,
  horaValidator,
} from './uw-input.validators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'uw-input',
  standalone: true,
  imports: [UwIconComponent, NgxMaskDirective],
  templateUrl: './uw-input.component.html',
  styleUrl: './uw-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;

  readonly maskInput = viewChild<ElementRef<HTMLInputElement>>('maskInput');

  readonly type = input<UwInputType>('text');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly numeric = input(false);
  readonly decimal = input(false);
  readonly placeholder = input<string>();
  readonly error = input<string>();
  readonly icon = input<string>();
  readonly suffixIcon = input<string>();
  readonly suffixIconTitle = input<string>();
  readonly hint = input<string>();
  readonly allowNegative = input(false);
  readonly maxlength = input<number | string>();
  readonly required = input(false);
  readonly uppercase = input(false);
  readonly prefix = input<string>();
  readonly prefixAlign = input<'left' | 'right'>('left');

  readonly decimais = input<number>(2);
  readonly milhar = input<boolean>(true);
  readonly anoMin = input<number>(1900);
  readonly anoMax = input<number>(2100);
  readonly autoSearch = input<boolean>(false);

  readonly valueChange = output<string | number | undefined>();
  readonly iconClick = output<void>();
  readonly suffixIconClick = output<void>();
  readonly dataValida = output<Date>();
  readonly dataHoraValida = output<Date>();
  readonly cepCompleto = output<string>();

  private calculatorBuffer = '';

  readonly maskPattern = computed(() => {
    const t = this.type();
    switch (t) {
      case 'cpf': return '000.000.000-00';
      case 'cnpj': return 'SS.SSS.SSS/SSSS-00';
      case 'cep': return '00000-000';
      case 'data': return '00/00/0000';
      case 'dataHora': return '00/00/0000 00:00';
      case 'telefone': return '(00) 0000-0000';
      case 'celular': return '(00) 00000-0000';
      case 'cartaoValidade': return '00/00';
      case 'hora': return '00:00';
      default: return '';
    }
  });

  readonly cnpjPatterns = {
    S: { pattern: new RegExp('[A-Z0-9]'), optional: false },
    '0': { pattern: new RegExp('[0-9]'), optional: false },
  };

  readonly defaultPatterns = {
    '0': { pattern: new RegExp('[0-9]') },
  };

  readonly dropSpecialChars = computed(() => {
    const t = this.type();
    return ['cpf', 'cnpj', 'cep', 'telefone', 'celular', 'cartaoValidade', 'hora'].includes(t);
  });

  readonly inputmode = computed(() => {
    const t = this.type();
    if (['cpf', 'cnpj', 'cep', 'data', 'dataHora', 'decimal', 'valor', 'telefone', 'celular', 'cartaoValidade', 'hora'].includes(t)) return 'numeric';
    if (this.numeric()) return 'numeric';
    return 'text';
  });

  readonly effectivePlaceholder = computed(() => {
    const explicit = this.placeholder();
    if (explicit) return explicit;
    const t = this.type();
    switch (t) {
      case 'cpf': return '000.000.000-00';
      case 'cnpj': return '00.000.000/0000-00';
      case 'cep': return '00000-000';
      case 'data': return 'DD/MM/AAAA';
      case 'dataHora': return 'DD/MM/AAAA HH:mm';
      case 'valor': return 'R$ 0,00';
      case 'telefone': return '(00) 0000-0000';
      case 'celular': return '(00) 00000-0000';
      case 'cartaoValidade': return 'MM/AA';
      case 'hora': return 'HH:mm';
      default: return '';
    }
  });

  readonly inputPadding = computed(() => {
    let left = 0.75;
    if (this.icon()) left += 1.625;
    if (this.prefix() && this.prefixAlign() !== 'right') left += 0.5 + this.prefix()!.length * 0.55;
    let right = 0.75;
    if (this.suffixIcon()) right += 1.625;
    return `0.5rem ${right}rem 0.5rem ${left}rem`;
  });

  value = '';
  focused = false;
  private readonly _formDisabled = signal(false);

  readonly isDisabled = computed(() => this._formDisabled() || this.disabled());

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
    const control = this.ngControl?.control;
    if (!control) return;

    const isRequired = this.required();
    const existingValidator = control.validator;
    const typeValidator = this.getTypeValidator();

    control.setValidators((ctrl) => {
      let errors: Record<string, unknown> | null = existingValidator?.(ctrl) ?? null;

      if (isRequired && (!ctrl.value || ctrl.value === '')) {
        errors = { ...(errors ?? {}), required: true };
      }

      if (typeValidator) {
        const typeErrors = typeValidator(ctrl);
        if (typeErrors) {
          errors = { ...(errors ?? {}), ...typeErrors };
        }
      }

      return errors;
    });
    control.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    if (this.value) {
      this.setMaskInputValue(this.value);
    }
  }

  private getTypeValidator() {
    const t = this.type();
    switch (t) {
      case 'cpf': return cpfValidator();
      case 'cnpj': return cnpjValidator();
      case 'cep': return cepValidator();
      case 'data': return dataValidator(this.anoMin(), this.anoMax());
      case 'dataHora': return dataHoraValidator(this.anoMin(), this.anoMax());
      case 'hora': return horaValidator();
      default: return null;
    }
  }

  get borderColor(): string {
    if (this.error()) return 'var(--color-error)';
    if (this.focused) return 'var(--color-primary)';
    return 'color-mix(in srgb, var(--color-primary) 15%, transparent)';
  }

  get shadowColor(): string {
    return this.error()
      ? 'color-mix(in srgb, var(--color-error) 8%, transparent)'
      : 'color-mix(in srgb, var(--color-primary) 8%, transparent)';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (v: string | number | undefined) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  onKeydown(event: KeyboardEvent): void {
    if (this.numeric() && !this.allowNegative() && event.key === '-') {
      event.preventDefault();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value;
    const t = this.type();

    if (t === 'valor' || t === 'decimal') {
      this.handleCalculatorInput(val);
      return;
    }

    if (t === 'cnpj') {
      val = val.toUpperCase();
      input.value = val;
    }

    if (this.numeric()) {
      const chars = this.decimal() ? '0-9\\-\\.' : '0-9\\-';
      val = val.replace(new RegExp(`[^${chars}]`, 'g'), '');
      if (!this.allowNegative()) {
        val = val.replace(/-/g, '');
      }
    } else if (t === 'tel') {
      val = val.replace(/\D/g, '');
    }

    if (this.uppercase()) {
      val = val.toUpperCase();
    }

    const max = this.maxlength();
    if (max != null && val.length > Number(max)) {
      val = val.slice(0, Number(max));
    }

    if (val !== input.value) {
      input.value = val;
    }
    this.value = val;

    if (this.numeric()) {
      const num = val === '' || val === '-' ? undefined : Number(val);
      this.onChange(num);
      this.valueChange.emit(num as string | number);
    } else {
      this.onChange(val);
      this.valueChange.emit(val);
    }

    this.emitSpecialEvents(val, t);
  }

  onMaskCompleted(event: { mask: string }): void {
    const t = this.type();
    if (t === 'cep' && this.autoSearch()) {
      const raw = event.mask.replace(/\D/g, '');
      if (raw.length === 8) {
        this.cepCompleto.emit(raw);
      }
    }
  }

  private emitSpecialEvents(val: string, t: UwInputType): void {
    if (t === 'data') {
      const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (match) {
        const dia = parseInt(match[1], 10);
        const mes = parseInt(match[2], 10);
        const ano = parseInt(match[3], 10);
        const diasNoMes = new Date(ano, mes, 0).getDate();
        if (mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasNoMes && ano >= this.anoMin() && ano <= this.anoMax()) {
          this.dataValida.emit(new Date(ano, mes - 1, dia));
        }
      }
    }

    if (t === 'dataHora') {
      const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})$/);
      if (match) {
        const dia = parseInt(match[1], 10);
        const mes = parseInt(match[2], 10);
        const ano = parseInt(match[3], 10);
        const hora = parseInt(match[4], 10);
        const minuto = parseInt(match[5], 10);
        const diasNoMes = new Date(ano, mes, 0).getDate();
        if (mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasNoMes && ano >= this.anoMin() && ano <= this.anoMax() && hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59) {
          this.dataHoraValida.emit(new Date(ano, mes - 1, dia, hora, minuto));
        }
      }
    }

    if (t === 'cep' && this.autoSearch()) {
      const raw = val.replace(/\D/g, '');
      if (raw.length === 8) {
        this.cepCompleto.emit(raw);
      }
    }
  }

  private handleCalculatorInput(val: string): void {
    const digits = val.replace(/\D/g, '');
    if (!digits) {
      this.calculatorBuffer = '';
      this.value = '';
      this.onChange(undefined);
      this.valueChange.emit(undefined);
      return;
    }

    this.calculatorBuffer = digits;
    const decimals = this.type() === 'valor' ? 2 : this.decimais();
    const divisor = Math.pow(10, decimals);
    const numericValue = parseInt(this.calculatorBuffer, 10) / divisor;

    const useMilhar = this.type() === 'valor' ? true : this.milhar();
    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: useMilhar,
    });

    const formatted = formatter.format(numericValue);
    this.value = this.type() === 'valor' ? `R$ ${formatted}` : formatted;

    this.onChange(numericValue);
    this.valueChange.emit(numericValue);
  }

  onIconClick(event: Event): void {
    event.stopPropagation();
    if (!this.isDisabled()) {
      this.iconClick.emit();
    }
  }

  onSuffixIconClick(event: Event): void {
    event.stopPropagation();
    if (!this.isDisabled()) {
      this.suffixIconClick.emit();
    }
  }

  onFocus(): void { this.focused = true; }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  writeValue(val: string | number | null): void {
    const t = this.type();

    if (t === 'valor' || t === 'decimal') {
      if (val === null || val === undefined || val === '') {
        this.value = '';
        this.calculatorBuffer = '';
        this.setMaskInputValue('');
        return;
      }
      const num = typeof val === 'number' ? val : parseFloat(val);
      if (isNaN(num)) {
        this.value = '';
        this.calculatorBuffer = '';
        this.setMaskInputValue('');
        return;
      }
      const decimals = t === 'valor' ? 2 : this.decimais();
      const useMilhar = t === 'valor' ? true : this.milhar();
      const formatter = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: useMilhar,
      });
      const formatted = formatter.format(num);
      this.value = t === 'valor' ? `R$ ${formatted}` : formatted;
      this.calculatorBuffer = Math.round(num * Math.pow(10, decimals)).toString();
      this.setMaskInputValue(this.value);
      return;
    }

    if (t === 'cnpj' && val) {
      this.value = String(val).toUpperCase();
      this.setMaskInputValue(this.value);
      return;
    }

    this.value = String(val ?? '');
    this.setMaskInputValue(this.value);

    // O `ngx-mask` mantém o valor mascarado em um model próprio. Ao limpar o
    // controle programaticamente (ex.: CPF de participante já inscrito), o
    // binding `[value]` pode reaplicar o valor anterior depois do ciclo atual.
    // Reaplicamos o valor no próximo tick para garantir que a view reflita o
    // controle.
    if (!this.value) {
      setTimeout(() => this.setMaskInputValue(this.value));
    }
  }

  private setMaskInputValue(val: string): void {
    const el = this.maskInput()?.nativeElement;
    if (!el) return;
    el.value = this.aplicarMascara(val, this.type());
  }

  private aplicarMascara(val: string, tipo: UwInputType): string {
    if (!val) return '';
    const onlyDigits = val.replace(/\D/g, '');
    switch (tipo) {
      case 'cpf': {
        if (onlyDigits.length <= 3) return onlyDigits;
        if (onlyDigits.length <= 6) return `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3)}`;
        if (onlyDigits.length <= 9) return `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}.${onlyDigits.slice(6)}`;
        return `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}.${onlyDigits.slice(6, 9)}-${onlyDigits.slice(9, 11)}`;
      }
      case 'cnpj': {
        if (onlyDigits.length <= 2) return onlyDigits;
        if (onlyDigits.length <= 5) return `${onlyDigits.slice(0, 2)}.${onlyDigits.slice(2)}`;
        if (onlyDigits.length <= 8) return `${onlyDigits.slice(0, 2)}.${onlyDigits.slice(2, 5)}.${onlyDigits.slice(5)}`;
        if (onlyDigits.length <= 12) return `${onlyDigits.slice(0, 2)}.${onlyDigits.slice(2, 5)}.${onlyDigits.slice(5, 8)}/${onlyDigits.slice(8)}`;
        return `${onlyDigits.slice(0, 2)}.${onlyDigits.slice(2, 5)}.${onlyDigits.slice(5, 8)}/${onlyDigits.slice(8, 12)}-${onlyDigits.slice(12, 14)}`;
      }
      case 'cep': {
        if (onlyDigits.length <= 5) return onlyDigits;
        return `${onlyDigits.slice(0, 5)}-${onlyDigits.slice(5, 8)}`;
      }
      case 'telefone': {
        if (onlyDigits.length <= 2) return `(${onlyDigits}`;
        if (onlyDigits.length <= 6) return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2)}`;
        if (onlyDigits.length <= 10) return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2, 6)}-${onlyDigits.slice(6)}`;
        return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2, 7)}-${onlyDigits.slice(7, 11)}`;
      }
      case 'celular': {
        if (onlyDigits.length <= 2) return `(${onlyDigits}`;
        if (onlyDigits.length <= 7) return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2)}`;
        if (onlyDigits.length <= 11) return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2, 7)}-${onlyDigits.slice(7)}`;
        return `(${onlyDigits.slice(0, 2)}) ${onlyDigits.slice(2, 7)}-${onlyDigits.slice(7, 11)}`;
      }
      case 'cartaoValidade': {
        if (onlyDigits.length <= 2) return onlyDigits;
        return `${onlyDigits.slice(0, 2)}/${onlyDigits.slice(2, 4)}`;
      }
      default:
        return val;
    }
  }

  registerOnChange(fn: (v: string | number | undefined) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }
}
