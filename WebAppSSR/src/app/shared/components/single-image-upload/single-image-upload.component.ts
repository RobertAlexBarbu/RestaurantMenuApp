import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

import { ImageDialogComponent } from '../image-dialog/image-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'app-single-image-upload',
    standalone: true,
    imports: [MatIcon, MatIconButton, MatProgressSpinner],
    templateUrl: './single-image-upload.component.html',
    styleUrl: './single-image-upload.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleImageUploadComponent {
    private readonly dialog = inject(MatDialog)
    widthPx = '250px'
    heightPx = '250px'

    readonly uploadChange = output<File | null>()
    fileUrl: string | null = null
    readonly hasCaption = input(true)
    readonly loading = input<boolean | null>(false)
    randomId = Math.random().toString(36).substring(2, 15)

    private _file: File | null = null

    get file(): File | null {
        return this._file
    }

    @Input() set file(value: File | null) {
        this._file = value
        this.updateFileUrl() // Update fileUrl whenever file is set
    }

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

    onFileInputChange(event: Event) {
        const eventTarget = event.target
        if (eventTarget) {
            const fileInput = eventTarget as HTMLInputElement
            if (fileInput.files && fileInput.files.length > 0) {
                this.file = fileInput.files[0]
                this.fileUrl = URL.createObjectURL(this.file)
                this.uploadChange.emit(this.file)
            } else {
                this.file = null
                this.file = null
                this.uploadChange.emit(null)
            }
        }
    }

    deleteFile() {
        this.file = null
        this.fileUrl = null
        this.uploadChange.emit(this.file)
    }

    openImageDialog(imageUrl: string) {
        this.dialog.open(ImageDialogComponent, {
            data: {
                imageUrl: imageUrl,
                caption: this.hasCaption() ? this.file?.name : '',
            },
            autoFocus: false,
        })
    }

    private updateFileUrl(): void {
        if (this._file) {
            this.fileUrl = URL.createObjectURL(this._file)
        } else {
            this.fileUrl = null
        }
    }
}
