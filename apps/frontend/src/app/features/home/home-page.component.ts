import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@app/i18n';
import { UwLanguageSwitcherComponent } from '@app/uw-ui';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeDemoService } from './home-demo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UwLanguageSwitcherComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  providers: [HomeDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly demo = inject(HomeDemoService);
  readonly i18n = inject(I18nService);

  readonly state = this.demo.state;
  readonly items = this.demo.items;

  ngOnInit(): void {
    this.demo.load('success');
  }

  load(mode: 'success' | 'empty' | 'error'): void {
    this.demo.load(mode);
  }

  changeLanguage(language: string): void {
    this.i18n.use(language);
  }
}
