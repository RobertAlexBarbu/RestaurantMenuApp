import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
    readonly dialogRef = inject(MatDialogRef<DialogComponent>)

    onNoClick(): void {
        this.dialogRef.close()
    }
}
