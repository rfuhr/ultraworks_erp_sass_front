export type ConfirmationType = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmationInputOptions {
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  initialValue?: string;
}

export interface ConfirmationOptions {
  type?: ConfirmationType;
  title: string;
  message: string;
  messageBold?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  footerInfo?: string;
}

export interface ConfirmationPromptOptions extends ConfirmationOptions {
  input: ConfirmationInputOptions;
}

export interface ConfirmationPromptResult {
  confirmed: boolean;
  value: string;
}
