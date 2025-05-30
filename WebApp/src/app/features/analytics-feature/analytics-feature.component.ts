import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {FeatureLoadingPageComponent} from "../../shared/components/feature-loading-page/feature-loading-page.component";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {AppStore} from "../../core/stores/app.store";
import {switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuItemAccessDto} from "../../core/http/dto/menu-dto/menu-analytics/menu-item-access.dto";
import {JsonPipe} from "@angular/common";
import {
    AdvancedChartContainerComponent
} from "../../shared/components/advanced-chart-container/advanced-chart-container.component";
import {BarChartComponent} from "../../recipes/components/charts/bar-chart/bar-chart.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {MatButton} from "@angular/material/button";
import {
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ChartJsService} from "../../core/services/chart-js/chart-js.service";
import {LineChartComponent} from "../../recipes/components/charts/line-chart/line-chart.component";
import {BubbleChartComponent} from "../../recipes/components/charts/bubble-chart/bubble-chart.component";
import {
    HorizontalBarChartComponent
} from "../../recipes/components/charts/horizontal-bar-chart/horizontal-bar-chart.component";
import {MenuItemDto} from "../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {MenuItemAccessDetailDto} from "../../core/http/dto/menu-dto/menu-analytics/menu-item-access-detail.dto";
import {MatDialog} from "@angular/material/dialog";
import {HourChartComponent} from "./components/hour-chart/hour-chart.component";
import {ItemChartComponent} from "./components/item-chart/item-chart.component";
import {CategoryChartComponent} from "./components/category-chart/category-chart.component";

export interface HourlyChartData {
    hour: string;
    interactions: number;
}

export interface ItemChartData {
    name: string;
    count: number;
}

export interface CategoryChartData {
    name: string;
    interactions: number;

}

@Component({
  selector: 'app-analytics-feature',
    imports: [
        ToolbarComponent,
        FeatureLoadingPageComponent,
        JsonPipe,
        AdvancedChartContainerComponent,
        BarChartComponent,
        CardComponent,
        MatButton,
        MatDateRangeInput,
        MatDateRangePicker,
        MatDatepickerToggle,
        MatEndDate,
        MatFormField,
        MatHint,
        MatIcon,
        MatLabel,
        MatOption,
        MatSelect,
        MatStartDate,
        MatSuffix,
        LineChartComponent,
        BubbleChartComponent,
        HorizontalBarChartComponent,
        HourChartComponent,
        ItemChartComponent,
        CategoryChartComponent
    ],
  templateUrl: './analytics-feature.component.html',
  styleUrl: './analytics-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [ChartJsService]
})
export class AnalyticsFeatureComponent {
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    private readonly appStore = inject(AppStore);
    private readonly destroyRef = inject(DestroyRef);
    private readonly menuService = inject(MenuService);
    private readonly matDialog = inject(MatDialog);

    loading = signal(true);
    itemAccesses = signal<MenuItemAccessDto[]>([]);
    items: MenuItemDto[] = [];
    categories: MenuCategoryDto[] = [];

    // Separate filter signals for each chart
    // Hour chart filters
    hourlyTimePeriod = signal("All Time");
    hourlyInteractionType = signal("All Types");

    // Item chart filters
    itemTimePeriod = signal("All Time");
    itemInteractionType = signal("All Types");

    // Category chart filters
    categoryTimePeriod = signal("All Time");
    categoryInteractionType = signal("All Types");

    // Computed filtered data for each chart
    filteredHourlyAccesses = computed(() => {
        let accesses = this.itemAccesses();
        accesses = this.filterByTimePeriod(accesses, this.hourlyTimePeriod());
        accesses = this.filterByInteractionType(accesses, this.hourlyInteractionType());
        return accesses;
    });

    filteredItemAccesses = computed(() => {
        let accesses = this.itemAccesses();
        accesses = this.filterByTimePeriod(accesses, this.itemTimePeriod());
        accesses = this.filterByInteractionType(accesses, this.itemInteractionType());
        return accesses;
    });

    filteredCategoryAccesses = computed(() => {
        let accesses = this.itemAccesses();
        accesses = this.filterByTimePeriod(accesses, this.categoryTimePeriod());
        accesses = this.filterByInteractionType(accesses, this.categoryInteractionType());
        return accesses;
    });

    // Data for different charts
    hourlyData = computed(() => this.groupByHour(this.filteredHourlyAccesses()));
    itemInteractionData = computed(() => this.groupByItem(this.filteredItemAccesses()));
    categoryInteractionData = computed(() => this.groupByCategory(this.filteredCategoryAccesses()));

    constructor() {
        this.menuAnalyticsService.getMenuItemAccesses(this.appStore.user.menu.id())
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap(val => {
                    this.itemAccesses.set(val);
                    return this.menuService.getDataById(this.appStore.user.menu.id());
                })
            )
            .subscribe({
                next: (val) => {
                    this.items = [...val.drinksMenuItems, ...val.foodMenuItems];
                    this.categories = [...val.foodMenuCategories, ...val.drinksMenuCategories];
                    this.loading.set(false);
                }
            });
    }

    // Filter methods (updated to accept period/type parameters)
    private filterByTimePeriod(accesses: MenuItemAccessDto[], period: string): MenuItemAccessDto[] {
        const now = new Date();

        switch (period) {
            case "Today": {
                const todayStart = new Date(now.setHours(0, 0, 0, 0));
                return accesses.filter(ma => new Date(ma.createdAt) >= todayStart);
            }
            case "All Time":
            default:
                return accesses;
        }
    }

    private filterByInteractionType(accesses: MenuItemAccessDto[], type: string): MenuItemAccessDto[] {
        console.log(accesses.filter(ma => ma.menuItemAccessType === "favorite"))
        switch (type) {
            case "View Details":
                return accesses.filter(ma => ma.menuItemAccessType === "details");
            case "Add to Favorites":
                return accesses.filter(ma => ma.menuItemAccessType === "favorite");
            case "All Types":
            default:
                return accesses;
        }
    }

    // Data processing methods (unchanged)
    private groupByHour(accesses: MenuItemAccessDto[]): HourlyChartData[] {
        const hourlyMap = new Map<number, number>();

        // Initialize all hours with 0
        for (let i = 0; i < 24; i++) {
            hourlyMap.set(i, 0);
        }

        accesses.forEach(access => {
            const hour = new Date(access.createdAt).getHours();
            hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
        });

        return Array.from(hourlyMap.entries()).map(([hour, count]) => ({
            hour: `${hour}:00`,
            interactions: count
        }));
    }

    private groupByItem(accesses: MenuItemAccessDto[]): ItemChartData[] {
        const itemMap = new Map<number, ItemChartData>();

        accesses.forEach(access => {
            const item = this.items.find(i => i.id === access.menuItemId);
            if (item) {
                const existing = itemMap.get(access.menuItemId);
                itemMap.set(access.menuItemId, {
                    name: item.name,
                    count: (existing?.count || 0) + 1
                });
            }
        });

        return Array.from(itemMap.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 20); // Top 20 items
    }

    private groupByCategory(accesses: MenuItemAccessDto[]): CategoryChartData[] {
        const categoryMap = new Map<number, { name: string, count: number, items: Set<number> }>();

        accesses.forEach(access => {
            const category = this.categories.find(c => c.id === access.menuCategoryId);
            if (category) {
                const existing = categoryMap.get(access.menuCategoryId);
                if (existing) {
                    existing.count += 1;
                    existing.items.add(access.menuItemId);
                } else {
                    categoryMap.set(access.menuCategoryId, {
                        name: category.name,
                        count: 1,
                        items: new Set([access.menuItemId])
                    });
                }
            }
        });

        return Array.from(categoryMap.values()).map(cat => ({
            name: cat.name,
            interactions: cat.count,
            uniqueItems: cat.items.size
        }));
    }

    // Event handlers for hourly chart
    hourlyTimePeriodChange(event: string): void {
        this.hourlyTimePeriod.set(event);
    }

    hourlyInteractionTypeChange(event: string): void {
        this.hourlyInteractionType.set(event);
    }

    // Event handlers for item chart
    itemTimePeriodChange(event: string): void {
        this.itemTimePeriod.set(event);
    }

    itemInteractionTypeChange(event: string): void {
        this.itemInteractionType.set(event);
    }

    // Event handlers for category chart
    categoryTimePeriodChange(event: string): void {
        this.categoryTimePeriod.set(event);
    }

    categoryInteractionTypeChange(event: string): void {
        this.categoryInteractionType.set(event);
    }

    openInsightsDialog(): void {
        // Implement AI insights dialog logic
        console.log('Opening AI insights dialog');
    }
}
