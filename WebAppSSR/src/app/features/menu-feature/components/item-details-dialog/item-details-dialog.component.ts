import {ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, Renderer2, signal} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatIcon} from "@angular/material/icon";
import {ImageComponent} from "../../../../shared/components/image/image.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {IsFavoritePipe} from "../../../../shared/pipes/is-favorite/is-favorite.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-services/menu-analytics/menu-analytics.service";

@Component({
  selector: 'app-item-details-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatIcon,
        ImageComponent,
        DatePipe,
        CurrencyPipe,
        IsFavoritePipe,
        MatIconButton,
        MatTooltip
    ],
  templateUrl: './item-details-dialog.component.html',
  styleUrl: './item-details-dialog.component.scss',
    standalone: true
})
export class ItemDetailsDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ItemDetailsDialogComponent>)
    readonly data = inject<{item: MenuItemDto, category: MenuCategoryDto}>(MAT_DIALOG_DATA);
    item: MenuItemDto = this.data.item;
    category: MenuCategoryDto = this.data.category;
    firebaseFileUrl = signal<string | null>(null)
    private readonly storage = inject(StorageService)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly notificationService = inject(NotificationService);
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    private readonly destroyRef = inject(DestroyRef)

    addToFavorites( ){
        this.menuAnalyticsService.createMenuItemAccess({
            menuCategoryId: this.category.id,
            menuItemId: this.item.id ,
            menuId: this.item.menuId,
            menuItemAccessType: 'favorite'

        }).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        this.menuStoreService.addIdToFavorites(this.data.item.id);
        this.notificationService.notify("Item added to favorites.")
    }
    removeFromFavorites( ){
        this.menuStoreService.removeIdFromFavorites(this.data.item.id);
        this.notificationService.notify("Item removed from favorites.")
    }
    
    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {
        this.menuAnalyticsService.createMenuItemAccess({
            menuCategoryId: this.category.id,
            menuItemId: this.item.id ,
            menuId: this.item.menuId,
            menuItemAccessType: 'details'

        }).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        const imgUrl = this.item.imageUrl
        console.log(imgUrl);
        if (imgUrl) {
            this.storage
                .download(imgUrl)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (file) => {
                        this.firebaseFileUrl.set(URL.createObjectURL(file))
                    },
                })
        }
    }

    onNoClick(): void {
        this.dialogRef.close()
    }
}
