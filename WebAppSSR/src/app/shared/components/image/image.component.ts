import { ChangeDetectionStrategy, Component, inject, Input, input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ImageDialogComponent } from '../image-dialog/image-dialog.component'

import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-image',
    standalone: true,
    imports: [MatProgressSpinner],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
    private readonly dialog = inject(MatDialog)
    widthPx = '250px'
    heightPx = '250px'

    loading = true

    readonly fileUrl = input.required<string | null>()
    readonly visibleCaption = input(true)
    readonly caption = input<string | null>(null)

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

    openImageDialog(imageUrl: string | null) {
        this.dialog.open(ImageDialogComponent, {
            data: {
                imageUrl: imageUrl,
                caption: this.caption(),
            },
            autoFocus: false,
        })
    }

    stopLoading() {
        this.loading = false
    }
}
