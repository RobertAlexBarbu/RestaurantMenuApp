import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-analytics/menu-analytics.service";
import {FormatLlmResponsePipe} from "../../../../shared/pipes/format-llm-response/format-llm-response.pipe";
import {TypewriterDirective} from "../../../../shared/directives/typewriter/typewriter.directive";

@Component({
  selector: 'app-menu-access-insight-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatProgressSpinner,
    FormatLlmResponsePipe,
    TypewriterDirective
  ],
  templateUrl: './menu-access-insight-dialog.component.html',
  styleUrl: './menu-access-insight-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAccessInsightDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MenuAccessInsightDialogComponent>)
  readonly data = inject<{qrAccesses: number,  urlAccesses: number,  timePeriod: string}>(MAT_DIALOG_DATA);
  private readonly menuAnalyticsService = inject(MenuAnalyticsService);
  insight = signal('');
  loading = signal(true);

  constructor() {
    this.menuAnalyticsService.getMenuAccessInsights(this.data.qrAccesses, this.data.urlAccesses, this.data.timePeriod)
      .subscribe((data) => {
        this.insight.set(data.text);
        this.loading.set(false);
      })
  }


  onNoClick(): void {
    this.dialogRef.close()
  }
}
