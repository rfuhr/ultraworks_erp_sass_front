import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef, DialogModule } from '@angular/cdk/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UwConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationOptions } from './confirmation.model';

describe('UwConfirmationDialogComponent', () => {
  const mockData: ConfirmationOptions = {
    type: 'danger',
    title: 'Confirmar Exclusão',
    message: 'Tem certeza?',
    messageBold: 'Ação irreversível',
    confirmLabel: 'Sim',
    cancelLabel: 'Não',
    showCancel: true,
  };

  let component: UwConfirmationDialogComponent;
  let fixture: ComponentFixture<UwConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwConfirmationDialogComponent, NoopAnimationsModule, DialogModule],
      providers: [
        { provide: DIALOG_DATA, useValue: mockData },
        { provide: DialogRef, useValue: { close: jest.fn() } },
      ],
    });

    fixture = TestBed.createComponent(UwConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('title and message', () => {
    it('should render title', () => {
      const title = fixture.nativeElement.querySelector('.uw-confirm__title');
      expect(title.textContent.trim()).toBe('Confirmar Exclusão');
    });

    it('should render message', () => {
      const msg = fixture.nativeElement.querySelector('.uw-confirm__message');
      expect(msg.textContent).toContain('Tem certeza?');
    });

    it('should render bold message', () => {
      const msg = fixture.nativeElement.querySelector('.uw-confirm__message strong');
      expect(msg.textContent.trim()).toBe('Ação irreversível');
    });
  });

  describe('buttons', () => {
    it('should render confirm button', () => {
      const btn = fixture.nativeElement.querySelector('.uw-confirm__btn--confirm');
      expect(btn).toBeTruthy();
      expect(btn.textContent.trim()).toBe('Sim');
    });

    it('should render cancel button', () => {
      const btn = fixture.nativeElement.querySelector('.uw-confirm__btn--cancel');
      expect(btn).toBeTruthy();
      expect(btn.textContent.trim()).toBe('Não');
    });
  });

  describe('close', () => {
    it('should close dialog with true on confirm', () => {
      const spy = jest.spyOn((component as any).dialogRef, 'close');
      component.close(true);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should close dialog with false on cancel', () => {
      const spy = jest.spyOn((component as any).dialogRef, 'close');
      component.close(false);
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('type config', () => {
    it('should use danger config', () => {
      expect(component.cfg.icon).toBe('warning');
    });
  });
});

describe('UwConfirmationDialogComponent (prompt)', () => {
  const promptData = {
    type: 'danger' as const,
    title: 'Confirmar Rejeição',
    message: 'Informe o motivo da rejeição.',
    confirmLabel: 'Rejeitar',
    showCancel: true,
    input: {
      label: 'Motivo da rejeição',
      placeholder: 'Descreva o motivo',
      required: true,
      maxLength: 500,
    },
  };

  let component: UwConfirmationDialogComponent;
  let fixture: ComponentFixture<UwConfirmationDialogComponent>;
  let closeSpy: jest.Mock;

  beforeEach(() => {
    TestBed.resetTestingModule();
    closeSpy = jest.fn();
    TestBed.configureTestingModule({
      imports: [UwConfirmationDialogComponent, NoopAnimationsModule, DialogModule],
      providers: [
        { provide: DIALOG_DATA, useValue: promptData },
        { provide: DialogRef, useValue: { close: closeSpy } },
      ],
    });

    fixture = TestBed.createComponent(UwConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a required textarea when input is provided', () => {
    const textarea = fixture.nativeElement.querySelector('.uw-confirm__input');
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute('maxlength')).toBe('500');
    expect(textarea.getAttribute('placeholder')).toBe('Descreva o motivo');
    expect(fixture.nativeElement.querySelector('.uw-confirm__required')).toBeTruthy();
  });

  it('should disable confirm while required input is empty', () => {
    const btn = fixture.nativeElement.querySelector('.uw-confirm__btn--confirm');
    expect(btn.disabled).toBe(true);
  });

  it('should enable confirm after typing a value', () => {
    const textarea = fixture.nativeElement.querySelector('.uw-confirm__input');
    textarea.value = 'Documento ilegível';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.uw-confirm__btn--confirm');
    expect(btn.disabled).toBe(false);
    expect(fixture.nativeElement.querySelector('.uw-confirm__counter').textContent.trim()).toBe(
      '18/500',
    );
  });

  it('should close with confirmed result and trimmed value', () => {
    component.value.set('  Documento ilegível  ');
    component.close(true);

    expect(closeSpy).toHaveBeenCalledWith({
      confirmed: true,
      value: 'Documento ilegível',
    });
  });

  it('should close with unconfirmed result on cancel', () => {
    component.value.set('Documento ilegível');
    component.close(false);

    expect(closeSpy).toHaveBeenCalledWith({
      confirmed: false,
      value: 'Documento ilegível',
    });
  });
});
