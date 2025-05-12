import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
    selector: 'app-scroll-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
    ],
    templateUrl: './scroll-dialog.component.html',
    styleUrl: './scroll-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ScrollDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ScrollDialogComponent>)

    onNoClick(): void {
        this.dialogRef.close()
    }
}
