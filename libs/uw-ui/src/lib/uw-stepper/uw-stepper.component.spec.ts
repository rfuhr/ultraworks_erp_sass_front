import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UwStepperComponent } from './uw-stepper.component';
import { UwStepperStepDirective } from './uw-stepper-step.directive';
import type { UwStepperNavigationMode, UwStepperStep } from './uw-stepper.types';

@Component({
  template: `
    <uw-stepper
      [steps]="steps()"
      [completedSteps]="completedSteps()"
      [navigationMode]="navigationMode()"
      [showCompletedIcon]="showCompletedIcon()"
      [lastStepLabel]="lastStepLabel()"
      overflowMode="scroll"
      (lastStepAction)="onLastStepAction()"
    >
      <ng-template [uwStepperStep]="steps()[0]?.id ?? ''">
        <div class="step-content-1">Conteúdo Step 1</div>
      </ng-template>
      <ng-template [uwStepperStep]="steps()[1]?.id ?? ''">
        <div class="step-content-2">Conteúdo Step 2</div>
      </ng-template>
      <ng-template [uwStepperStep]="steps()[2]?.id ?? ''">
        <div class="step-content-3">Conteúdo Step 3</div>
      </ng-template>
    </uw-stepper>
  `,
  imports: [UwStepperComponent, UwStepperStepDirective],
  standalone: true,
})
class TestHostComponent {
  readonly steps = signal<UwStepperStep[]>([
    { id: 'info', label: 'Informações', icon: 'description' },
    { id: 'data', label: 'Data & Local', icon: 'calendar_today' },
    { id: 'tickets', label: 'Ingressos', icon: 'payments' },
  ]);
  readonly completedSteps = signal<Set<string | number>>(new Set());
  readonly navigationMode = signal<UwStepperNavigationMode>('click-and-buttons');
  readonly showCompletedIcon = signal(true);
  readonly lastStepLabel = signal('Criar Evento');
  lastStepActionCount = 0;

  onLastStepAction(): void {
    this.lastStepActionCount++;
  }
}

describe('UwStepperComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  function getSteps(): NodeListOf<Element> {
    return hostFixture.nativeElement.querySelectorAll('.uw-stepper__step');
  }

  function getConnectors(): NodeListOf<Element> {
    return hostFixture.nativeElement.querySelectorAll('.uw-stepper__connector');
  }

  function getContent(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stepper__content');
  }

  function getPrevBtn(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stepper__btn--prev');
  }

  function getNextBtn(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stepper__btn--next');
  }

  function getDots(): NodeListOf<Element> {
    return hostFixture.nativeElement.querySelectorAll('.uw-stepper__dot');
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    });

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe('renderização dos steps', () => {
    it('should render all steps from the input array', () => {
      expect(getSteps().length).toBe(3);
    });

    it('should display step labels', () => {
      const steps = getSteps();
      expect(steps[0]?.textContent?.trim()).toContain('Informações');
      expect(steps[1]?.textContent?.trim()).toContain('Data & Local');
      expect(steps[2]?.textContent?.trim()).toContain('Ingressos');
    });

    it('should have first step active by default', () => {
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--active')).toBe(true);
      expect(steps[1]?.classList.contains('uw-stepper__step--active')).toBe(false);
    });

    it('should render connectors between steps', () => {
      expect(getConnectors().length).toBe(2);
    });
  });

  describe('navegação next/previous', () => {
    it('should go to next step when clicking Próximo', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--active')).toBe(false);
      expect(steps[1]?.classList.contains('uw-stepper__step--active')).toBe(true);
    });

    it('should go to previous step when clicking Anterior', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getPrevBtn()?.click();
      hostFixture.detectChanges();
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--active')).toBe(true);
    });

    it('should have prev button disabled on first step', () => {
      expect(getPrevBtn()?.hasAttribute('disabled')).toBe(true);
    });

    it('should enable prev button after moving forward', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      expect(getPrevBtn()?.hasAttribute('disabled')).toBe(false);
    });

    it('should emit lastStepAction on last step next click', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      expect(hostComponent.lastStepActionCount).toBe(1);
    });
  });

  describe('label customizado no último step', () => {
    it('should show custom label on last step', () => {
      hostComponent.lastStepLabel.set('Publicar Evento');
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      expect(getNextBtn()?.textContent?.trim()).toContain('Publicar Evento');
    });
  });

  describe('modos de navegação', () => {
    it('should navigate back by clicking previous step header in click-and-buttons mode', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      const steps = getSteps();
      (steps[0] as HTMLElement)?.click();
      hostFixture.detectChanges();
      expect(steps[0]?.classList.contains('uw-stepper__step--active')).toBe(true);
    });

    it('should not navigate to future steps by clicking step header', () => {
      const steps = getSteps();
      (steps[1] as HTMLElement)?.click();
      hostFixture.detectChanges();
      expect(steps[1]?.classList.contains('uw-stepper__step--active')).toBe(false);
      expect(steps[1]?.classList.contains('uw-stepper__step--disabled')).toBe(true);
    });

    it('should not navigate by clicking step header in buttons-only mode', () => {
      hostComponent.navigationMode.set('buttons-only');
      hostFixture.detectChanges();
      const steps = getSteps();
      (steps[2] as HTMLElement)?.click();
      hostFixture.detectChanges();
      expect(steps[2]?.classList.contains('uw-stepper__step--active')).toBe(false);
    });

    it('should have disabled class on steps in buttons-only mode', () => {
      hostComponent.navigationMode.set('buttons-only');
      hostFixture.detectChanges();
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--disabled')).toBe(true);
      expect(steps[1]?.classList.contains('uw-stepper__step--disabled')).toBe(true);
    });

    it('should have disabled class on future steps in click-and-buttons mode', () => {
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--disabled')).toBe(false);
      expect(steps[1]?.classList.contains('uw-stepper__step--disabled')).toBe(true);
      expect(steps[2]?.classList.contains('uw-stepper__step--disabled')).toBe(true);
    });

    it('should show dots in dots-and-buttons mode', () => {
      hostComponent.navigationMode.set('dots-and-buttons');
      hostFixture.detectChanges();
      expect(getDots().length).toBe(3);
    });
  });

  describe('indicadores de step validado', () => {
    it('should show completed state when step id is in completedSteps', () => {
      hostComponent.completedSteps.set(new Set(['info']));
      hostFixture.detectChanges();
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--completed')).toBe(true);
    });

    it('should highlight connector after completed step', () => {
      hostComponent.completedSteps.set(new Set(['info']));
      hostFixture.detectChanges();
      expect(getConnectors()[0]?.classList.contains('uw-stepper__connector--completed')).toBe(true);
    });

    it('should not show completed state when showCompletedIcon is false', () => {
      hostComponent.showCompletedIcon.set(false);
      hostComponent.completedSteps.set(new Set(['info']));
      hostFixture.detectChanges();
      const steps = getSteps();
      expect(steps[0]?.classList.contains('uw-stepper__step--completed')).toBe(true);
    });
  });

  describe('progress dots', () => {
    it('should render dots when navigation mode has dots', () => {
      expect(getDots().length).toBe(3);
    });

    it('should highlight the active dot', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      const dots = getDots();
      expect(dots[1]?.classList.contains('uw-stepper__dot--active')).toBe(true);
    });

    it('should mark previous dots as completed', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      getNextBtn()?.click();
      hostFixture.detectChanges();
      const dots = getDots();
      expect(dots[0]?.classList.contains('uw-stepper__dot--completed')).toBe(true);
      expect(dots[1]?.classList.contains('uw-stepper__dot--completed')).toBe(true);
    });
  });

  describe('projeção de conteúdo', () => {
    it('should render the content of the active step', () => {
      const content = getContent();
      expect(content?.querySelector('.step-content-1')).toBeTruthy();
      expect(content?.querySelector('.step-content-2')).toBeNull();
    });

    it('should switch content when navigating to next step', () => {
      getNextBtn()?.click();
      hostFixture.detectChanges();
      const content = getContent();
      expect(content?.querySelector('.step-content-1')).toBeNull();
      expect(content?.querySelector('.step-content-2')).toBeTruthy();
    });
  });
});
