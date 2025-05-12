import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { ErrorService } from '../../../../../core/services/error/error.service'
import { NotificationService } from '../../../../../core/services/notification/notification.service'

import { ElementCategoryDto } from '../../../../../core/http/dto/element-category/element-category.dto'
import { ElementCategoryService } from '../../../../../core/http/services/element-category/element-category.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'


@Component({
    selector: 'app-table-add-category-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        MatDialogActions,
        ReactiveFormsModule,
        MatInput,
        MatButton,
        MatLabel,
        MatError,
    ],
    standalone: true,
    templateUrl: './table-add-category-dialog.component.html',
    styleUrl: './table-add-category-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAddCategoryDialogComponent {
    private readonly elementCategoryService = inject(ElementCategoryService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly errorService: ErrorService = inject(ErrorService)
    private readonly notificationService: NotificationService =
        inject(NotificationService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    readonly dialogRef = inject(MatDialogRef<TableAddCategoryDialogComponent>)
    readonly data = inject<ElementCategoryDto>(MAT_DIALOG_DATA)
    form = new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
    })
    loading = signal(false)

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
            .create({
                name: this.form.value,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (e) => {
                    this.tableFeatureStore.addCategory(e)
                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category added successfully.',
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
