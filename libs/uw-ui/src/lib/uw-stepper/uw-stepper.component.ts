import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import { UwStepperStepDirective } from './uw-stepper-step.directive';
import type { UwStepperNavigationMode, UwStepperOverflowMode, UwStepperStep } from './uw-stepper.types';

@Component({
  selector: 'uw-stepper',
  standalone: true,
  imports: [CommonModule, UwIconComponent, UwStepperStepDirective],
  templateUrl: './uw-stepper.component.html',
  styleUrl: './uw-stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwStepperComponent {
  readonly steps = input.required<UwStepperStep[]>();
  readonly completedSteps = input<Set<string | number>>(new Set());
  readonly navigationMode = input<UwStepperNavigationMode>('click-and-buttons');
  readonly showCompletedIcon = input(true);
  readonly lastStepLabel = input('Concluir');

  readonly activeStep = input<number | undefined>(undefined);
  readonly stepChange = output<number>();

  readonly hideContent = input(false);
  readonly hideActions = input(false);
  readonly showSaveDraft = input(false);
  readonly saveDraft = output<void>();
  readonly overflowMode = input<UwStepperOverflowMode>('collapse-labels');

  readonly lastStepAction = output<void>();

  protected readonly _currentStep = signal(0);

  protected readonly currentStep = computed(() => {
    const external = this.activeStep();
    if (external !== undefined) return external - 1;
    return this._currentStep();
  });

  constructor() {
    effect(() => {
      const external = this.activeStep();
      if (external !== undefined) {
        this._currentStep.set(external - 1);
      }
    });
  }

  protected readonly stepTemplates = contentChildren(UwStepperStepDirective);

  protected readonly isFirstStep = computed(() => this.currentStep() === 0);
  protected readonly isLastStep = computed(() => this.currentStep() === this.steps().length - 1);

  protected readonly activeStepConfig = computed(() => this.steps()[this.currentStep()]);

  protected readonly activeTemplate = computed(() => {
    const activeId = this.activeStepConfig()?.id;
    return this.stepTemplates().find(t => t.uwStepperStep() === activeId);
  });

  protected readonly progressDots = computed(() =>
    this.steps().map((_, i) => ({
      index: i,
      isActive: i === this.currentStep(),
      isCompleted: i < this.currentStep(),
    })),
  );

  protected readonly isStepClickable = computed(() => {
    return this.navigationMode() === 'click-and-buttons';
  });

  protected readonly showDots = computed(() => {
    return this.navigationMode() === 'dots-and-buttons' || this.navigationMode() === 'click-and-buttons';
  });

  isStepCompleted(index: number, stepId: string | number): boolean {
    return index < this.currentStep() || this.completedSteps().has(stepId);
  }

  isStepDisabled(index: number): boolean {
    if (!this.isStepClickable()) return true;
    return index > this.currentStep();
  }

  goToNext(): void {
    const nextIndex = this.currentStep() + 1;
    if (this.isLastStep()) {
      this.lastStepAction.emit();
      return;
    }
    if (this.activeStep() !== undefined) {
      this.stepChange.emit(nextIndex + 1);
    } else {
      this._currentStep.set(nextIndex);
    }
  }

  goToPrevious(): void {
    if (this.isFirstStep()) return;
    const prevIndex = this.currentStep() - 1;
    if (this.activeStep() !== undefined) {
      this.stepChange.emit(prevIndex + 1);
    } else {
      this._currentStep.set(prevIndex);
    }
  }

  goToStep(index: number): void {
    if (this.navigationMode() !== 'click-and-buttons') return;
    if (this.activeStep() !== undefined) {
      this.stepChange.emit(index + 1);
    } else {
      this._currentStep.set(index);
    }
  }

  shouldShowLabel(index: number): boolean {
    return this.overflowMode() !== 'collapse-labels' || index === this.currentStep();
  }
}
