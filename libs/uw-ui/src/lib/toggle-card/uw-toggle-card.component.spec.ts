import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UwToggleCardComponent } from './uw-toggle-card.component';
import type { ToggleCardVariant, ToggleCardClickableArea } from './uw-toggle-card.types';

@Component({
  template: `
    <uw-toggle-card
      [checked]="checked"
      [disabled]="disabled"
      [icon]="icon"
      [label]="label"
      [description]="description"
      [variant]="variant"
      [opacity]="opacity"
      [clickableArea]="clickableArea"
    />
  `,
  imports: [UwToggleCardComponent, FormsModule],
  standalone: true,
})
class HostComponent {
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() icon = 'certificado';
  @Input() label = 'Emitir Certificado';
  @Input() description = 'Certificado digital gerado automaticamente';
  @Input() variant: ToggleCardVariant = 'primary';
  @Input({ transform: numberAttribute }) opacity = 100;
  @Input() clickableArea: ToggleCardClickableArea = 'card';
}

function createHost(overrides: Partial<{
  checked: boolean;
  disabled: boolean;
  icon: string;
  label: string;
  description: string;
  variant: ToggleCardVariant;
  opacity: number;
  clickableArea: ToggleCardClickableArea;
}> = {}): { fixture: ComponentFixture<HostComponent>; component: UwToggleCardComponent } {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  if ('checked' in overrides) host.checked = overrides.checked!;
  if ('disabled' in overrides) host.disabled = overrides.disabled!;
  if ('icon' in overrides) host.icon = overrides.icon!;
  if ('label' in overrides) host.label = overrides.label!;
  if ('description' in overrides) host.description = overrides.description!;
  if ('variant' in overrides) host.variant = overrides.variant!;
  if ('opacity' in overrides) host.opacity = overrides.opacity!;
  if ('clickableArea' in overrides) host.clickableArea = overrides.clickableArea!;
  fixture.detectChanges();
  const debugEl = fixture.debugElement.query(By.directive(UwToggleCardComponent));
  const component = debugEl.componentInstance as UwToggleCardComponent;
  return { fixture, component };
}

describe('UwToggleCardComponent', () => {
  it('should create', () => {
    const { component } = createHost();
    expect(component).toBeTruthy();
  });

  it('should render icon, label and description', () => {
    const { fixture } = createHost();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('uw-icon')).toBeTruthy();
    expect(compiled.textContent).toContain('Emitir Certificado');
    expect(compiled.textContent).toContain('Certificado digital gerado automaticamente');
  });

  it('should have unchecked styles when checked is false', () => {
    const { fixture } = createHost({ checked: false });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    expect(card.classList.contains('toggle-card--checked')).toBe(false);
  });

  it('should have checked styles when checked is true', () => {
    const { fixture } = createHost({ checked: true });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    expect(card.classList.contains('toggle-card--checked')).toBe(true);
  });

  it('should apply variant classes', () => {
    const { fixture } = createHost({ checked: true, variant: 'success' });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    expect(card.classList.contains('toggle-card--variant-success')).toBe(true);
  });

  it('should apply all 5 variant classes', () => {
    const variants: ToggleCardVariant[] = ['primary', 'success', 'warning', 'error', 'info'];
    for (const variant of variants) {
      const { fixture } = createHost({ checked: true, variant });
      const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
      expect(card.classList.contains(`toggle-card--variant-${variant}`)).toBe(true);
    }
  });

  it('should set opacity CSS variable', () => {
    const { fixture } = createHost({ opacity: 50 });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    expect(card.style.getPropertyValue('--toggle-card-opacity')).toBe('0.5');
  });

  it('should toggle on card click when clickableArea is card', () => {
    const { fixture } = createHost({ clickableArea: 'card' });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    const switchEl = fixture.nativeElement.querySelector('.toggle-card__switch') as HTMLElement;
    const wasChecked = switchEl.classList.contains('toggle-card__switch--checked');
    card.click();
    fixture.detectChanges();
    expect(switchEl.classList.contains('toggle-card__switch--checked')).toBe(!wasChecked);
  });

  it('should not toggle on card click when clickableArea is toggle', () => {
    const { fixture } = createHost({ clickableArea: 'toggle' });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    const switchEl = fixture.nativeElement.querySelector('.toggle-card__switch') as HTMLElement;
    const wasChecked = switchEl.classList.contains('toggle-card__switch--checked');
    card.click();
    fixture.detectChanges();
    expect(switchEl.classList.contains('toggle-card__switch--checked')).toBe(wasChecked);
  });

  it('should toggle on switch click when clickableArea is toggle', () => {
    const { fixture } = createHost({ clickableArea: 'toggle' });
    const switchEl = fixture.nativeElement.querySelector('.toggle-card__switch') as HTMLElement;
    const wasChecked = switchEl.classList.contains('toggle-card__switch--checked');
    switchEl.click();
    fixture.detectChanges();
    expect(switchEl.classList.contains('toggle-card__switch--checked')).toBe(!wasChecked);
  });

  it('should integrate with ngModel via ControlValueAccessor', () => {
    const { component } = createHost();
    component.writeValue(true);
    expect(component.innerValue()).toBe(true);
  });

  it('should emit change when toggling', () => {
    const { component } = createHost();
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.toggle();
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });

  it('should have role="switch" when clickableArea is card', () => {
    const { fixture } = createHost({ clickableArea: 'card' });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('role')).toBe('switch');
  });

  it('should not have role="switch" when clickableArea is toggle', () => {
    const { fixture } = createHost({ clickableArea: 'toggle' });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('role')).toBeNull();
  });

  it('should set aria-checked when clickableArea is card', () => {
    const { fixture } = createHost({ checked: true, clickableArea: 'card' });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('aria-checked')).toBe('true');
  });

  it('should set aria-disabled when disabled', () => {
    const { fixture } = createHost({ disabled: true });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('aria-disabled')).toBe('true');
  });

  it('should toggle on Enter key when clickableArea is card', () => {
    const { component } = createHost({ clickableArea: 'card' });
    const spy = jest.fn();
    component.registerOnChange(spy);
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeydown(event);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should toggle on Space key when clickableArea is card', () => {
    const { component } = createHost({ clickableArea: 'card' });
    const spy = jest.fn();
    component.registerOnChange(spy);
    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeydown(event);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not toggle when disabled', () => {
    const { component } = createHost({ disabled: true });
    const spy = jest.fn();
    component.registerOnChange(spy);
    component.toggle();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have disabled visual class', () => {
    const { fixture } = createHost({ disabled: true });
    const card = fixture.nativeElement.querySelector('.toggle-card') as HTMLElement;
    expect(card.classList.contains('toggle-card--disabled')).toBe(true);
  });

  it('should have tabindex=0 when clickableArea is card and not disabled', () => {
    const { fixture } = createHost({ clickableArea: 'card' });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('tabindex')).toBe('0');
  });

  it('should not have tabindex when disabled', () => {
    const { fixture } = createHost({ clickableArea: 'card', disabled: true });
    const host = fixture.nativeElement.querySelector('uw-toggle-card') as HTMLElement;
    expect(host.getAttribute('tabindex')).toBeNull();
  });
});
