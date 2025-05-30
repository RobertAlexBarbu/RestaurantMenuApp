import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {FeatureLoadingPageComponent} from "../../shared/components/feature-loading-page/feature-loading-page.component";
import {JsonPipe} from "@angular/common";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {AppStore} from "../../core/stores/app.store";
import {MenuItemAccessDto} from "../../core/http/dto/menu-dto/menu-analytics/menu-item-access.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {MenuReviewDto} from "../../core/http/dto/menu-dto/menu/menu-review.dto";

@Component({
  selector: 'app-reviews-feature',
    imports: [
        ToolbarComponent,
        FeatureLoadingPageComponent,
        JsonPipe
    ],
  templateUrl: './reviews-feature.component.html',
  styleUrl: './reviews-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ReviewsFeatureComponent {
    private readonly menuService = inject(MenuService)
    loading = signal(true);
    private readonly appStore = inject(AppStore);
    private readonly destroyRef = inject(DestroyRef)
    reviews = signal<MenuReviewDto[]>([])
    constructor() {
        this.menuService.getReviewsByMenuId(this.appStore.user.menu.id())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (val) => {
                    this.reviews.set(val);
                    this.loading.set(false);
                }
            })
    }
}
