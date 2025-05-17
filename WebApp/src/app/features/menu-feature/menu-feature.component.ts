import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FeatureLoadingPageComponent} from "../../shared/components/feature-loading-page/feature-loading-page.component";
import {ActiveFeaturePipe} from "../../shared/pipes/active-feature/active-feature.pipe";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatListItem, MatListItemMeta, MatNavList} from "@angular/material/list";
import {NavigationSidebarComponent} from "../../shared/components/navigation-sidebar/navigation-sidebar.component";
import {AppStore} from "../../core/stores/app.store";

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


  user = this.appStore.user


  goTo(path: string) {
    this.router.navigate([path])
  }
}
