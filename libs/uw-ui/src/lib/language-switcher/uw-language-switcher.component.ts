import { ChangeDetectionStrategy, Component, input, OnInit, output, viewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwIconComponent } from '../icon/uw-icon.component';
import { UwPopoverComponent } from '../popover/uw-popover.component';
import { UWPopoverTrigger } from '../directives/popover-trigger/uw-popover-trigger.directive';

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'uw-language-switcher',
  standalone: true,
  imports: [CommonModule, UwIconComponent, UwPopoverComponent, UWPopoverTrigger],
  templateUrl: './uw-language-switcher.component.html',
  styleUrl: './uw-language-switcher.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwLanguageSwitcherComponent implements OnInit {
  readonly languages = input<LanguageOption[]>([
    { code: 'pt-br', label: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ]);

  readonly initialLang = input<string>('pt-br');
  readonly languageChange = output<string>();

  selectedLang = 'pt-br';
  protected readonly popover = viewChild.required(UwPopoverComponent);

  ngOnInit() {
    this.selectedLang = this.initialLang();
  }

  selectLanguage(lang: string) {
    this.selectedLang = lang;
    this.popover().close();
    this.languageChange.emit(lang);
  }
}
