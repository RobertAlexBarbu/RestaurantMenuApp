import {Component, inject, Signal, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CurrencyPipe} from "@angular/common";
import {IsFavoritePipe} from "../../../../shared/pipes/is-favorite/is-favorite.pipe";
import {ItemImageButtonComponent} from "../../../menu-feature/components/item-image-button/item-image-button.component";
import {MatIcon} from "@angular/material/icon";
import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";
import {MatTooltip} from "@angular/material/tooltip";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {
    ItemDetailsDialogComponent
} from "../../../menu-feature/components/item-details-dialog/item-details-dialog.component";
import {InfoTextComponent} from "../../../../shared/components/info-text/info-text.component";

@Component({
  selector: 'app-favorites-dialog',
    imports: [
        MatDialogActions,
        MatButton,
        MatDialogContent,
        MatDialogTitle,
        CurrencyPipe,
        IsFavoritePipe,
        ItemImageButtonComponent,
        MatIcon,
        MatIconButton,
        MatTooltip,
        InfoTextComponent
    ],
  templateUrl: './favorites-dialog.component.html',
  styleUrl: './favorites-dialog.component.scss',
    standalone: true
})
export class FavoritesDialogComponent {
    readonly dialogRef = inject(MatDialogRef<FavoritesDialogComponent>)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly notificationService = inject(NotificationService);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly dialog = inject(MatDialog);
    items = this.menuStoreService.favoriteItemsWithCategory;

    onNoClick(): void {
        this.dialogRef.close()
    }

    removeFromFavorites(id: number ){
        this.menuStoreService.removeIdFromFavorites(id);
        this.notificationService.notify("Item removed from favorites.")
    }

    openDetailsDialog(item: MenuItemDto, category: MenuCategoryDto) {
        this.dialog.open(ItemDetailsDialogComponent, {
            data: {
                item,
                category
            },
            viewContainerRef: this.viewContainerRef
        })
    }
}
