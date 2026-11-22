import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';

export type UwProgressStepState = 'done' | 'current' | 'pending' | 'disabled';
export type UwProgressStepTone = 'default' | 'error';

export interface UwProgressStep {
  label: string;
  state: UwProgressStepState;
  /** Texto complementar exibido abaixo do rótulo (ex.: motivo da etapa desabilitada). */
  hint?: string;
  tone?: UwProgressStepTone;
  /** Sobrescreve o ícone padrão do estado. */
  icon?: string;
}

const ICONE_POR_ESTADO: Record<UwProgressStepState, string> = {
  done: 'check',
  current: 'edit',
  pending: 'flag',
  disabled: 'remove',
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- prefixo uw- é o padrão da biblioteca interna
  selector: 'uw-progress-track',
  standalone: true,
  imports: [CommonModule, UwIconComponent],
  templateUrl: './uw-progress-track.component.html',
  styleUrl: './uw-progress-track.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwProgressTrackComponent {
  readonly steps = input.required<UwProgressStep[]>();
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly trilha = computed(() => this.steps());

  protected icone(step: UwProgressStep): string {
    return step.icon ?? ICONE_POR_ESTADO[step.state];
  }

  protected classeDoPonto(step: UwProgressStep): Record<string, boolean> {
    return {
      'uw-progress-track__dot--done': step.state === 'done',
      'uw-progress-track__dot--current': step.state === 'current',
      'uw-progress-track__dot--pending': step.state === 'pending',
      'uw-progress-track__dot--disabled': step.state === 'disabled',
      'uw-progress-track__dot--error': step.tone === 'error',
    };
  }

  protected classeDoRotulo(step: UwProgressStep): Record<string, boolean> {
    return {
      'uw-progress-track__label--done': step.state === 'done' || step.state === 'current',
      'uw-progress-track__label--disabled': step.state === 'disabled',
      'uw-progress-track__label--error': step.tone === 'error',
    };
  }

  protected classeDoConector(index: number): Record<string, boolean> {
    const proximo = this.steps()[index + 1];
    return {
      'uw-progress-track__connector--completed':
        proximo?.state === 'done' || proximo?.state === 'current',
      'uw-progress-track__connector--disabled': proximo?.state === 'disabled',
    };
  }

  protected ariaHabilitado(step: UwProgressStep): 'true' | null {
    return step.state === 'disabled' ? 'true' : null;
  }
}
