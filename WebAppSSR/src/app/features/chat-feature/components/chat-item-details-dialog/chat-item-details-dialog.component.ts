import {ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, Renderer2, signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ImageComponent} from "../../../../shared/components/image/image.component";
import {IsFavoritePipe} from "../../../../shared/pipes/is-favorite/is-favorite.pipe";
import {MatButton} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-services/menu-analytics/menu-analytics.service";

@Component({
  selector: 'app-chat-item-details-dialog',
    imports: [
        CurrencyPipe,
        ImageComponent,
        IsFavoritePipe,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatIcon
    ],
  templateUrl: './chat-item-details-dialog.component.html',
  styleUrl: './chat-item-details-dialog.component.scss',
    standalone: true
})
export class ChatItemDetailsDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ChatItemDetailsDialogComponent>)
    readonly data = inject<{itemId: number}>(MAT_DIALOG_DATA);
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    firebaseFileUrl = signal<string | null>(null)
    private readonly storage = inject(StorageService)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly notificationService = inject(NotificationService);
    item: MenuItemDetailDto = [...this.menuStoreService.foodItemsWithCategory(),
        ...this.menuStoreService.drinksItemsWithCategory()
    ].find(i => i.id == this.data.itemId)!;
    category: MenuCategoryDto = this.item.category;

    private readonly destroyRef = inject(DestroyRef)

    addToFavorites( ){
        this.menuStoreService.addIdToFavorites(this.item.id);
        this.menuAnalyticsService.createMenuItemAccess({
            menuCategoryId: this.category.id,
            menuItemId: this.item.id ,
            menuId: this.item.menuId,
            menuItemAccessType: 'favorite'

        }).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        this.notificationService.notify("Item added to favorites.")
    }
    removeFromFavorites( ){
        this.menuStoreService.removeIdFromFavorites(this.item.id);
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
