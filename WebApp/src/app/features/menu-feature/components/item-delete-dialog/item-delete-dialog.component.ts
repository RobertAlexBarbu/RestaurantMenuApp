import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';

import {NotificationService} from "../../../../core/services/notification/notification.service";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-item-delete-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton
    ],
  templateUrl: './item-delete-dialog.component.html',
  styleUrl: './item-delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemDeleteDialogComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuItemService = inject(MenuItemService);
    private readonly destroyRef = inject(DestroyRef)
    private readonly notificationService = inject(NotificationService)
    private readonly dialogRef = inject(
        MatDialogRef<ItemDeleteDialogComponent>,
    )
    public readonly data = inject<MenuItemDto>(MAT_DIALOG_DATA)
    spinner = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    onDelete(elementId: number): void {
        this.spinner.set(true)
        this.menuItemService
            .deleteById(elementId, this.data.menuCategoryId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    if (this.data.menuType == 'food') {
                        this.menuStoreService.deleteFoodItemById(elementId)
                    } else {
                        this.menuStoreService.deleteDrinksItemById(elementId)
                    }

                    this.spinner.set(false)
                    this.notificationService.notify(
                        'Item deleted successfully.',
                    )
                    this.dialogRef.close()
                },
            })
    }
}
