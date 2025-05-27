import {Component, input} from '@angular/core';
import {MenuCategoryDetailDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category-detail.dto";
import {CurrencyPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ItemImageButtonComponent} from "../item-image-button/item-image-button.component";

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
}
