import {Component, inject} from '@angular/core';
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {MenuCategoryDetailDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category-detail.dto";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: 'app-drinks-page',
    imports: [
        JsonPipe,
        CurrencyPipe,
        CategoryComponent
    ],
  templateUrl: './drinks-page.component.html',
  styleUrl: './drinks-page.component.scss',
    standalone: true
})
export class DrinksPageComponent {
    private readonly menuStore = inject(MenuStoreService);
    drinksData:MenuCategoryDetailDto[] = this.menuStore.drinksCategoriesWithItems();
}
