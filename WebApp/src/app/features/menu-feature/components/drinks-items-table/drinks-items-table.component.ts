import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ItemsTableComponent} from "../items-table/items-table.component";

@Component({
  selector: 'app-drinks-items-table',
    imports: [
        ItemsTableComponent
    ],
  templateUrl: './drinks-items-table.component.html',
  styleUrl: './drinks-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DrinksItemsTableComponent {

}
