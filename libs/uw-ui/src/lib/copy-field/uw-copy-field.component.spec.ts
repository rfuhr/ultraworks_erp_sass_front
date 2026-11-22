import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwCopyFieldComponent } from './uw-copy-field.component';

describe('UwCopyFieldComponent', () => {
  let component: UwCopyFieldComponent;
  let fixture: ComponentFixture<UwCopyFieldComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwCopyFieldComponent] });

    fixture = TestBed.createComponent(UwCopyFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'pix-chave@evento.com');
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the value with aria-live', () => {
    const valueEl = fixture.nativeElement.querySelector('.uw-copy-field__value') as HTMLElement;
    expect(valueEl.textContent).toBe('pix-chave@evento.com');
    expect(valueEl.getAttribute('aria-live')).toBe('polite');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Chave PIX');
    fixture.detectChanges();
    const labelEl = fixture.nativeElement.querySelector('.uw-copy-field__label');
    expect(labelEl?.textContent).toBe('Chave PIX');
  });

  it('should not render label when absent', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uw-copy-field__label')).toBeNull();
  });

  it('should copy value via clipboard and show feedback reseting after 2 seconds', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const btn = fixture.nativeElement.querySelector('.uw-copy-field__btn') as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Copiar');

    await component.copiar();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith('pix-chave@evento.com');
    expect(component.copied()).toBe(true);
    expect(btn.getAttribute('aria-label')).toBe('Copiado');

    jest.advanceTimersByTime(2000);
    expect(component.copied()).toBe(false);
  });

  it('should fall back to execCommand when clipboard API is unavailable', async () => {
    jest.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    const execCommand = jest.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      value: execCommand,
      configurable: true,
    });

    await component.copiar();

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(component.copied()).toBe(true);

    jest.advanceTimersByTime(2000);
    expect(component.copied()).toBe(false);
  });

  it('should reset previous copy timer before scheduling a new one', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    await component.copiar();
    expect(component.copied()).toBe(true);

    jest.advanceTimersByTime(1000);
    await component.copiar();
    expect(component.copied()).toBe(true);

    jest.advanceTimersByTime(1000);
    expect(component.copied()).toBe(true);

    jest.advanceTimersByTime(1000);
    expect(component.copied()).toBe(false);
  });
});