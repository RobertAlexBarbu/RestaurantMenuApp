import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-drinks-items-table',
  imports: [],
  templateUrl: './drinks-items-table.component.html',
  styleUrl: './drinks-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DrinksItemsTableComponent {

}
