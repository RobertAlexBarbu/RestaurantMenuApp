import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ItemsTableComponent} from "../items-table/items-table.component";
import {MenuFeatureStore} from "../../../../core/stores/menu-feature.store";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-food-items-table',
  imports: [
    ItemsTableComponent,
    JsonPipe
  ],
  templateUrl: './food-items-table.component.html',
  styleUrl: './food-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodItemsTableComponent {
  private readonly menuFeatureStore = inject(MenuFeatureStore)
  menuItems =this.menuFeatureStore.foodMenuItems()
  menuCategories = this.menuFeatureStore.foodMenuCategories()
}
