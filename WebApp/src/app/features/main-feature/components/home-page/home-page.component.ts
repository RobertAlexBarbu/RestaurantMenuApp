import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'

import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'
import { pageLoadAnimation } from '../../../../app.animations'
import {AppStore} from "../../../../core/stores/app.store";
import {JsonPipe} from "@angular/common";
import {RightSidebarComponent} from "../../../../shared/components/right-sidebar/right-sidebar.component";
import {EnvironmentService} from "../../../../core/services/environment/environment.service";
import {MenuService} from "../../../../core/http/services/menu-services/menu/menu.service";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {of, switchMap} from "rxjs";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {MatIcon} from "@angular/material/icon";

import {
  AdvancedChartContainerComponent
} from "../../../../shared/components/advanced-chart-container/advanced-chart-container.component";

import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {ChartJsService} from "../../../../core/services/chart-js/chart-js.service";

import {MenuAnalyticsService} from "../../../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {LoadingPageComponent} from "../../../../shared/components/loading-page/loading-page.component";
import {
  FeatureLoadingPageComponent
} from "../../../../shared/components/feature-loading-page/feature-loading-page.component";
import {MenuAccessChartComponent} from "../menu-access-chart/menu-access-chart.component";
import {MenuAccessDto} from "../../../../core/http/dto/menu-dto/menu-analytics/menu-access.dto";
import {MatDialog} from "@angular/material/dialog";
import {MenuAccessInsightDialogComponent} from "../menu-access-insight-dialog/menu-access-insight-dialog.component";
import {QrGeneratorComponent} from "../qr-generator/qr-generator.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        MatIcon,
        ToolbarComponent, JsonPipe, RightSidebarComponent, CardComponent, FormsModule, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatButton, AdvancedChartContainerComponent, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatEndDate, MatHint, MatOption, MatSelect, MatStartDate, MatSuffix, LoadingPageComponent, FeatureLoadingPageComponent, MenuAccessChartComponent, QrGeneratorComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pageLoadAnimation],
  providers: [provideNativeDateAdapter(), ChartJsService],
})
export class HomePageComponent {
  private readonly appStore = inject(AppStore)
  private readonly environmentService = inject(EnvironmentService)
  private readonly menuService = inject(MenuService)
  private readonly destroyRef = inject(DestroyRef);
  private readonly notificationService = inject(NotificationService)
  private readonly menuAnalyticsService = inject(MenuAnalyticsService)
  private readonly matDialog = inject(MatDialog)
  menu = this.appStore.user.menu;
  ssrUrl = this.environmentService.getSsrUrl();
  completeUrl = computed(() => this.ssrUrl + '/' + this.menu.url())
  qrUrl = computed(() => this.ssrUrl + '/qr/' + this.menu.id())
  form = new FormGroup({
    name: new FormControl<string>('', {
        validators: [Validators.required],
      nonNullable: true,
    }),
    url: new FormControl<string>('',
      {
          validators: [Validators.required,],
        nonNullable: true,
      },
    ),

  })
  loadingPage = signal(true);
  menuAccesses = signal<MenuAccessDto[]>([]);
  menuUrlAccesses = computed(() => {
    const accesses = this.menuAccesses().filter(ma => ma.menuAccessType === "url");
    return this.filterByTimePeriod(accesses);
  });

  menuQrAccesses = computed(() => {
    const accesses = this.menuAccesses().filter(ma => ma.menuAccessType === "qr");
    return this.filterByTimePeriod(accesses);
  });
  timePeriod = signal("All Time");

  private filterByTimePeriod(accesses: MenuAccessDto[]): MenuAccessDto[] {
    const now = new Date();
    const period = this.timePeriod();

    switch (period) {
      case "Today":
        { const todayStart = new Date(now.setHours(0, 0, 0, 0));
        return accesses.filter(ma => new Date(ma.createdAt) >= todayStart); }

      case "All Time":
      default:
        return accesses;
    }
  }
    constructor() {

    this.form.controls.name.setValue(this.menu.name())
    this.form.controls.url.setValue(this.menu.url())
    this.form.controls.url.valueChanges.subscribe(
      {
        next: value => {
          if (this.urlUnavailable()) {
            this.form.controls.url.clearValidators()
            this.urlUnavailable.set(false);
          }

        }
      }
    )
    this.menuAnalyticsService.getMenuAccessesByMenuId(this.menu.id()).subscribe({
      next: value => {
        this.loadingPage.set(false);
        this.menuAccesses.set(value);
      }
    })
  }
  updateMenuLoading = signal(false)
  urlUnavailable = signal(false);
  disabledSave = signal(true);
  enableSave() {
    this.disabledSave = signal(false);
  }

  timePeriodChange(event: string) {
    this.timePeriod.set(event);
  }
  updateMenu(): void {
      if (this.form.invalid) {
          return;
      }
    this.updateMenuLoading.set(true);
    if(this.form.getRawValue().url === this.menu.url()) {
      this.menuService.updateById(this.menu.id(), this.form.getRawValue())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: value => {
            this.updateMenuLoading.set(false);
            this.disabledSave = signal(true);
            this.notificationService.notify('Menu Updated Successfully.')
            this.appStore.updateMenu(this.form.getRawValue())
          }
      })
    } else {
      this.menuService.checkUrlAvailability(this.form.getRawValue().url)
        .pipe(
          switchMap(check => {
            if (check) {
              return this.menuService.updateById(this.menu.id(), this.form.getRawValue())
            } else {
              this.urlUnavailable.set(true);
              this.form.controls.url.setErrors({
                name: "Invalid URL",
              })
              return of("invalid-url");
            }
          }),
          takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (val) => {
            if (val !== "invalid-url") {
              this.disabledSave = signal(true);

              this.notificationService.notify('Menu Updated Successfully.')
              this.appStore.updateMenu(this.form.getRawValue())
            }
            this.updateMenuLoading.set(false);

          }
        })
    }
  }

  openInsightsDialog() {
    this.matDialog.open(MenuAccessInsightDialogComponent, {
      width: "700px",
      data: {
        qrAccesses: this.menuQrAccesses().length,
        urlAccesses: this.menuUrlAccesses().length,
        timePeriod: this.timePeriod(),
      }
    })
  }
}
