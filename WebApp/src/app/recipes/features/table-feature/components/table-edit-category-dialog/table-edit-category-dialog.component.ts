import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInput } from '@angular/material/input'
import { ErrorService } from '../../../../../core/services/error/error.service'
import { NotificationService } from '../../../../../core/services/notification/notification.service'

import { ElementCategoryDto } from '../../../../../core/http/dto/element-category/element-category.dto'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ElementCategoryService } from '../../../../../core/http/services/element-category/element-category.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'


@Component({
    selector: 'app-table-edit-category-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        FormsModule,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
    ],
    standalone: true,
    templateUrl: './table-edit-category-dialog.component.html',
    styleUrl: './table-edit-category-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditCategoryDialogComponent {
    private readonly elementCategoryService = inject(ElementCategoryService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly errorService: ErrorService = inject(ErrorService)
    private readonly notificationService: NotificationService =
        inject(NotificationService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    readonly dialogRef = inject(MatDialogRef<TableEditCategoryDialogComponent>)
    readonly data = inject<ElementCategoryDto>(MAT_DIALOG_DATA)
    form = new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
    })
    loading = signal(false)

    constructor() {
        this.form.setValue(this.data.name)
    }

    onNoClick(): void {
        this.dialogRef.close()
    }

    onSubmit(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched()
            return
        }
        this.loading.set(true)
        this.elementCategoryService
            .updateById(this.data.id, {
                name: this.form.value,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (e) => {
                    this.tableFeatureStore.updateCategoryById(this.data.id, {
                        name: this.form.value,
                    })
                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category edited successfully.',
                    )
                    this.dialogRef.close({
                        data: e,
                    })
                },
                error: (err) => {
                    this.loading.set(false)
                    this.errorService.handleError(err)
                },
            })
    }
}
