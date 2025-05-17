import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-food-items-table',
  imports: [],
  templateUrl: './food-items-table.component.html',
  styleUrl: './food-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodItemsTableComponent {

}
