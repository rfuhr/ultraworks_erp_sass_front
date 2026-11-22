import { TestBed } from '@angular/core/testing';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConfirmationService } from './confirmation.service';

describe('ConfirmationService', () => {
  let service: ConfirmationService;
  let dialog: Dialog;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, DialogModule],
      providers: [ConfirmationService],
    });

    service = TestBed.inject(ConfirmationService);
    dialog = TestBed.inject(Dialog);
  });

  describe('open', () => {
    it('should open a dialog with provided options', () => {
      const spy = jest.spyOn(dialog, 'open');
      service.open({
        type: 'danger',
        title: 'Confirmar',
        message: 'Deseja continuar?',
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should open a danger confirmation dialog', () => {
      const spy = jest.spyOn(service, 'open');
      service.delete('Usuário');
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'danger',
          title: 'Confirmar Exclusão',
        })
      );
    });
  });

  describe('save', () => {
    it('should open a success confirmation dialog', () => {
      const spy = jest.spyOn(service, 'open');
      service.save();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          title: 'Confirmar Salvamento',
        })
      );
    });
  });

  describe('openPrompt', () => {
    it('should open a dialog with input options and map the prompt result', (done) => {
      jest.spyOn(dialog, 'open').mockReturnValue({
        closed: of({ confirmed: true, value: 'Documento ilegível' }),
      } as never);

      service
        .openPrompt({
          type: 'danger',
          title: 'Confirmar Rejeição',
          message: 'Informe o motivo',
          input: { required: true, maxLength: 500 },
        })
        .subscribe((result) => {
          expect(result).toEqual({ confirmed: true, value: 'Documento ilegível' });
          expect(dialog.open).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
              data: expect.objectContaining({ input: { required: true, maxLength: 500 } }),
            }),
          );
          done();
        });
    });

    it('should return an unconfirmed result when the dialog closes without a value', (done) => {
      jest.spyOn(dialog, 'open').mockReturnValue({ closed: of(undefined) } as never);

      service
        .openPrompt({
          title: 'Confirmar Rejeição',
          message: 'Informe o motivo',
          input: { required: true },
        })
        .subscribe((result) => {
          expect(result).toEqual({ confirmed: false, value: '' });
          done();
        });
    });
  });

  describe('alert', () => {
    it('should open a warning alert dialog', () => {
      const spy = jest.spyOn(service, 'open');
      service.alert('Aviso', 'Algo aconteceu');
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'warning',
          title: 'Aviso',
          message: 'Algo aconteceu',
          showCancel: false,
        })
      );
    });
  });
});
