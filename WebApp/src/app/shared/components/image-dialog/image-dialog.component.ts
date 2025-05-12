import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

export interface ImageDialogData {
    imageUrl: string
    caption: string | null
}

@Component({
    selector: 'app-image-dialog',
    standalone: true,
    imports: [MatIconButton, MatIcon],
    templateUrl: './image-dialog.component.html',
    styleUrl: './image-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ImageDialogComponent>)
    public data = inject<ImageDialogData>(MAT_DIALOG_DATA)

    closeDialog() {
        this.dialogRef.close()
    }
}
