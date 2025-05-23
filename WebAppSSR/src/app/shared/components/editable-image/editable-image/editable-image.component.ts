import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import { MatDialog } from '@angular/material/dialog'

import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component'

@Component({
    selector: 'app-editable-image',
    standalone: true,
    imports: [MatProgressSpinner, MatIcon, MatIconButton],
    templateUrl: './editable-image.component.html',
    styleUrl: './editable-image.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableImageComponent {
    private readonly dialog = inject(MatDialog)
    widthPx = '250px'
    heightPx = '250px'
    readonly fileUrl = input.required<string | null>()
    readonly visibleCaption = input(true)
    readonly caption = input<string | null>(null)
    readonly loading = input(false)
    editImage = output()

    @Input()
    set width(value: string) {
        this.widthPx = value
    }

    @Input()
    set height(value: string) {
        this.heightPx = value
    }

    @Input()
    set size(value: string) {
        this.widthPx = value
        this.heightPx = value
    }

    emitEditImage() {
        this.editImage.emit()
    }

    openImageDialog(imageUrl: string | null) {
        this.dialog.open(ImageDialogComponent, {
            data: {
                imageUrl: imageUrl,
                caption: this.caption(),
            },
            autoFocus: false,
        })
    }
}
