import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MenuFeatureStore} from "../../../../core/stores/menu-feature.store";

@Component({
  selector: 'app-food-categories-table',
  imports: [],
  templateUrl: './food-categories-table.component.html',
  styleUrl: './food-categories-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodCategoriesTableComponent {
  private readonly menuFeatureStore = inject(MenuFeatureStore);
  constructor() {
    // console.log(this.menuFeatureStore.foodMenuItemsWithFoodMenuCategory());
  }
}
