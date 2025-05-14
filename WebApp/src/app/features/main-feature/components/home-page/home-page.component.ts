import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'

import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'
import { pageLoadAnimation } from '../../../../app.animations'
import {AppStore} from "../../../../core/stores/app.store";
import {JsonPipe} from "@angular/common";
import {RightSidebarComponent} from "../../../../shared/components/right-sidebar/right-sidebar.component";
import {EnvironmentService} from "../../../../core/services/environment/environment.service";
import {MenuService} from "../../../../core/http/services/menu/menu.service";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatStepper} from "@angular/material/stepper";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {of, switchMap} from "rxjs";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {MatIcon} from "@angular/material/icon";
import {QrGeneratorComponent} from "../../../../recipes/components/qr-generator/qr-generator.component";
import {
  AdvancedChartContainerComponent
} from "../../../../shared/components/advanced-chart-container/advanced-chart-container.component";
import {BarChartComponent} from "../../../../recipes/components/charts/bar-chart/bar-chart.component";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ChartJsService} from "../../../../core/services/chart-js/chart-js.service";
import {PieChartComponent} from "../../../../recipes/components/charts/pie-chart/pie-chart.component";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-analytics/menu-analytics.service";
import {LoadingPageComponent} from "../../../../shared/components/loading-page/loading-page.component";
import {
  FeatureLoadingPageComponent
} from "../../../../shared/components/feature-loading-page/feature-loading-page.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
  imports: [
    MatIcon,
    ToolbarComponent, JsonPipe, RightSidebarComponent, CardComponent, FormsModule, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatButton, QrGeneratorComponent, AdvancedChartContainerComponent, BarChartComponent, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatEndDate, MatHint, MatOption, MatSelect, MatStartDate, MatSuffix, PieChartComponent, LoadingPageComponent, FeatureLoadingPageComponent],
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
  menu = this.appStore.user.menu;
  ssrUrl = this.environmentService.getSsrUrl();
  completeUrl = computed(() => this.ssrUrl + '/' + this.menu.url())
  qrUrl = computed(() => this.ssrUrl + '/qr/' + this.menu.id())
  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
    }),
    url: new FormControl<string>('',
      {
        nonNullable: true,
      },
    ),

  })
  loadingPage = signal(true);

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
        console.log(value);
      }
    })
  }
  updateMenuLoading = signal(false)
  urlUnavailable = signal(false);
  disabledSave = signal(true);
  enableSave() {
    this.disabledSave = signal(false);
  }
  updateMenu(): void {
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
}
