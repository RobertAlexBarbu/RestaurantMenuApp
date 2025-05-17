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
import {MenuFeatureStore} from "../../core/stores/menu-feature.store";
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

  standalone: true
})
export class MenuFeatureComponent {
  private readonly appStore = inject(AppStore)
  private readonly router = inject(Router)
  private readonly menuFeatureStore = inject(MenuFeatureStore)
  private readonly menuService = inject(MenuService)
  private readonly destroyRef =inject(DestroyRef)
  spinner = signal(true)
  user = this.appStore.user

  constructor() {
    effect(() => {
      if (!this.menuFeatureStore.init()) {
        this.spinner.set(true)
        const user = this.appStore.user()
        this.menuService.getDataById(user.menu.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (data) => {
              this.menuFeatureStore.initialize(data)
              setTimeout(() => {
                this.spinner.set(false)
              }, 3000)

            },
            error: () => {
              this.spinner.set(false)
            },
          })
      } else {
        setTimeout(() => {
          this.spinner.set(false)
        }, 3000)
      }
    })
  }


  goTo(path: string) {
    this.router.navigate([path])
  }
}
