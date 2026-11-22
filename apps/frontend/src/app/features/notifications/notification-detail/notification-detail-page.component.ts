import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  UwButtonComponent,
  UwCardComponent,
  UwEmptyStateComponent,
  UwIconComponent,
} from '@app/uw-ui';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-detail-page',
  standalone: true,
  imports: [TranslatePipe, UwButtonComponent, UwCardComponent, UwEmptyStateComponent, UwIconComponent],
  templateUrl: './notification-detail-page.component.html',
  styleUrl: './notification-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationsService);

  private readonly id = signal(this.route.snapshot.paramMap.get('id') ?? '');
  readonly notification = computed(() => this.notifications.getById(this.id()));

  ngOnInit(): void {
    if (this.notification()) {
      this.notifications.markRead(this.id());
    }
  }

  back(): void {
    void this.router.navigateByUrl('/notificacoes');
  }
}
