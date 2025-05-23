import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MenuService} from "./core/http/services/menu-services/menu/menu.service";
import {MenuAnalyticsService} from "./core/http/services/menu-services/menu-analytics/menu-analytics.service";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'WebAppSSR';

}
