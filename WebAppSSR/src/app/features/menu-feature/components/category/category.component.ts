import {Component, inject, input, ViewContainerRef} from '@angular/core';
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

@Component({
  selector: 'app-category',
    imports: [
        CurrencyPipe,
        MatIcon,
        MatIconButton,
        MatTooltip,
        ItemImageButtonComponent
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
    standalone: true
})
export class CategoryComponent {
    category = input.required<MenuCategoryDetailDto>();
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly dialog = inject(MatDialog);
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
