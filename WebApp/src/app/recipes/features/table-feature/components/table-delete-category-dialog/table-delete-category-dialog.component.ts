import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { ElementCategoryDto } from '../../../../../core/http/dto/element-dto/element-category/element-category.dto'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ElementCategoryService } from '../../../../../core/http/services/element-services/element-category/element-category.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'

@Component({
    selector: 'app-table-delete-category-dialog',
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
    templateUrl: './table-delete-category-dialog.component.html',
    styleUrl: './table-delete-category-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableDeleteCategoryDialogComponent {
    private readonly elementCategoryService = inject(ElementCategoryService)
    private readonly basicFeatureStore = inject(TableFeatureStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialogRef = inject(
        MatDialogRef<TableDeleteCategoryDialogComponent>,
    )
    private readonly notificationService = inject(NotificationService)
    public readonly data = inject<{
        category: ElementCategoryDto
        totalElements: number
    }>(MAT_DIALOG_DATA)
    loading = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    onDelete(categoryId: number): void {
        this.loading.set(true)
        this.elementCategoryService
            .deleteById(categoryId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.deleteCategoryById(categoryId)
                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category deleted successfully.',
                    )
                    this.dialogRef.close()
                },
            })
    }
}
