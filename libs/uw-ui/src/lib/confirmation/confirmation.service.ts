import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, map } from 'rxjs';
import { UwConfirmationDialogComponent } from './confirmation-dialog.component';
import {
  ConfirmationOptions,
  ConfirmationPromptOptions,
  ConfirmationPromptResult,
} from './confirmation.model';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private dialog = inject(Dialog);

  open(options: ConfirmationOptions): Observable<boolean> {
    const ref = this.dialog.open<boolean, ConfirmationOptions>(UwConfirmationDialogComponent, {
      data: options,
      width: '420px',
      panelClass: 'confirmation-dialog-panel',
      disableClose: true,
    });
    return ref.closed.pipe(map(v => v ?? false));
  }

  openPrompt(options: ConfirmationPromptOptions): Observable<ConfirmationPromptResult> {
    const ref = this.dialog.open<
      boolean | ConfirmationPromptResult,
      ConfirmationPromptOptions
    >(UwConfirmationDialogComponent, {
      data: options,
      width: '420px',
      panelClass: 'confirmation-dialog-panel',
      disableClose: true,
    });
    return ref.closed.pipe(
      map((value) =>
        typeof value === 'object' && value !== null
          ? value
          : { confirmed: false, value: options.input.initialValue ?? '' },
      ),
    );
  }

  delete(entity: string, id?: string): Observable<boolean> {
    return this.open({
      type: 'danger',
      title: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja excluir este registro?',
      messageBold: 'Esta ação não poderá ser desfeita.',
      confirmLabel: 'Confirmar',
      cancelLabel: 'Cancelar',
      showCancel: true,
      footerInfo: id ? `${entity} ID: ${id}` : undefined,
    });
  }

  save(entity?: string): Observable<boolean> {
    return this.open({
      type: 'success',
      title: 'Confirmar Salvamento',
      message: `Deseja salvar as alterações${entity ? ` em ${entity}` : ''}?`,
      messageBold: 'Os dados serão atualizados permanentemente.',
      confirmLabel: 'Salvar',
      cancelLabel: 'Cancelar',
      showCancel: true,
    });
  }

  alert(title: string, message: string): Observable<boolean> {
    return this.open({
      type: 'warning',
      title,
      message,
      confirmLabel: 'Ok',
      showCancel: false,
    });
  }
}
