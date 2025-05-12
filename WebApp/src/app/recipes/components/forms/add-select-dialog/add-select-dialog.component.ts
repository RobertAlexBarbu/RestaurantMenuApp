import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

@Component({
    selector: 'app-add-select-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatError,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        MatLabel,
    ],
    templateUrl: './add-select-dialog.component.html',
    styleUrl: './add-select-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSelectDialogComponent {
    readonly dialogRef = inject(MatDialogRef<AddSelectDialogComponent>)
    readonly data = inject<AddSelectDialogData>(MAT_DIALOG_DATA)
    form = new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
    })

    onNoClick(): void {
        this.dialogRef.close()
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.dialogRef.close({
                data: {
                    optionName: this.form.value,
                },
            })
        } else {
            this.form.markAllAsTouched()
        }
    }
}

export interface AddSelectDialogData {
    optionName: string
}
