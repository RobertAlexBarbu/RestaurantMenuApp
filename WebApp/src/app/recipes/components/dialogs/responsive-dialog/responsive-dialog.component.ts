import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
    selector: 'app-responsive-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
    ],
    templateUrl: './responsive-dialog.component.html',
    styleUrl: './responsive-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ResponsiveDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ResponsiveDialogComponent>)

    onNoClick(): void {
        this.dialogRef.close()
    }
}
