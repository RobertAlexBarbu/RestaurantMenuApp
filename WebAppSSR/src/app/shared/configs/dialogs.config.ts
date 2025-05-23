import { MatDialogConfig } from '@angular/material/dialog'

export const fullscreenDialogConfig: MatDialogConfig = {
    hasBackdrop: false,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    panelClass: 'fullscreen-dialog',
    autoFocus: false,
    exitAnimationDuration: '0ms',
    enterAnimationDuration: '0ms',
    restoreFocus: false,
}

export const sidebarDialogConfig: MatDialogConfig = {
    hasBackdrop: true,
    height: '100%',
    maxHeight: '100%',
    width: '300px',
    maxWidth: '100%',
    panelClass: 'sidebar-dialog',
    backdropClass: 'sidebar-backdrop',
    autoFocus: true,
    exitAnimationDuration: '0ms',
    enterAnimationDuration: '0ms',
    restoreFocus: false,
}

export const responsiveDialogConfig: MatDialogConfig = {
    panelClass: 'responsive-dialog',
    backdropClass: 'responsive-dialog-backdrop',

}