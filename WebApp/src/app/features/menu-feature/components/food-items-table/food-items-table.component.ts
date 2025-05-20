import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ItemsTableComponent} from "../items-table/items-table.component";

@Component({
  selector: 'app-food-items-table',
    imports: [
        ItemsTableComponent
    ],
  templateUrl: './food-items-table.component.html',
  styleUrl: './food-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodItemsTableComponent {

}
