import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {QrGeneratorComponent} from "../../recipes/components/qr-generator/qr-generator.component";
import {RightSidebarComponent} from "../../shared/components/right-sidebar/right-sidebar.component";
import {PhoneComponent} from "../../shared/components/phone/phone.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {pageLoadAnimation} from "../../app.animations";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AppStore} from "../../core/stores/app.store";
import {EnvironmentService} from "../../core/services/environment/environment.service";
import {MenuService} from "../../core/http/services/menu-services/menu/menu.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-style-feature',
    imports: [
        ToolbarComponent,
        QrGeneratorComponent,
        RightSidebarComponent,
        PhoneComponent,
        CardComponent,
        MatButton,
        MatIcon
    ],
  templateUrl: './style-feature.component.html',
  styleUrl: './style-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [pageLoadAnimation]
})
export class StyleFeatureComponent {
    private readonly appStore = inject(AppStore)
    private readonly environmentService = inject(EnvironmentService)
    private readonly menuService = inject(MenuService)
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService)
    private readonly menuAnalyticsService = inject(MenuAnalyticsService)
    private readonly matDialog = inject(MatDialog)
    menu = this.appStore.user.menu;
    ssrUrl = this.environmentService.getSsrUrl();
    completeUrl = computed(() => this.ssrUrl + '/' + this.menu.url())
}
