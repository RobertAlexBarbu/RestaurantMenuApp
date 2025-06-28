import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {UtilityService} from "../../../../core/services/utility/utility.service";

import {ErrorService} from "../../../../core/services/error/error.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {DragAndDropSortingItemWithText} from "../../../../core/stores/drag-and-drop-sorting.store";
import {PositionDto} from "../../../../core/http/dto/other/position.dto";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {AppStore} from "../../../../core/stores/app.store";
import {
    DragAndDropSortingComponent
} from "../../../../shared/components/drag-and-drop-sorting/drag-and-drop-sorting.component";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {InfoTextComponent} from "../../../../shared/components/info-text/info-text.component";

@Component({
  selector: 'app-category-order-dialog',
    imports: [
        DragAndDropSortingComponent,
        AsyncPipe,
        MatButton,
        MatDialogActions,
        InfoTextComponent,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './category-order-dialog.component.html',
  styleUrl: './category-order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryOrderDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<CategoryOrderDialogComponent>)
    private readonly utilityService = inject(UtilityService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly menuStoreService = inject(MenuStoreService)
    private readonly menuCategoryService = inject(MenuCategoryService)
    private readonly errorService = inject(ErrorService)
    private readonly appStore = inject(AppStore)
    private readonly notificationService = inject(NotificationService)
    private readonly data = inject<{type: 'food' | 'drinks'}>(MAT_DIALOG_DATA);
    dragAndDropElements: DragAndDropSortingItemWithText[] = []
    isMobile = this.utilityService.isMobile()
    positions: PositionDto[] = []
    loading$ = new BehaviorSubject<boolean>(false)

    constructor() {
        if (this.data.type === 'food') {
            this.dragAndDropElements = this.menuStoreService.foodCategories().map((element) => ({
                position: element.position,
                id: element.id,
                text: `${element.name}`,
            }))
        } else {
            this.dragAndDropElements = this.menuStoreService.drinksCategories().map((element) => ({
                position: element.position,
                id: element.id,
                text: `${element.name}`,
            }))
        }

    }

    updatePositions(positions: PositionDto[]) {
        this.positions = positions
    }

    save() {
        this.loading$.next(true)
        this.menuCategoryService
            .updatePositionsByMenuId(this.appStore.user.menu.id(), this.data.type, this.positions)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.notificationService.notify(
                        'Categories ordered with success',
                    )
                    if (this.data.type === 'food') {
                        this.menuStoreService.updateFoodCategoryPositions(
                            this.positions,
                        )
                    } else {
                        this.menuStoreService.updateDrinksCategoryPositions(
                            this.positions,
                        )
                    }

                    this.dialogRef.close()
                },
                error: (err) => {
                    this.loading$.next(false)
                    this.errorService.handleError(err)
                    this.dialogRef.close()
                },
            })
    }

    closeDialog() {
        this.dialogRef.close()
    }
}
