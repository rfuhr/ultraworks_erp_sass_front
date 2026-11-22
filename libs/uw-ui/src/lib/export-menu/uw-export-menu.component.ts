import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { UwButtonComponent } from '../button/uw-button.component';
import { UwIconComponent } from '../icon/uw-icon.component';

export type FormatoExportacao = 'csv' | 'xlsx' | 'pdf';

@Component({
  selector: 'uw-export-menu',
  standalone: true,
  imports: [UwButtonComponent, UwIconComponent],
  templateUrl: './uw-export-menu.component.html',
  styleUrl: './uw-export-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwExportMenuComponent {
  readonly label = input('Exportar');
  readonly csvLabel = input('Exportar CSV');
  readonly xlsxLabel = input('Exportar Excel');
  readonly pdfLabel = input('Exportar PDF');
  readonly formatos = input<FormatoExportacao[]>(['xlsx', 'csv', 'pdf']);
  readonly loading = input(false);
  readonly disabled = input(false);

  readonly exportar = output<FormatoExportacao>();

  protected readonly aberto = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected toggle(): void {
    if (this.loading() || this.disabled()) {
      return;
    }
    this.aberto.update((valor) => !valor);
  }

  protected mostra(formato: FormatoExportacao): boolean {
    return this.formatos().includes(formato);
  }

  protected selecionar(formato: FormatoExportacao): void {
    if (this.loading() || this.disabled()) {
      return;
    }
    this.aberto.set(false);
    this.exportar.emit(formato);
  }

  protected fechar(): void {
    this.aberto.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected aoClicarFora(event: MouseEvent): void {
    const alvo = event.target as Node | null;
    if (alvo && !this.host.nativeElement.contains(alvo)) {
      this.aberto.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected aoPressionarEscape(): void {
    this.aberto.set(false);
  }
}
