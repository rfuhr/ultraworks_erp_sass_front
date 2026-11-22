import { TestBed } from '@angular/core/testing';
import { UwNotificationItem, UwProfileMenuItem } from './uw-admin-layout.types';
import { UwHeaderComponent } from './uw-header.component';

describe('UwHeaderComponent', () => {
  const notifications: readonly UwNotificationItem[] = [
    {
      id: 'n1',
      title: 'Relatório aprovado',
      description: 'O relatório foi aprovado.',
      time: 'há 2 horas',
      icon: 'check_circle',
      read: false,
    },
  ];
  const labels = {
    title: 'Notificações',
    empty: 'Nenhuma notificação',
    loading: 'Carregando…',
    error: 'Erro ao carregar',
    retry: 'Tentar novamente',
    showAll: 'Ver todas',
  };
  const profileItems: readonly UwProfileMenuItem[] = [
    { id: 'profile', label: 'Meu perfil', icon: 'person' },
    { id: 'separator', label: '', separator: true },
    { id: 'logout', label: 'Sair', icon: 'logout', danger: true },
  ];

  async function createHeader() {
    await TestBed.configureTestingModule({ imports: [UwHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UwHeaderComponent);
    fixture.componentRef.setInput('user', { name: 'Ana Souza', role: 'Admin', initials: 'AS' });
    fixture.componentRef.setInput('unreadCount', 1);
    fixture.componentRef.setInput('notifications', notifications);
    fixture.componentRef.setInput('notificationLabels', labels);
    fixture.componentRef.setInput('profileItems', profileItems);
    fixture.detectChanges();
    return fixture;
  }

  it('renderiza o painel de notificações com itens e rodapé', async () => {
    const fixture = await createHeader();
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Notificações');
    expect(text).toContain('Relatório aprovado');
    expect(text).toContain('O relatório foi aprovado.');
    expect(text).toContain('Ver todas');
  });

  it('emite a notificação selecionada', async () => {
    const fixture = await createHeader();
    let selected: UwNotificationItem | undefined;
    fixture.componentInstance.notificationItemClick.subscribe((item) => (selected = item));

    const button = fixture.nativeElement.querySelector('.uw-header__notification') as HTMLButtonElement;
    button.click();

    expect(selected?.id).toBe('n1');
  });

  it('emite a ação de ver todas as notificações', async () => {
    const fixture = await createHeader();
    let showAll = false;
    fixture.componentInstance.notificationsShowAll.subscribe(() => (showAll = true));

    const footer = fixture.nativeElement.querySelector('.uw-header__panel-footer') as HTMLButtonElement;
    footer.click();

    expect(showAll).toBe(true);
  });

  it('renderiza o menu de perfil e emite o item selecionado', async () => {
    const fixture = await createHeader();
    let selected: UwProfileMenuItem | undefined;
    fixture.componentInstance.profileItemClick.subscribe((item) => (selected = item));

    const items = fixture.nativeElement.querySelectorAll('.uw-header__profile-item');
    (items[items.length - 1] as HTMLButtonElement).click();

    expect(selected?.id).toBe('logout');
  });

  it('exibe estado vazio quando não há notificações', async () => {
    await TestBed.configureTestingModule({ imports: [UwHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(UwHeaderComponent);
    fixture.componentRef.setInput('notificationLabels', labels);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nenhuma notificação');
  });
});
