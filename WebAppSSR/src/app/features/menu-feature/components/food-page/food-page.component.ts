import {Component, inject} from '@angular/core';
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {MenuCategoryDetailDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category-detail.dto";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: 'app-food-page',
    imports: [
        JsonPipe,
        CurrencyPipe,
        MatIconButton,
        MatIcon,
        MatTooltip,
        CategoryComponent
    ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss',
    standalone: true
})
export class FoodPageComponent {
    private readonly menuStore = inject(MenuStoreService);
    foodData: MenuCategoryDetailDto[] = this.menuStore.foodCategoriesWithItems()
    firstHalf = this.foodData.slice(0, Math.ceil(this.foodData.length / 2));
    secondHalf = this.foodData.slice(Math.ceil(this.foodData.length / 2))
    protected readonly Math = Math;
}
