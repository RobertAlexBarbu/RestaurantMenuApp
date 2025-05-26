import {Component, inject} from '@angular/core';
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {MenuCategoryDetailDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category-detail.dto";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-food-page',
    imports: [
        JsonPipe,
        CurrencyPipe,
        MatIconButton,
        MatIcon
    ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss',
    standalone: true
})
export class FoodPageComponent {
    private readonly menuStore = inject(MenuStoreService);
    foodData: MenuCategoryDetailDto[] = this.menuStore.foodCategoriesWithItems()
}
