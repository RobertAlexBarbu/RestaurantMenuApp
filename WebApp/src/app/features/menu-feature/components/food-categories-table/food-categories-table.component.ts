import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CategoriesTableComponent} from "../categories-table/categories-table.component";

@Component({
  selector: 'app-food-categories-table',
    imports: [
        CategoriesTableComponent
    ],
  templateUrl: './food-categories-table.component.html',
  styleUrl: './food-categories-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodCategoriesTableComponent {

}
