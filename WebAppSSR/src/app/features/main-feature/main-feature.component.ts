import {afterNextRender, AfterViewInit, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../../core/http/services/menu/menu.service";
import {MenuAnalyticsService} from "../../core/http/services/menu-analytics/menu-analytics.service";
import {HttpClient} from "@angular/common/http";
import {switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-main-feature',
  imports: [],
  templateUrl: './main-feature.component.html',
  styleUrl: './main-feature.component.scss',

    standalone: true
})
export class MainFeatureComponent implements AfterViewInit {
    private readonly route =inject(ActivatedRoute);

    private readonly menuService = inject(MenuService);
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    private readonly destroyRef = inject(DestroyRef);
    path = this.route.snapshot.routeConfig?.path;
    
    constructor() {
        afterNextRender(() => {
            if (this.path == ':url') {
                this.menuService.getByUrl(this.route.snapshot.params['url'])
                    .pipe(
                        switchMap(menu => {
                            console.log('Sending menu-access request');
                            return this.menuAnalyticsService.createMenuAccess({
                                menuId: menu.id,
                                menuAccessType: "url"
                            })
                        }),
                        takeUntilDestroyed(this.destroyRef)
                    )
                    .subscribe();
            } else if (this.path == 'qr/:id') {
                this.menuService.getById(this.route.snapshot.params['id'])
                    .pipe(
                        switchMap(menu => {
                            return this.menuAnalyticsService.createMenuAccess({
                                menuId: menu.id,
                                menuAccessType: "qr"
                            })
                        }),
                        takeUntilDestroyed(this.destroyRef)
                    )
                    .subscribe();
            }
        })

    }
    
    ngAfterViewInit() {

    }
}
