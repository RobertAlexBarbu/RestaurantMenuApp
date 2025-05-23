import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject} from '@angular/core';
import {AppStore} from "../../../../core/stores/app.store";
import {EnvironmentService} from "../../../../core/services/environment/environment.service";
import {MenuService} from "../../../../core/http/services/menu-services/menu/menu.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-services/menu-analytics/menu-analytics.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
    FullscreenDialogContentComponent
} from "../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component";
import {MatButton} from "@angular/material/button";
import {PhoneComponent} from "../../../../shared/components/phone/phone.component";

@Component({
  selector: 'app-style-preview-dialog',
    imports: [
        FullscreenDialogContentComponent,
        MatButton,
        PhoneComponent
    ],
  templateUrl: './style-preview-dialog.component.html',
  styleUrl: './style-preview-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class StylePreviewDialogComponent {
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
    private readonly dialogRef = inject(MatDialogRef<StylePreviewDialogComponent>)

    closeDialog() {
        this.dialogRef.close()
    }
}
