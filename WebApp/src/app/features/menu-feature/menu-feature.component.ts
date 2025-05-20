import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FeatureLoadingPageComponent} from "../../shared/components/feature-loading-page/feature-loading-page.component";
import {ActiveFeaturePipe} from "../../shared/pipes/active-feature/active-feature.pipe";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatListItem, MatListItemMeta, MatNavList} from "@angular/material/list";
import {NavigationSidebarComponent} from "../../shared/components/navigation-sidebar/navigation-sidebar.component";
import {AppStore} from "../../core/stores/app.store";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "./services/menu-store/menu-store.service";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";

@Component({
  selector: 'app-menu-feature',
  imports: [
    RouterOutlet,
    FeatureLoadingPageComponent,
    ActiveFeaturePipe,
    MatButton,
    MatIcon,
    MatLine,
    MatListItem,
    MatNavList,
    NavigationSidebarComponent,
    MatListItemMeta
  ],
  templateUrl: './menu-feature.component.html',
  styleUrl: './menu-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
    providers: [MenuStoreService],
})
export class MenuFeatureComponent {
  private readonly appStore = inject(AppStore)
    private readonly menuStoreService = inject(MenuStoreService);
  private readonly menuService = inject(MenuService);
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)
    spinner = signal(true)


  user = this.appStore.user

    constructor() {
        effect(() => {
            if (!this.menuStoreService.isInitialized()) {
                this.spinner.set(true)
                const user = this.appStore.user()
                this.menuService.getDataById(user.menu.id)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({
                        next: (data) => {
                            this.menuStoreService.initialize(data)
                            this.spinner.set(false)
                        },
                        error: () => {
                            this.spinner.set(false)
                        },
                    })
            } else {
                this.spinner.set(false)
            }
        })
    }


    goTo(path: string) {
    this.router.navigate([path])
  }
}
