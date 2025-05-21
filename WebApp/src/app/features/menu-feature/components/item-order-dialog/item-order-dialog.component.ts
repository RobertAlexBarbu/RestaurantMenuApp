import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {UtilityService} from "../../../../core/services/utility/utility.service";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {ErrorService} from "../../../../core/services/error/error.service";
import {AppStore} from "../../../../core/stores/app.store";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {DragAndDropSortingItemWithText} from "../../../../core/stores/drag-and-drop-sorting.store";
import {PositionDto} from "../../../../core/http/dto/other/position.dto";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {InfoTextComponent} from "../../../../shared/components/info-text/info-text.component";
import {
    DragAndDropSortingComponent
} from "../../../../shared/components/drag-and-drop-sorting/drag-and-drop-sorting.component";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";

@Component({
  selector: 'app-item-order-dialog',
    imports: [
        InfoTextComponent,
        MatDialogContent,
        MatDialogTitle,
        DragAndDropSortingComponent,
        MatDialogActions,
        MatButton,
        AsyncPipe,
        MatError,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        JsonPipe
    ],
  templateUrl: './item-order-dialog.component.html',
  styleUrl: './item-order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemOrderDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ItemOrderDialogComponent>)
    private readonly utilityService = inject(UtilityService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly menuStoreService = inject(MenuStoreService)
    private readonly menuItemService = inject(MenuItemService)
    private readonly errorService = inject(ErrorService)
    private readonly appStore = inject(AppStore)
    private readonly notificationService = inject(NotificationService)
    private readonly data = inject<{type: 'food' | 'drinks'}>(MAT_DIALOG_DATA);
    items = signal<MenuItemDetailDto[]>([])
    dragAndDropElements = computed(() => {
        return this.items().filter((item => item.menuCategoryId === this.selectedCategoryId()))
            .map((element) => ({
                position: element.position,
                id: element.id,
                text: `${element.name} (${element.category.name})`,
            }))
    })
    isMobile = this.utilityService.isMobile()
    positions: PositionDto[] = []
    selectOptions = signal<MenuCategoryDto[]>([])
    select = new FormControl<number>(0);
    loading$ = new BehaviorSubject<boolean>(false)
    selectedCategoryId = signal<number>(0)

    constructor() {
        if (this.data.type === 'food') {
            this.selectOptions.set(this.menuStoreService.foodCategories());
            this.select.setValue(this.menuStoreService.foodCategories()[0].id)
            this.selectedCategoryId.set(this.menuStoreService.foodCategories()[0].id);
            this.items.set(this.menuStoreService.foodItemsWithCategory())
        } else {
            this.selectOptions.set(this.menuStoreService.drinksCategories());
            this.select.setValue(this.menuStoreService.drinksCategories()[0].id)
            this.selectedCategoryId.set(this.menuStoreService.drinksCategories()[0].id);
            this.items.set(this.menuStoreService.drinksItemsWithCategory())
        }

    }
    
    selectCategory(event: MatSelectChange) {
        this.selectedCategoryId.set(event.value);
    }
    
    updatePositions(positions: PositionDto[]) {
        this.positions = positions
    }

    save() {
        this.loading$.next(true)
        this.menuItemService
            .updatePositionsByCategoryId(this.selectedCategoryId(), this.positions)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.notificationService.notify(
                        'Items ordered with success',
                    )
                    if (this.data.type === 'food') {
                        this.menuStoreService.updateFoodItemPositions(this.selectedCategoryId(),
                            this.positions,
                        )
                    } else {
                        this.menuStoreService.updateDrinksItemPositions(this.selectedCategoryId(),
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
