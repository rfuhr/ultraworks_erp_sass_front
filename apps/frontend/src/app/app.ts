import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from '@app/i18n';
import { UwToastComponent } from '@app/uw-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UwToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly i18n = inject(I18nService);

  constructor() {
    this.i18n.init();
  }
}
