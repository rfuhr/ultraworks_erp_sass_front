import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  UwButtonComponent,
  UwCardComponent,
  UwEmptyStateComponent,
  UwIconComponent,
  UwPageHeaderComponent,
} from '@app/uw-ui';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list-page',
  standalone: true,
  imports: [
    TranslatePipe,
    UwButtonComponent,
    UwCardComponent,
    UwEmptyStateComponent,
    UwIconComponent,
    UwPageHeaderComponent,
  ],
  templateUrl: './notification-list-page.component.html',
  styleUrl: './notification-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationListPageComponent {
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationsService);

  readonly items = this.notifications.items;
  readonly unreadCount = this.notifications.unreadCount;

  open(id: string): void {
    void this.router.navigate(['/notificacoes', id]);
  }

  markAllRead(): void {
    this.notifications.markAllRead();
  }
}
