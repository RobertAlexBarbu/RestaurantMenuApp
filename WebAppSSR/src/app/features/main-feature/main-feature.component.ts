import {afterNextRender, AfterViewInit, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {HttpClient} from "@angular/common/http";
import {switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MenuDataDto} from "../../core/http/dto/menu-dto/menu/menu-data.dto";
import {JsonPipe} from "@angular/common";
import {LoadingPageComponent} from "./components/loading-page/loading-page.component";
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {CdkScrollable} from "@angular/cdk/overlay";
import {MenuStyleDto} from "../../core/http/dto/menu-dto/menu-style/menu-style.dto";
import {MenuStoreService} from "../../core/stores/menu-store/menu-store.service";
import {RightSidebarComponent} from "../../shared/components/right-sidebar/right-sidebar.component";
import {ThemeService} from "../../core/services/theme/theme.service";

@Component({
  selector: 'app-main-feature',
    imports: [
        MatProgressBar,
        JsonPipe,
        LoadingPageComponent,
        RouterOutlet,
        NavigationBarComponent,
        CdkScrollable,
        CdkScrollable,
        RightSidebarComponent
    ],
  templateUrl: './main-feature.component.html',
  styleUrl: './main-feature.component.scss',

    standalone: true
})
export class MainFeatureComponent implements AfterViewInit {
    private readonly route =inject(ActivatedRoute);
    private readonly themeService = inject(ThemeService);
    private readonly menuService = inject(MenuService);
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    private readonly destroyRef = inject(DestroyRef);
    private menuStoreService = inject(MenuStoreService);
    path = this.route.snapshot.routeConfig?.path;
    loading = signal(true);
    styleLoaded = signal(false);
    restaurantName = signal('');
    menuId = -1;
    data = signal<MenuDataDto | null>(null);
    menuStyle!: MenuStyleDto
    
    constructor() {
        console.log(this.path);
        if (this.path == ':url') {
            this.menuService.getByUrl(this.route.snapshot.params['url'])
                .pipe(
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: data => {
                        this.restaurantName.set(data.name)
                        this.menuId = data.id;
                        this.menuStyle = data.menuStyle
                        this.menuStoreService.setMenu(data);
                        this.menuStoreService.setUrl(`/${data.url}`)
                    }
                });
        } 
        else if (this.path == 'qr/:id') {
            this.menuService.getById(this.route.snapshot.params['id'])
                .pipe(
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                    next: data => {
                        this.restaurantName.set(data.name)
                        this.menuId = data.id;
                        this.menuStyle = data.menuStyle

                        this.menuStoreService.setMenu(data);
                        this.menuStoreService.setUrl(`/qr/${data.id}`)
                    }
                });
        }
        afterNextRender(() => {
            const style = document.createElement('style');
            style.textContent = `
        :root {
            ${this.menuStyle.fontCss}
            ${this.menuStyle.themeCss}
        }
        
        body {
            font-family: ${this.menuStyle.font}, "Helvetica Neue", sans-serif;
        }`;
            document.head.appendChild(style);
            const htmlElement = document.documentElement; 
            const bodyElement = document.body;
            htmlElement.classList.add('bg');
            bodyElement.classList.add('bg');
            this.styleLoaded.set(true);
            
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
            // this.themeService.setLightTheme()
            const startTime = Date.now();
            this.menuService.getDataById(this.menuId).pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: value => {
                        this.menuStoreService.setMenuData(value);
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
