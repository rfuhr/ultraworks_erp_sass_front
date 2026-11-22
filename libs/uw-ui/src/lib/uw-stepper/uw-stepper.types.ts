export interface UwStepperStep {
  id: string | number;
  label: string;
  icon?: string;
}

export type UwStepperNavigationMode = 'click-and-buttons' | 'buttons-only' | 'dots-and-buttons';

export type UwStepperOverflowMode = 'collapse-labels' | 'scroll' | 'truncate' | 'wrap' | 'vertical';
