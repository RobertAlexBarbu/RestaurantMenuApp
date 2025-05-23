import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

export interface InfoDialogData {
    title: string,
    content: string
}

@Component({
    selector: 'app-info-dialog',
    imports: [MatButton, MatDialogTitle, MatDialogContent, MatDialogActions],
    standalone: true,
    templateUrl: './info-dialog.component.html',
    styleUrl: './info-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<InfoDialogComponent>)
    data = inject<{ title: string; content: string }>(MAT_DIALOG_DATA)

    onNoClick(): void {
        this.dialogRef.close()
    }
}
