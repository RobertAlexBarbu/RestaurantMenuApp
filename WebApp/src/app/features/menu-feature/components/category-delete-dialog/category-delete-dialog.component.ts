import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {ElementCategoryService} from "../../../../core/http/services/element-category/element-category.service";
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {ElementCategoryDto} from "../../../../core/http/dto/element-category/element-category.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-category-delete-dialog',
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatButton
    ],
  templateUrl: './category-delete-dialog.component.html',
  styleUrl: './category-delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryDeleteDialogComponent {
    private readonly menuCategoryService = inject(MenuCategoryService);
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialogRef = inject(
        MatDialogRef<CategoryDeleteDialogComponent>,
    )
    private readonly notificationService = inject(NotificationService)
    public readonly data = inject<{
        category: MenuCategoryDto
        totalItems: number
    }>(MAT_DIALOG_DATA)
    loading = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    onDelete(categoryId: number): void {
        this.loading.set(true)
        this.menuCategoryService
            .deleteById(categoryId, this.data.category.menuType)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    if (this.data.category.menuType == 'food') {
                        this.menuStoreService.deleteFoodCategoryById(categoryId)
                    } else {
                        this.menuStoreService.deleteDrinksCategoryById(categoryId)
                    }

                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category deleted successfully.',
                    )
                    this.dialogRef.close()
                },
            })
    }
}
