import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  ToastService,
  UwAlertComponent,
  UwButtonComponent,
  UwCardComponent,
  UwCardHeaderDirective,
  UwEmptyStateComponent,
  UwPageHeaderComponent,
  UwProgressBarComponent,
  UwSkeletonComponent,
  UwStatCardComponent,
  UwTimelineComponent,
  UwTimelineItemComponent,
} from '@app/uw-ui';
import { HomeDashboardService } from './home-dashboard.service';

type LoadMode = 'success' | 'empty' | 'error';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TranslatePipe,
    UwAlertComponent,
    UwButtonComponent,
    UwCardComponent,
    UwCardHeaderDirective,
    UwEmptyStateComponent,
    UwPageHeaderComponent,
    UwProgressBarComponent,
    UwSkeletonComponent,
    UwStatCardComponent,
    UwTimelineComponent,
    UwTimelineItemComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly dashboard = inject(HomeDashboardService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly state = this.dashboard.state;
  readonly metrics = this.dashboard.metrics;
  readonly activities = this.dashboard.activities;
  readonly progress = this.dashboard.progress;
  readonly loading = computed(() => this.state() === 'loading');
  readonly skeletonItems = [1, 2, 3, 4] as const;

  ngOnInit(): void {
    const requested = this.route.snapshot.queryParamMap.get('state');
    const mode: LoadMode = requested === 'empty' || requested === 'error' ? requested : 'success';
    this.dashboard.load(mode);
  }

  load(mode: LoadMode): void {
    this.dashboard.load(mode);
  }

  retry(): void {
    this.dashboard.retry();
  }

  onDemoAction(): void {
    this.toast.show(this.translate.instant('home.demo.action'), 'info');
  }
}
