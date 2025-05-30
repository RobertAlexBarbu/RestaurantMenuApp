import {Component, DestroyRef, inject, input, ViewContainerRef} from '@angular/core';
import {MenuCategoryDetailDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category-detail.dto";
import {CurrencyPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ItemImageButtonComponent} from "../item-image-button/item-image-button.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuFeatureComponent} from "../../menu-feature.component";
import {ItemDetailsDialogComponent} from "../item-details-dialog/item-details-dialog.component";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {IsFavoritePipe} from "../../../../shared/pipes/is-favorite/is-favorite.pipe";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuAnalyticsService} from "../../../../core/http/services/menu-services/menu-analytics/menu-analytics.service";

@Component({
  selector: 'app-category',
    imports: [
        CurrencyPipe,
        MatIcon,
        MatIconButton,
        MatTooltip,
        ItemImageButtonComponent,
        IsFavoritePipe
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
    standalone: true
})
export class CategoryComponent {
    category = input.required<MenuCategoryDetailDto>();
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly menuAnalyticsService = inject(MenuAnalyticsService);
    private readonly dialog = inject(MatDialog);
    private readonly menuStore = inject(MenuStoreService);
    private readonly destroyRef = inject(DestroyRef);
    menuStoreService = inject(MenuStoreService);
    private readonly notificationService = inject(NotificationService);
    openDetailsDialog(item: MenuItemDto, category: MenuCategoryDto) {
        this.dialog.open(ItemDetailsDialogComponent, {
            data: {
                item,
                category
            },
            viewContainerRef: this.viewContainerRef
        })
    }
    
    addToFavorites(id: number ){
        this.menuStoreService.addIdToFavorites(id);
        this.notificationService.notify("Item added to favorites.")
        this.menuAnalyticsService.createMenuItemAccess({
            menuCategoryId: this.category().id,
            menuItemId: id ,
            menuId: this.menuStore.menu().id,
            menuItemAccessType: 'favorite'

        }).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()

    }
    removeFromFavorites(id: number ){
        this.menuStoreService.removeIdFromFavorites(id);
        this.notificationService.notify("Item removed from favorites.")
    }
}
