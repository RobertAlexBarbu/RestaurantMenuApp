import {afterNextRender, AfterViewInit, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {HttpClient} from "@angular/common/http";
import {switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MenuDataDto} from "../../core/http/dto/menu-dto/menu/menu-data.dto";
import {JsonPipe} from "@angular/common";
import {LoadingPageComponent} from "./components/loading-page/loading-page.component";

@Component({
  selector: 'app-main-feature',
    imports: [
        MatProgressBar,
        JsonPipe,
        LoadingPageComponent
    ],
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
    loading = signal(true);
    restaurantName = signal('');
    menuId = -1;
    data = signal<MenuDataDto | null>(null);
    
    constructor() {
        console.log('heee');
        console.log(this.path);
        if (this.path == ':url') {
            this.menuService.getByUrl(this.route.snapshot.params['url'])
                .pipe(
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: data => {
                        console.log(data);
                        this.restaurantName.set(data.name)
                        this.menuId = data.id;
                    }
                });
        } else if (this.path == 'qr/:id') {
            this.menuService.getById(this.route.snapshot.params['id'])
                .pipe(
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: data => {
                        this.restaurantName.set(data.name)
                        this.menuId = data.id;
                    }
                });
        }
        afterNextRender(() => {
            if (this.path == ':url') {
                this.menuAnalyticsService.createMenuAccess({
                    menuId: this.menuId,
                    menuAccessType: "url"
                }).subscribe()
            } else if (this.path == 'qr/:id') {
                this.menuAnalyticsService.createMenuAccess({
                    menuId: this.menuId,
                    menuAccessType: "qr"
                }).subscribe()
            }
            const startTime = Date.now();
            this.menuService.getDataById(this.menuId).pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: value => {
                        this.data.set(value);
                        const elapsed = Date.now() - startTime;
                        const remaining = 3000 - elapsed;

                        if (remaining > 0) {
                            setTimeout(() => {
                                this.loading.set(false);
                            }, remaining);
                        } else {
                            this.loading.set(false);
                        }

                    }
                })
        })



    }
    
    ngAfterViewInit() {

    }
}
