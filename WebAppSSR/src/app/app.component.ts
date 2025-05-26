import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MenuService} from "./core/http/services/menu-services/menu/menu.service";
import {MenuAnalyticsService} from "./core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {MatIconRegistry} from "@angular/material/icon";
import {ActiveFeatureStore} from "./core/stores/active-feature.store";
import {ScrollService} from "./core/services/scroll/scroll.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'WebAppSSR';
    private readonly iconRegistry = inject(MatIconRegistry)
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef)
    private readonly activeFeatureStore = inject(ActiveFeatureStore);
    private readonly drawerContentService = inject(ScrollService);
    constructor() {
        const defaultFontSetClasses = this.iconRegistry.getDefaultFontSetClass()
        const outlinedFontSetClasses = defaultFontSetClasses
            .filter((fontSetClass) => fontSetClass !== 'material-icons')
            .concat(['material-symbols-rounded'])
        this.iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses)

        let previousUrl: string | null = null
        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
                const currentRoute = this.router.url
                if (event instanceof NavigationEnd) {
                    this.activeFeatureStore.setActiveFeatures(currentRoute)
                }

                if (event instanceof NavigationEnd) {
                    if (previousUrl === currentRoute) {
                        this.drawerContentService.scrollTop(true)
                    } else {
                        this.drawerContentService.scrollTop()
                    }
                    previousUrl = currentRoute
                }
            })
    }
}
