import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MenuService} from "./core/http/services/menu-services/menu/menu.service";
import {MenuAnalyticsService} from "./core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {MatIconRegistry} from "@angular/material/icon";

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
    constructor() {
        const defaultFontSetClasses = this.iconRegistry.getDefaultFontSetClass()
        const outlinedFontSetClasses = defaultFontSetClasses
            .filter((fontSetClass) => fontSetClass !== 'material-icons')
            .concat(['material-symbols-rounded'])
        this.iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses)
    }
}
