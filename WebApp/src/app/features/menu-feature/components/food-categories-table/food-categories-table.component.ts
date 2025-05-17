import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-food-categories-table',
  imports: [],
  templateUrl: './food-categories-table.component.html',
  styleUrl: './food-categories-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodCategoriesTableComponent {

}
