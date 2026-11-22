import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { AuthService } from '@app/core';
import { I18nService } from '@app/i18n';
import {
  CustomInputComponent,
  FormFieldComponent,
  ToastService,
  UwAlertComponent,
  UwButtonComponent,
  UwCardComponent,
  UwLanguageSwitcherComponent,
  UwSpinnerComponent,
} from '@app/uw-ui';
import { DEMO_CREDENTIALS } from '../data/login.mock-fixtures';
import { LOGIN_REPOSITORY } from '../data/login.repository';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    UwAlertComponent,
    UwButtonComponent,
    UwCardComponent,
    CustomInputComponent,
    UwLanguageSwitcherComponent,
    UwSpinnerComponent,
    FormFieldComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly repository = inject(LOGIN_REPOSITORY);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);
  readonly i18n = inject(I18nService);

  readonly credentials = DEMO_CREDENTIALS;
  readonly currentLanguage = this.i18n.currentLanguage;
  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private readonly formEvents = toSignal(merge(this.form.valueChanges, this.form.statusChanges), {
    initialValue: null,
  });

  readonly emailField = viewChild<ElementRef<HTMLElement>>('emailField');
  readonly passwordField = viewChild<ElementRef<HTMLElement>>('passwordField');
  readonly errorAlert = viewChild<ElementRef<HTMLElement>>('errorAlert');

  readonly emailError = computed(() => {
    this.formEvents();
    const control = this.form.controls.email;
    if (!(control.touched || this.submitted())) return null;
    if (control.hasError('required')) return 'login.error.required';
    if (control.hasError('email')) return 'login.error.email';
    return null;
  });

  readonly passwordError = computed(() => {
    this.formEvents();
    const control = this.form.controls.password;
    if (!(control.touched || this.submitted())) return null;
    if (control.hasError('required')) return 'login.error.required';
    if (control.hasError('minlength')) return 'login.error.password';
    return null;
  });

  constructor() {
    if (this.auth.isAuthenticated()) {
      void this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  changeLanguage(language: string): void {
    this.i18n.use(language);
  }

  onSubmit(): void {
    if (this.loading()) return;

    this.submitted.set(true);
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    this.loading.set(true);
    this.repository.login(this.form.getRawValue()).subscribe({
      next: (user) => {
        this.auth.setSession(user);
        this.loading.set(false);
        this.toast.show(this.translate.instant('login.success'), 'success');
        void this.router.navigateByUrl('/', { replaceUrl: true });
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('login.error.invalid');
        this.focusError();
      },
    });
  }

  private focusFirstInvalid(): void {
    const target = this.form.controls.email.invalid ? this.emailField() : this.passwordField();
    queueMicrotask(() => {
      target?.nativeElement.querySelector<HTMLInputElement>('input')?.focus();
    });
  }

  private focusError(): void {
    queueMicrotask(() => this.errorAlert()?.nativeElement.focus());
  }
}
