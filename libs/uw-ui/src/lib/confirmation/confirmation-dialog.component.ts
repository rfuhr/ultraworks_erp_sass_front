import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ConfirmationInputOptions,
  ConfirmationOptions,
  ConfirmationPromptOptions,
  ConfirmationPromptResult,
  ConfirmationType,
} from './confirmation.model';

const CONFIG: Record<ConfirmationType, { icon: string; containerClass: string }> = {
  danger: { icon: 'warning', containerClass: 'uw-confirm--danger' },
  warning: { icon: 'warning_amber', containerClass: 'uw-confirm--warning' },
  success: { icon: 'check_circle', containerClass: 'uw-confirm--success' },
  info: { icon: 'info', containerClass: 'uw-confirm--info' },
};

@Component({
  selector: 'uw-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwConfirmationDialogComponent {
  readonly data = inject<ConfirmationOptions | ConfirmationPromptOptions>(DIALOG_DATA);
  private dialogRef = inject<DialogRef<boolean | ConfirmationPromptResult>>(DialogRef);

  readonly input = computed<ConfirmationInputOptions | null>(() =>
    'input' in this.data ? this.data.input : null,
  );
  readonly value = signal(this.input()?.initialValue ?? '');
  readonly confirmDisabled = computed(() => {
    const input = this.input();
    return input?.required === true && this.value().trim().length === 0;
  });

  get cfg() {
    return CONFIG[this.data.type ?? 'danger'];
  }

  get maxLength(): number | null {
    return this.input()?.maxLength ?? null;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
  }

  close(result: boolean) {
    const input = this.input();
    if (!input) {
      this.dialogRef.close(result);
      return;
    }

    this.dialogRef.close({
      confirmed: result,
      value: result ? this.value().trim() : this.value(),
    });
  }
}
