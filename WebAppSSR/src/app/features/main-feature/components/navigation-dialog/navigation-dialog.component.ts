import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { MatDialogRef } from '@angular/material/dialog'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { AppData } from '../../../../shared/configs/AppData'
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component'
import {
    FullscreenDialogContentComponent
} from '../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { ActiveFeaturePipe } from '../../../../shared/pipes/active-feature/active-feature.pipe'
import { MatLine } from '@angular/material/core'
import {
    MatListItem,
    MatListItemAvatar,
    MatListItemIcon,
    MatListItemLine, MatListItemMeta,
    MatListItemTitle,
    MatNavList,
} from '@angular/material/list'
import { Router } from '@angular/router'
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component'
import { Roles } from '../../../../shared/configs/Roles'
import { IsRolePipe } from '../../../../shared/pipes/is-role/is-role.pipe'

import { ActiveFeatureStore } from '../../../../core/stores/active-feature.store'
import {fadeInAnimation} from "../../../../app.animations";


@Component({
    selector: 'app-navigation-dialog',
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,

        LogoComponent,
        NavigationBarComponent,
        FullscreenDialogContentComponent,
        ActiveFeaturePipe,
        MatLine,
        MatListItem,
        MatNavList,
        MatListItemIcon,
        MatListItemLine,
        MatListItemTitle,
        MatListItemAvatar,
        MatListItemMeta,
        IconButtonComponent,
        IsRolePipe,
    ],
    templateUrl: './navigation-dialog.component.html',
    styleUrl: './navigation-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation]
})
export class NavigationDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<NavigationDialogComponent>)
    private readonly router = inject(Router)
    protected readonly AppData = AppData

    private readonly activeFeatureStore = inject(ActiveFeatureStore)

    layoutView = signal(false)
  menuView = signal(false)

    constructor() {
        effect(() => {
            this.layoutView.set(this.activeFeatureStore.features().includes('layout'))
          this.menuView.set(this.activeFeatureStore.features().includes('menu'))
        })
        // Disable the default close behavior
        this.dialogRef.disableClose = true;

        // Listen for backdrop clicks
        this.dialogRef.backdropClick().subscribe(() => {
            this.closeDialog();
        });
    }
    goToMainMenu() {
        this.layoutView.set(false)
      this.menuView.set(false)
    }
    goToLayout() {
        this.layoutView.set(true)
    }
    goToMenu() {
      this.menuView.set(true)
    }

    closeDialog() {
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.remove('sidebar-open'));
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.add('sidebar-close'));
        const dialogElement = document.querySelector('.sidebar-dialog');
        console.log(dialogElement)
        if (dialogElement) {
            dialogElement.classList.add('closing');
        }
        setTimeout(() => {
            this.dialogRef.close();
        }, 300);
    }

    goTo(path: string) {
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.remove('sidebar-open'));
        document.querySelectorAll('.sidebar-content').forEach(el => el.classList.add('sidebar-close'));
        const dialogElement = document.querySelector('.sidebar-dialog');
        console.log(dialogElement)
        if (dialogElement) {
            dialogElement.classList.add('closing');
        }
        setTimeout(() => {
            this.router.navigate([path])
        }, 350);

    }

    protected readonly Roles = Roles
}
