import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatDialogContent } from '@angular/material/dialog'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-fullscreen-dialog-content',
    imports: [
        MatDialogContent,
        MatIcon,
        MatIconButton,
        NgClass,
    ],
    templateUrl: './fullscreen-dialog-content.component.html',
    styleUrl: './fullscreen-dialog-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FullscreenDialogContentComponent {
    close = output()
    noPadding = input(false)
    fixedCloseButton = input(false)

    closeDialog() {
        this.close.emit()
    }
}
